import React, { useEffect, useState } from 'react';
import { FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Image, LogBox, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from '../../Components/Main/Loading';
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

//  TODO: Temporarily I made this button route to the settings screen for testing purposes. In reality, you should have a settings
// cog on the top right of the screen that goes to the settings screen. Implement this.
const ProfileScreen = ({ navigation, drinks, user, userID }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [userDrinks, setUserDrinks] = useState(null);

    // Only get all the drink images after the user and drinks are loaded to the DB
    useEffect(() => {
        if (user && drinks) {
            loadUserDrinks();
        }
    }, []);

    // Load all the user's drinks to the state
    const loadUserDrinks = async () => {
        let res = [];
        for (let i = user.drinks.length - 1; i >= 0; i--) {
            const drink = await drinks[user.drinks[i].id];
            if (drink) {
                cacheImages(drink.imageURL, drink.id);
                res.push(drink);
            }
        }
        setUserDrinks(res);
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
                {user.favorites.length > 0 &&
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('FavoritesScreen', { favorites: user.favorites })}>
                        <View style={[UserStyles.button, UserStyles.buttonFavorites]}>
                            <Image source={Images.profile.heart}
                                style={[UserStyles.heartImg, Platform.OS === 'android' && { marginTop: 2, marginLeft: 2 }]}

                            />
                            <Text style={GlobalStyles.paragraph3}>Favorites</Text>
                        </View>
                    </TouchableWithoutFeedback>
                }
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

                    <View style={UserStyles.allDrinksContainer}>
                        <FlatList
                            data={userDrinks}
                            renderItem={renderDrink}
                            keyExtractor={item => item.id}
                            numColumns={3}
                            scrollEnabled={false}
                            horizontal={false}
                        />
                    </View>

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
        // For testing purposes only
        const profile = profiles ? profiles['IcEeZVtsDnZfFwdDpTRhwmtp6vf1'] : null;
        // For production, uncomment below
        // const profile = profiles ? profiles[state.firebase.auth.uid] : null;
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