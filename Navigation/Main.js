import React, { useState, useEffect } from 'react';

// For caching header
import { cacheImages } from '../Functions/cacheFunctions';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

// For authorization screen
import { connect } from 'react-redux';
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
    if (state.firebase.auth.isEmpty) {
        return {
            user: null
        }
    } else {
        return {
            // Probably not the actual reference
            user: state.firebase.auth.user
        }
    }
}

export default connect(mapStateToProps)(Main);