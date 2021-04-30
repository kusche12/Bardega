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
            <NavigationContainer>
                {user ? <MainNavigator /> : <AuthNavigator />}
            </NavigationContainer>
        )
    }
}

const mapStateToProps = (state) => {
    // TODO: For testing purposes only, put your user profile in this section to skip over auth
    // Normally, this would set `user: null`
    if (state.firebase.auth.isEmpty) {
        const profiles = state.firestore.data.profiles;
        const profile = profiles ? profiles['IcEeZVtsDnZfFwdDpTRhwmtp6vf1'] : null;
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
}

export default compose(
    firestoreConnect(() => ['profiles']),
    connect(mapStateToProps)
)(Main);