import React, { useState, useEffect } from 'react';

// For authorization screen
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import SplashScreen from '../Screens/AuthScreens/SplashScreen';
import AuthNavigator from './AuthNavigators/AuthNavigator';

// For navigation
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import * as Linking from 'expo-linking';


import { useFonts } from 'expo-font';

// Application Navigator
const Main = ({ user }) => {
    // Cache the local header image file on the user's device to speed up the access of the image
    const [isLoading, setIsLoading] = useState(true);
    let [fontLoaded] = useFonts({
        Raisonne: require('../assets/fonts/DMSans-Regular.ttf'),
        RaisonneMedium: require('../assets/fonts/DMSans-Medium.ttf'),
        SourceSerifRegular: require('../assets/fonts/SourceSerifPro-Regular.ttf'),
        SourceSerifItalic: require('../assets/fonts/SourceSerifPro-Italic.ttf'),
        SourceSerifSemiBold: require('../assets/fonts/SourceSerifPro-SemiBold.ttf'),
        SourceSerifBold: require('../assets/fonts/SourceSerifPro-Bold.ttf'),
    });

    // Create a linking object that will allow a third party application to enter this app
    const prefix = Linking.createURL('/');
    const linking = {
        prefixes: [prefix],
        config: {
            screens: {
                Discover: {
                    screens: {
                        DiscoverScreen: 'DiscoverScreen/:drinkID',
                    }
                }
            },
        },
    }

    useEffect(() => {
        if (fontLoaded) {
            setIsLoading(false);
        }
    }, [fontLoaded, user])

    // While the app is still loading in data, show the splash screen.
    // After it is loaded, either load the Authentication Flow for unauthenicated users or go directly to the Main Flow
    if (isLoading) {
        return <SplashScreen />
    } else {
        return (
            <NavigationContainer linking={linking}>
                {user ? <MainNavigator userID={user.id} /> : <AuthNavigator />}
            </NavigationContainer>
        )
    }
}

const mapStateToProps = (state) => {
    if (state.firebase.auth.isEmpty) {
        return {
            user: null
        }
    } else {
        const profiles = state.firestore.data.profiles;
        const UID = state.firebase.auth.uid;
        const profile = profiles ? profiles[UID] : null;
        return {
            user: profile
        }
    }

    // JUST FOR TESTING
    // const profiles = state.firestore.data.profiles;
    // const UID = state.firebase.auth.uid;
    // const profile = profiles ? profiles['IcEeZVtsDnZfFwdDpTRhwmtp6vf1'] : null;
    // return {
    //     user: profile
    // }
}

export default compose(
    firestoreConnect(() => ['profiles']),
    connect(mapStateToProps)
)(Main);