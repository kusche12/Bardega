import React, { useState, useEffect } from 'react';

// For authorization screen
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import AuthNavigator from './AuthNavigators/AuthNavigator';

// For navigation
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './MainNavigator';
import * as Linking from 'expo-linking';

// Application Navigator
const Main = ({ user, loaded }) => {
    // Custom fonts
    const [isLoading, setIsLoading] = useState(true);
    // const [runOnce, setRunOnce] = useState(false);

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
        async function fetchData() {
            if (loaded) {
                setTimeout(async () => {
                    await setIsLoading(false);
                }, 800);
            }
        }

        fetchData();
    }, [loaded]);

    // While the app is still loading in data, show the splash screen.
    // After it is loaded, either load the Authentication Flow for unauthenicated users or go directly to the Main Flow
    if (isLoading) return null;
    return (
        <NavigationContainer linking={linking}>
            {user && loaded ? <MainNavigator userID={user.id} /> : <AuthNavigator loaded={loaded} />}
        </NavigationContainer>
    )
}

const mapStateToProps = (state) => {
    if (state.firebase.auth.isEmpty) {
        return {
            user: null,
            loaded: state.firebase.auth.isLoaded
        }
    } else {
        const profiles = state.firestore.data.profiles;
        const UID = state.firebase.auth.uid;
        const profile = profiles ? profiles[UID] : null;
        return {
            user: profile,
            loaded: state.firebase.auth.isLoaded
        }
    }
}

export default compose(
    firestoreConnect(() => ['profiles']),
    connect(mapStateToProps)
)(Main);