import React, { useEffect, useState } from 'react';
import { Image, Platform } from 'react-native';

// For main navigation
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Images from '../Images/Images';
import DiscoverNavigator from './StackNavigators/DiscoverNavigator';
import SearchNavigator from './StackNavigators/SearchNavigator';
import CreateNavigator from '../Navigation/StackNavigators/CreateNavigator';
import SpiritNavigator from '../Navigation/StackNavigators/SpiritNavigator';
import ProfileNavigator from '../Navigation/StackNavigators/ProfileNavigator';
import GlobalStyles from '../Styles/GlobalStyles';
import Styles from '../Styles/StyleConstants';

// For notifications permission
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import firebase from '../API/FirebaseSetup';

// For checking if user is still a member
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateIsMember } from '../Store/Actions/ProfileActions';

const Tab = createBottomTabNavigator();

const MainNavigator = ({ userID, memberEmails, profiles, updateIsMember }) => {
    const [checkMember, setCheckMember] = useState(false);
    console.log(userID);
    // Ask use for notification permissions on app startup in the main navigator
    useEffect(() => {
        (() => registerForPushNotificationsAsync())();
    }, []);

    // Check if the user is still a member, if membership role has changed, then update their member field
    useEffect(() => {
        if (profiles && memberEmails && !checkMember) {
            const profile = profiles[userID];
            // User is on member list
            if (memberEmails[profile.email]) {
                updateIsMember({ id: userID, memberRole: true });
                // User is not on member list
            } else if (!memberEmails[profile.email]) {
                updateIsMember({ id: userID, memberRole: false });
            }
            setCheckMember(true);
        }

    }, [memberEmails, profiles]);

    // Decides whether or not the bottom tab bar should be visible
    const getTabBarVisibility = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'CommentsScreen') {
            return false;
        }
        return true;
    }

    // Register for push notifications
    const registerForPushNotificationsAsync = async () => {
        let token;
        if (Platform.isPad) return;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            console.log('Must use physical device for Push Notifications');
        }

        // Place user's expo notification token in their profile document
        if (token) {
            let db = firebase.firestore();
            await db
                .collection('profiles')
                .doc(userID)
                .update({ expoToken: token })
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    }


    return (
        <Tab.Navigator
            initialRouteName='Discover'
            tabBarOptions={{
                activeBackgroundColor: Styles.PINK,
                inactiveBackgroundColor: Styles.PINK,
                lazyLoad: false,
                style: {
                    height: Platform.isPad ? 90 : 80,
                    backgroundColor: Styles.PINK
                },
                showLabel: false,
            }}
        >
            <Tab.Screen
                name="Discover"
                component={DiscoverNavigator}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return <Image source={Images.bottomTab.discover} style={GlobalStyles.tabBarIcon} />
                        } else {
                            return <Image source={Images.bottomTab.discoverUnfocused} style={GlobalStyles.tabBarIcon} />
                        }
                    },
                })}
            />
            <Tab.Screen
                name="Search"
                component={SearchNavigator}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return <Image source={Images.bottomTab.search} style={GlobalStyles.tabBarIcon} />
                        } else {
                            return <Image source={Images.bottomTab.searchUnfocused} style={GlobalStyles.tabBarIcon} />
                        }
                    },
                })}
            />
            <Tab.Screen
                name="Create"
                component={CreateNavigator}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return <Image source={Images.bottomTab.create} style={GlobalStyles.tabBarIconMD} />
                        } else {
                            return <Image source={Images.bottomTab.createUnfocused} style={GlobalStyles.tabBarIconMD} />
                        }
                    },
                }}
            />
            <Tab.Screen
                name="Spirit"
                component={SpiritNavigator}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return <Image source={Images.bottomTab.spirit} style={GlobalStyles.tabBarIconMD} />
                        } else {
                            return <Image source={Images.bottomTab.spiritUnfocused} style={GlobalStyles.tabBarIconMD} />
                        }
                    },
                })}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileNavigator}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return <Image source={Images.bottomTab.profile} style={GlobalStyles.tabBarIcon} />
                        } else {
                            return <Image source={Images.bottomTab.profileUnfocused} style={GlobalStyles.tabBarIcon} />
                        }
                    },
                })}
            />
        </Tab.Navigator>
    )
}

const mapStateToProps = (state) => {
    const profiles = state.firestore.data.profiles;
    const memberEmails = state.firestore.data.memberEmails;

    return {
        profiles: profiles,
        memberEmails: memberEmails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateIsMember: (data) => dispatch(updateIsMember(data))
    }
}

export default compose(
    firestoreConnect(() => ['memberEmails', 'profiles']),
    connect(mapStateToProps, mapDispatchToProps)
)(MainNavigator);