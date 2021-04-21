import React, { useState, useEffect } from 'react';

// For caching header
import { cacheImages } from '../Functions/cacheFunctions';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import Images from '../Images/Images';

// For authorization screen
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import SplashScreen from '../Screens/AuthScreens/SplashScreen';
import AuthNavigator from './AuthNavigators/AuthNavigator';

// For navigation
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';

// Application Navigator
const Main = ({ user }) => {
    // Cache the local header image file on the user's device to speed up the access of the image
    const [header, setHeader] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        loadData();
    }, [])
    const loadData = async () => {
        const imageURI = Asset.fromModule(Images.bardegaLogoOld).uri;
        await cacheImages(imageURI, 1);
        setHeader(FileSystem.documentDirectory + '1.jpg');
        setIsLoading(false);
    }

    // While the app is still loading in data, show the splash screen.
    // After it is loaded, either load the Authentication Flow for unauthenicated users or go directly to the Main Flow
    if (isLoading) {
        return <SplashScreen />;
    } else {
        return (
            <NavigationContainer>
                {user ? <MainNavigator header={header} /> : <AuthNavigator />}
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