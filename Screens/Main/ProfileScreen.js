import React, { useEffect, useState } from 'react';
import firebase from '../../API/FirebaseSetup'
import { RefreshControl, Text, SafeAreaView, View, TouchableWithoutFeedback, Image, LogBox, Platform, FlatList, ScrollView } from 'react-native';
import FollowButton from '../../Components/Profile/FollowButton';
import PaginatedFlatList from '../../Components/Profile/PaginatedFlatList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import Images from '../../Images/Images';
import { renderNum } from '../../Functions/miscFunctions';
import { Placeholder, PlaceholderMedia, Fade, PlaceholderLine } from 'rn-placeholder';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants';

LogBox.ignoreAllLogs()

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const ProfileScreen = ({ navigation, drinks, user, userID, ownProfile }) => {
    const [isPrivate, setIsPrivate] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [userDrinks, setUserDrinks] = useState([]);
    const [likedDrinks, setLikedDrinks] = useState([]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [userDrinkIndex, setUserDrinkIndex] = useState(0);
    const [likedDrinkIndex, setLikedDrinkIndex] = useState(0);
    const [renderUserDrinks, setRenderUserDrinks] = useState([]);
    const [renderLikedDrinks, setRenderLikedDrinks] = useState([]);

    const LOADING_LINE_LENGTH = Platform.isPad ? Styles.width * .09 : Styles.width * .25;

    // When the user pulls down on the profile screen,
    // their drinks / liked drinks lists AND followers / following counts get updated
    const onRefresh = React.useCallback(() => {
        setIsRefreshing(true);
        wait(1000)
            .then(() => loadUserDrinks())
            .then(() => setIsRefreshing(false));
    }, []);

    // Only get all the drink images after the user and drinks are loaded to the DB
    // Load all the drinks AND liked drinks any time either of these arrays change
    useEffect(() => {
        if (user && drinks) {
            setIsLoading(true);
            cacheImages(user.imageURL, user.id);
            // Check if this profile should be rendered based on privacy settings
            if (!ownProfile && user.private) {
                let db = firebase.firestore();
                db
                    .collection('profileFollowers')
                    .doc(user.profileFollowID)
                    .collection('followerUsers')
                    .doc(userID)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            setIsPrivate(false);
                        } else {
                            setIsPrivate(true);
                        }
                    }).catch((err) => {
                        console.log(err)
                    })
            } else {
                setIsPrivate(false);
            }
            loadUserDrinks();
        }
    }, [user, drinks.length]);

    // Load all the user's drinks to the state
    const loadUserDrinks = async () => {
        let res = [];
        let liked = [];
        let drinksArray = [];
        let likedArray = [];

        let db = firebase.firestore();
        await db
            .collection('profiles')
            .doc(user.id)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    drinksArray = doc.data().drinks;
                    likedArray = doc.data().likedDrinks;
                }
            }).catch((err) => {
                console.log(err)
            })

        for (let i = drinksArray.length - 1; i >= 0; i--) {
            const drink = await drinks[user.drinks[i].id];
            if (drink) {
                if (ownProfile || !drink.private && drink.id) {
                    cacheImages(drink.imageURL, drink.id);
                    res.push(drink);
                }
            }

        }
        setUserDrinks(res);
        if (ownProfile || !user.likedDrinksPrivate) {
            for (let i = likedArray.length - 1; i >= 0; i--) {
                const drink = await drinks[user.likedDrinks[i].id];
                if (drink) {
                    if (ownProfile || !drink.private && drink.id) {
                        cacheImages(drink.imageURL, drink.id);
                        liked.push(drink);
                    }
                }
            }
            setLikedDrinks(liked);
        }

        setUserDrinkIndex(9);
        setLikedDrinkIndex(9);
        setRenderUserDrinks(res.slice(0, 9));
        setRenderLikedDrinks(liked.slice(0, 9));
        setIsLoading(false);
    }

    // Renders either the recipes, followers, or following stat box given parameter type
    const renderStatBox = (num, type) => {
        if (isLoading) {
            return (
                <View style={[UserStyles.statBox, GlobalStyles.boxShadow, { overflow: 'hidden' }]}>
                    <Placeholder Animation={Fade}>
                        <PlaceholderMedia style={{ width: 300, height: 300 }} />
                    </Placeholder>
                </View>
            )
        }
        return (
            <TouchableWithoutFeedback onPress={() => routeStatBox(type)}>
                <View style={[UserStyles.statBox, GlobalStyles.boxShadow]}>
                    <Text style={[GlobalStyles.title1, { marginBottom: 8 }]}>{renderNum(num)}</Text>
                    <Text style={GlobalStyles.paragraph3}>{type === 'Followers' && num === 1 ? 'Follower' : type}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    // Decides which screen to route to on click of the Followers or Following button
    const routeStatBox = (type) => {
        if (type === 'Followers') {
            navigation.push('FollowScreen', { name: 'Followers', user: user });
        } else if (type === 'Following') {
            navigation.push('FollowScreen', { name: 'Following', user: user });
        }
    }

    // Renders either the user's drinks or liked drinks WITH pagination
    const renderDrinkList = () => {
        if (activeIndex == 0) {
            return (
                <PaginatedFlatList data={renderUserDrinks} navigation={navigation} />
            )
        } else {
            if (ownProfile || !user.likedDrinksPrivate) {
                return (
                    <PaginatedFlatList data={renderLikedDrinks} navigation={navigation} />
                )
            } else {
                return (
                    <View style={{ width: Styles.width, flexDirection: 'column', alignItems: 'center' }}>
                        <Text style={[GlobalStyles.paragraphbold2, { marginTop: 48, marginBottom: 8 }]}>The user's liked drinks are private</Text>
                        <Text style={[GlobalStyles.paragraph3, { color: Styles.GRAY }]}>Drinks liked by {user.userName} are currently hidden</Text>
                    </View>
                )
            }
        }
    }

    // Render the animated blocks in place of the drinks while the screen is loading in
    const renderLoadingDrink = (item) => {
        return (
            <View style={[UserStyles.drinkImage]} key={item.id}>
                <Placeholder Animation={Fade}>
                    <PlaceholderMedia style={{ width: Platform.isPad ? Styles.width * .25 : .33 * Styles.width, height: Platform.isPad ? Styles.width * .25 : .33 * Styles.width }} />
                </Placeholder>
            </View>
        )
    }

    // Check how far the user has scrolled on screen
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 30;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    // Get more data to fill up the rendered drink lists (respective of either the created or liked drinks)
    // There was a bug when I tried putting this logic in the PaginatedFlatList component
    const getData = () => {
        if (activeIndex == 0 && userDrinkIndex < userDrinks.length) {
            let currItems = [...renderUserDrinks];
            let newItems = [];
            let i = userDrinkIndex;

            while (i < userDrinks.length && i < userDrinkIndex + 9) {
                newItems.push(userDrinks[i]);
                i++;
            }

            setUserDrinkIndex(i);
            setRenderUserDrinks(currItems.concat(newItems));
        } else if (activeIndex == 1 && likedDrinkIndex < likedDrinks.length) {
            let currItems = [...renderLikedDrinks];
            let newItems = [];
            let i = likedDrinkIndex;

            while (i < likedDrinks.length && i < likedDrinkIndex + 9) {
                newItems.push(likedDrinks[i]);
                i++;
            }

            setLikedDrinkIndex(i);
            setRenderLikedDrinks(currItems.concat(newItems));
        }
    }

    if (isLoading) {
        return (
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { alignItems: 'center', marginTop: 20, marginBottom: 40 }]} >
                <View style={UserStyles.infoContainer}>
                    <View style={UserStyles.infoRow}>
                        <Image source={{ uri: getCachedImage(user.id) || user.imageURL }} style={UserStyles.profileImage} />
                        <View style={{ marginLeft: 16 }}>
                            <Text style={GlobalStyles.titlebold1}>{user.userName}</Text>
                            {!user.fName && !user.lName
                                ? <View style={{ marginBottom: 6 }}></View>
                                : <Text style={[GlobalStyles.title3, { marginBottom: 8 }]}>{user.fName} {user.lName}</Text>
                            }
                            <View style={{ flexDirection: 'row' }}>
                                <View style={[UserStyles.button, { backgroundColor: Styles.LOADING_GRAY, borderColor: Styles.LOADING_GRAY, marginTop: 4 }]}>
                                    <Text></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={UserStyles.infoContainer}>
                    <Placeholder Animation={Fade}>
                        <PlaceholderLine width={LOADING_LINE_LENGTH} />
                        <PlaceholderLine width={LOADING_LINE_LENGTH} />
                        <PlaceholderLine width={LOADING_LINE_LENGTH * .85} />
                    </Placeholder>
                </View>

                <View style={[UserStyles.infoContainer, UserStyles.statContainer]}>
                    {renderStatBox(userDrinks.length, 'Recipes')}
                    {renderStatBox(user.numFollowers, 'Followers')}
                    {renderStatBox(user.numFollowing, 'Following')}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 2 }}>
                    <View style={[UserStyles.indexButtonContainer]}>
                        <TouchableWithoutFeedback disabled={isPrivate} onPress={() => { setActiveIndex(0) }}>
                            <Image source={activeIndex === 0 ? Images.profile.grid : Images.profile.gridOff} style={{ width: Platform.isPad ? 45 : 25, height: Platform.isPad ? 45 : 25, resizeMode: 'contain' }} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={UserStyles.indexButtonContainer}>
                        <TouchableWithoutFeedback disabled={isPrivate} onPress={() => { setActiveIndex(1) }}>
                            <Image source={activeIndex === 1 ? Images.profile.emptyHeart : Images.profile.emptyHeartOff} style={{ width: Platform.isPad ? 45 : 25, height: Platform.isPad ? 45 : 25, resizeMode: 'contain' }} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={[UserStyles.indexButtonLine, { marginLeft: (Styles.width / 2) * activeIndex }]}></View>

                <View style={{ width: Styles.width }}>
                    <FlatList
                        data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }]}
                        renderItem={(item) => renderLoadingDrink(item)}
                        keyExtractor={item => item.id}
                        numColumns={Platform.isPad ? 4 : 3}
                        scrollEnabled={false}
                        horizontal={false}
                    />
                </View>

            </SafeAreaView>
        )
    }

    return (
        <ScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                    tintColor={Styles.DARK_PINK}
                    colors={[Styles.DARK_PINK]}
                />
            }
            onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    getData();
                }
            }}
            scrollEventThrottle={400}
        >
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { alignItems: 'center', marginTop: 20, marginBottom: 40 }]} >

                {userID === user.id &&
                    <View style={UserStyles.cogContainer}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile', { screen: 'SettingsScreen' })}>
                            <Image source={Images.profile.settings} style={UserStyles.settingsCog} />
                        </TouchableWithoutFeedback>
                    </View>
                }

                <View style={UserStyles.infoContainer}>
                    <View style={UserStyles.infoRow}>
                        <Image source={{ uri: getCachedImage(user.id) || user.imageURL }} style={UserStyles.profileImage} />
                        <View style={{ marginLeft: 16 }}>
                            <Text style={GlobalStyles.titlebold1}>{user.userName}</Text>
                            {!user.fName && !user.lName
                                ? <View style={{ marginBottom: 6 }}></View>
                                : <Text style={[GlobalStyles.title3, { marginBottom: 8 }]}>{user.fName} {user.lName}</Text>
                            }

                            <FollowButton {...{ navigation, user, ownProfile }} />
                        </View>
                    </View>
                </View>

                <View style={UserStyles.infoContainer}>
                    <Text style={GlobalStyles.paragraph2}>{user.bio}</Text>
                </View>

                <View style={[UserStyles.infoContainer, UserStyles.statContainer]}>
                    {renderStatBox(userDrinks.length, 'Recipes')}
                    {renderStatBox(user.numFollowers, 'Followers')}
                    {renderStatBox(user.numFollowing, 'Following')}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 2 }}>
                    <View style={[UserStyles.indexButtonContainer]}>
                        <TouchableWithoutFeedback disabled={isPrivate} onPress={() => { setActiveIndex(0) }}>
                            <Image source={activeIndex === 0 ? Images.profile.grid : Images.profile.gridOff} style={{ width: Platform.isPad ? 45 : 25, height: Platform.isPad ? 45 : 25, resizeMode: 'contain' }} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={[UserStyles.indexButtonContainer]}>
                        <TouchableWithoutFeedback disabled={isPrivate} onPress={() => { setActiveIndex(1) }}>
                            <Image source={activeIndex === 1 ? Images.profile.emptyHeart : Images.profile.emptyHeartOff} style={{ width: Platform.isPad ? 45 : 25, height: Platform.isPad ? 45 : 25, resizeMode: 'contain' }} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={[UserStyles.indexButtonLine, { marginLeft: (Styles.width / 2) * activeIndex }]}></View>

                {isPrivate
                    ?
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 32 }}>
                        <Image source={Images.profile.padlock} style={{ width: 50, height: 50, marginBottom: 8 }} />
                        <Text style={GlobalStyles.paragraphbold2}>This account is private</Text>
                        <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY }]}>Follow the account to see their drinks</Text>
                    </View>
                    :
                    renderDrinkList()
                }

            </SafeAreaView>
        </ScrollView>
    );
}

const mapStateToProps = (state, ownProps) => {
    // If we entered this screen with a link from another user's profile
    if (!ownProps.route.params.ownProfile) {
        return {
            drinks: state.firestore.data.drinks,
            user: ownProps.route.params.user,
            userID: state.firebase.auth.uid,
            ownProfile: false
        }
    } else {
        // If this is the user's own profile page
        const profiles = state.firestore.data.profiles;
        const profile = profiles ? profiles[state.firebase.auth.uid] : null;
        return {
            drinks: state.firestore.data.drinks,
            user: profile,
            userID: state.firebase.auth.uid,
            ownProfile: true,
        }
    }
}

// Either get the profile followers from the currently authed user or the user who's profile this is
// Do the same for the profile following
export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['drinks', 'profiles'])
)(ProfileScreen);