import React, { useEffect, useState } from 'react';
import firebase from '../../API/FirebaseSetup'
import { RefreshControl, Text, SafeAreaView, View, TouchableWithoutFeedback, Image, LogBox, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RenderList from '../../Components/Profile/RenderList';
import AnimatedFlatList from '../../Components/Profile/AnimatedFlatList';
import FollowButton from '../../Components/Profile/FollowButton';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { cacheImages } from '../../Functions/cacheFunctions';
import Images from '../../Images/Images';
import { renderNum } from '../../Functions/miscFunctions';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants';

LogBox.ignoreAllLogs()

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

// TODO: Implement the scroll to the top to reload any data that could have changed on this screen 
// Do this for the Discover Screen as well.
const ProfileScreen = ({ navigation, drinks, user, userID, ownProfile }) => {
    const [isPrivate, setIsPrivate] = useState(true);
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

            // Test if this profile should be rendered based on privacy settings
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
            cacheImages(user.imageURL, userID);
        }
    }, [user.likedDrinks, user.drinks]);

    // Load all the user's drinks to the state
    const loadUserDrinks = async () => {
        let res = [];
        let liked = [];
        for (let i = user.drinks.length - 1; i >= 0; i--) {
            const drink = await drinks[user.drinks[i].id];
            if (ownProfile || !drink.private) {
                cacheImages(drink.imageURL, drink.id);
                res.push(drink);
            }
        }
        setUserDrinks(res);
        if (ownProfile || !user.likedDrinksPrivate) {
            for (let i = user.likedDrinks.length - 1; i >= 0; i--) {
                const drink = await drinks[user.likedDrinks[i].id];
                if (drink) {
                    cacheImages(drink.imageURL, drink.id);
                    liked.push(drink);
                }
            }
            setLikedDrinks(liked);
        } else {
            setLikedDrinks([]);
        }
        setIsLoading(false);
    }

    // Renders either the recipes, followers, or following stat box given parameter type
    const renderStatBox = (num, type) => {
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
            navigation.navigate('FollowScreen', { name: 'Followers', user: user });
        } else if (type === 'Following') {
            navigation.navigate('FollowScreen', { name: 'Following', user: user });
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
            <View style={[UserStyles.indexButtonContainer, isPrivate && index === 0 && { borderBottomColor: 'black', borderBottomWidth: 1.75 }]}>
                <TouchableWithoutFeedback disabled={isPrivate} onPress={() => setActiveIndex(index)}>
                    <Image source={img} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
                </TouchableWithoutFeedback>
            </View>
        )
    }

    if (isLoading) {
        return null;
    }

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
                    {renderIndexButton(0, 'grid')}
                    {renderIndexButton(1, 'heart')}
                </View>

                {isPrivate
                    ?
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 32 }}>
                        <Image source={Images.profile.padlock} style={{ width: 50, height: 50, marginBottom: 8 }} />
                        <Text style={GlobalStyles.paragraphbold2}>This account is private</Text>
                        <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY }]}>Follow the account to see their drinks</Text>
                    </View>

                    :
                    <AnimatedFlatList
                        data={[userDrinks, likedDrinks]}
                        renderItem={({ item, index }) => <RenderList {...{ item, navigation, ownProfile, index, user }} />}
                        keyExtractor={(_, index) => '' + index}
                        itemWidth={Styles.width}
                        setActiveIndex={setActiveIndex}
                        activeIndex={activeIndex}
                    />

                }

            </SafeAreaView>
        </KeyboardAwareScrollView>
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