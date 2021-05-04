import React, { useEffect, useState } from 'react';
import { RefreshControl, FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Image, LogBox, Platform, Animated } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from '../../Components/Main/Loading';
import AnimatedFlatList from '../../Components/Profile/AnimatedFlatList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import Images from '../../Images/Images';
import { renderNum } from '../../Functions/miscFunctions';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants';

// TODO: Delete this after development, lol
LogBox.ignoreAllLogs()

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const ProfileScreen = ({ navigation, drinks, user, userID }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [userDrinks, setUserDrinks] = useState(null);
    const [likedDrinks, setLikedDrinks] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

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
            loadUserDrinks();
            cacheImages(user.imageURL, userID);
        }
    }, [user.likedDrinks, user.drinks]);

    // Load all the user's drinks to the state
    const loadUserDrinks = async () => {
        console.log('load user drinks')
        let res = [];
        let liked = [];
        for (let i = user.drinks.length - 1; i >= 0; i--) {
            const drink = await drinks[user.drinks[i].id];
            if (drink) {
                cacheImages(drink.imageURL, drink.id);
                res.push(drink);
            }
        }
        setUserDrinks(res);
        for (let i = user.likedDrinks.length - 1; i >= 0; i--) {
            const drink = await drinks[user.likedDrinks[i].id];
            if (drink) {
                cacheImages(drink.imageURL, drink.id);
                liked.push(drink);
            }
        }
        setLikedDrinks(liked);
        setIsLoading(false);
    }

    // TODO: Implement the rule below
    // If currently authed user, then render edit profile and favorite routes
    // If any other user, then render follow/unfollow component
    const renderInfoButtons = () => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('EditProfileScreen')}>
                    <View style={[UserStyles.button, { marginRight: 4 }]}>
                        <Text style={GlobalStyles.paragraph3}>Edit Profile</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    // Renders either the recipes, followers, or following stat box given parameter type
    const renderStatBox = (num, type) => {
        return (
            <TouchableWithoutFeedback onPress={() => routeStatBox(type)}>
                <View style={[UserStyles.statBox, GlobalStyles.boxShadow]}>
                    <Text style={[GlobalStyles.title1, { marginBottom: 8 }]}>{renderNum(num)}</Text>
                    <Text style={GlobalStyles.paragraph3}>{type}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    // Decides which screen to route to on click of the Followers or Following button
    const routeStatBox = (type) => {
        if (type === 'Followers') {
            navigation.navigate('FollowScreen', { users: user.followers, name: 'Followers' });
        } else if (type === 'Following') {
            navigation.navigate('FollowScreen', { users: user.following, name: 'Following' });
        }
    }

    const renderIndexButton = (index, type) => {
        let img;
        if (type === 'grid' && index === activeIndex) {
            img = Images.profile.grid;
        } else if (type === 'grid' && index !== activeIndex) {
            img = Images.profile.gridOff;
        } else if (type === 'heart' && index === activeIndex) {
            img = Images.profile.emptyHeart;
        } else {
            img = Images.profile.emptyHeartOff;
        }
        return (
            <View style={UserStyles.indexButtonContainer}>
                <TouchableWithoutFeedback onPress={() => setActiveIndex(index)}>
                    <Image source={img} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
                </TouchableWithoutFeedback>
            </View>
        )
    }

    const renderList = ({ item }) => {
        return (
            <View style={{ width: Styles.width }}>
                <FlatList
                    data={item}
                    renderItem={renderDrink}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    scrollEnabled={false}
                    horizontal={false}
                />
            </View>
        )
    }

    // Renders a drink image that, when clicked, routes to the drink detail page
    const renderDrink = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('DrinkDetailScreen', { drink: item, fromScreen: 'Profile' })}>
                <View style={UserStyles.drinkContainer}>
                    <Image source={{ uri: getCachedImage(item.id) || item.imageURL }} style={UserStyles.drinkImage} />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    if (isLoading) {
        return <Loading />
    } else {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <SafeAreaView style={[GlobalStyles.headerSafeArea, { alignItems: 'center', marginTop: 20 }]} >

                    {userID === user.id &&
                        <View style={UserStyles.cogContainer}>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('SettingsScreen')}>
                                <Image source={Images.profile.settings} style={UserStyles.settingsCog} />
                            </TouchableWithoutFeedback>
                        </View>
                    }

                    <View style={UserStyles.infoContainer}>
                        <View style={UserStyles.infoRow}>
                            <Image source={{ uri: user.imageURL }} style={UserStyles.profileImage} />
                            <View style={{ marginLeft: 16 }}>
                                <Text style={GlobalStyles.titlebold1}>{user.userName}</Text>
                                <Text style={[GlobalStyles.title3, { marginBottom: 8 }]}>{user.fName} {user.lName}</Text>
                                {renderInfoButtons()}
                            </View>
                        </View>
                    </View>

                    <View style={UserStyles.infoContainer}>
                        <Text style={GlobalStyles.paragraph2}>{user.bio}</Text>
                    </View>

                    <View style={[UserStyles.infoContainer, UserStyles.statContainer]}>
                        {renderStatBox(user.drinks.length, 'Recipes')}
                        {renderStatBox(user.followers.length, 'Followers')}
                        {renderStatBox(user.following.length, 'Following')}
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 2 }}>
                        {renderIndexButton(0, 'grid')}
                        {renderIndexButton(1, 'heart')}
                    </View>

                    <AnimatedFlatList
                        data={[userDrinks, likedDrinks]}
                        renderItem={renderList}
                        keyExtractor={(item, index) => '' + index}
                        itemWidth={Styles.width}
                        setActiveIndex={setActiveIndex}
                        activeIndex={activeIndex}
                    />

                </SafeAreaView>
            </KeyboardAwareScrollView>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    // If we entered this screen with a link from another user's profile
    if (ownProps.route.params.user !== undefined) {
        return {
            drinks: state.firestore.data.drinks,
            user: ownProps.route.params.user,
            userID: state.firebase.auth.uid
        }
    } else {
        const profiles = state.firestore.data.profiles;
        const profile = profiles ? profiles[state.firebase.auth.uid] : null;
        //console.log(profile.likedDrinks);
        return {
            drinks: state.firestore.data.drinks,
            user: profile,
            userID: state.firebase.auth.uid
        }
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['drinks', 'profiles'])
)(ProfileScreen);