import React, { useState, useEffect } from 'react';

// For caching header
import { cacheImages } from '../Functions/cacheFunctions';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

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
    const [isLoading, setIsLoading] = useState(false);
    const [authedUser, setAuthedUser] = useState(user);
    useEffect(() => {
        if (header === null) {
            loadData();
        }
    }, [])
    const loadData = async () => {
        const imageURI = Asset.fromModule(require('./bardega_logo.png')).uri;
        await cacheImages(imageURI, 1);
        setHeader(FileSystem.documentDirectory + '1.jpg');
        setCurrUser(user);
        setIsLoading(false);
    }

    // While the app is still loading in data, show the splash screen.
    // After it is loaded, either load the Authentication Flow for unauthenicated users or go directly to the Main Flow
    if (isLoading) {
        return <SplashScreen />;
    } else {
        return (
            <NavigationContainer>
                {authedUser ? <MainNavigator header={header} /> : <AuthNavigator setAuthedUser={setAuthedUser} />}
            </NavigationContainer>
        )
    }
}

// TODO: Try to get the currently authed user by checking a cache maybe?
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
            userID: profile
        }
    }
}

export default compose(
    firestoreConnect(() => ['profiles']),
    connect(mapStateToProps)
)(Main);