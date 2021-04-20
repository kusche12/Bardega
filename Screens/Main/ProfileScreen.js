import React, { useEffect, useState } from 'react';
import { FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Image, LogBox, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from '../../Components/Main/Loading';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';

// TODO: Delete this after development, lol
LogBox.ignoreAllLogs()

// TODO: Get the data from the currently authed user
const ProfileScreen = ({ navigation, drinks, user }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [userDrinks, setUserDrinks] = useState(null);

    // Only get all the drink images after the user and drinks are loaded to the DB
    useEffect(() => {
        if (user && drinks) {
            loadUserDrinks();
        }
    }, []);

    const loadUserDrinks = async () => {
        let res = [];
        for (let i = 0; i < user.drinks.length; i++) {
            const drink = await drinks[user.drinks[i].id];
            cacheImages(drink.imageURL, drink.id);
            res.push(drink)
        }
        setUserDrinks(res);
        setIsLoading(false);
    }

    // TODO: Implement the rule below
    //  TODO: Temporarily I made this button route to the settings screen for testing purposes. In reality, you should have a settings
    // cog on the top right of the screen that goes to the settings screen. Implement this.
    // If currently authed user, then render edit profile and favorite routes
    // If any other user, then render follow/unfollow component
    const renderInfoButtons = () => {
        return (
            <View style={UserStyles.buttonRow}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('SettingsScreen')}>
                    <View style={[UserStyles.button, { marginRight: 4 }]}>
                        <Text style={UserStyles.subtitle}>Edit Profile</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('FavoritesScreen', { favorites: user.favorites })}>
                    <View style={[UserStyles.button, UserStyles.buttonFavorites]}>
                        <Image source={require('./heart.png')}
                            style={[UserStyles.heartImg, Platform.OS === 'android' && { marginTop: 2, marginLeft: 2 }]}

                        />
                        <Text style={UserStyles.subtitle}>Favorites</Text>
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
                    <Text style={[UserStyles.title, { marginBottom: 8 }]}>{num}</Text>
                    <Text style={UserStyles.subtitle}>{type}</Text>
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
                <SafeAreaView style={[GlobalStyles.headerSafeArea, UserStyles.container]} >

                    <View style={UserStyles.infoContainer}>
                        <View style={UserStyles.infoRow}>
                            <Image source={{ uri: user.imageURL }} style={UserStyles.profileImage} />
                            <View style={UserStyles.infoTextContainer}>
                                <Text style={UserStyles.title}>{user.userName}</Text>
                                <Text style={[UserStyles.subtitle, { marginBottom: 8 }]}>{user.fName} {user.lName}</Text>
                                {renderInfoButtons()}
                            </View>
                        </View>
                    </View>

                    <View style={UserStyles.infoContainer}>
                        <Text style={UserStyles.subtitle}>{user.bio}</Text>
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
    console.log(state.firebase);
    // If we entered this screen with a link from another user's profile
    if (ownProps.route.params.user !== undefined) {
        return {
            drinks: state.firestore.data.drinks,
            user: ownProps.route.params.user
        }
    } else {
        const profiles = state.firestore.data.profiles;
        const profile = profiles ? profiles['culture-admin'] : null;
        return {
            drinks: state.firestore.data.drinks,
            user: profile
        }
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['drinks', 'profiles'])
)(ProfileScreen);