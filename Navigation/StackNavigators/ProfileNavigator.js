import * as React from 'react';
import { Platform } from 'react-native';
import { StackActions, useNavigationState } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

import DrinkDetailScreen from '../../Screens/Main/DrinkDetailScreen';
import FollowScreen from '../../Screens/ProfileScreens/FollowScreen';
import MakePrivateScreen from '../../Screens/ProfileScreens/MakePrivateScreen';
import DeleteAccountScreen from '../../Screens/ProfileScreens/DeleteAccountScreen';
import NotificationsSettingsScreen from '../../Screens/ProfileScreens/NotificationsSettingsScreen';
import ReAuthenticationScreen from '../../Screens/ProfileScreens/ReAuthenticationScreen';
import ChangeEmailScreen from '../../Screens/ProfileScreens/ChangeEmailScreen';
import SettingsScreen from '../../Screens/ProfileScreens/SettingsScreen';
import EditProfileScreen from '../../Screens/ProfileScreens/EditProfileScreen';
import CreateScreen from '../../Screens/Main/CreateScreen';
import ProfileInputScreen from '../../Screens/ProfileScreens/ProfileInputScreen';
import DrinkOptionsScreen from '../../Screens/Main/DrinkOptionsScreen';
import ProfileScreen from '../../Screens/Main/ProfileScreen';
import CommentsScreen from '../../Screens/Main/CommentsScreen';
import NotificationsScreen from '../../Screens/ProfileScreens/NotificationsScreen';
import FollowRequestsScreen from '../../Screens/ProfileScreens/FollowRequestsScreen';
import AboutUsScreen from '../../Screens/ProfileScreens/AboutUsScreen';
import ContactUsScreen from '../../Screens/ProfileScreens/ContactUsScreen';

import MainHeader from '../../Components/TopNavbar/MainHeader';
import GoBackOrSaveHeader from '../../Components/TopNavbar/GoBackOrSaveHeader';
import NotificationsHeader from '../../Components/TopNavbar/NotificationsHeader'
import Styles from '../../Styles/StyleConstants';

const Stack = createStackNavigator();

const ProfileNavigator = ({ route, navigation, user }) => {
    return (
        <Stack.Navigator
            headerMode='screen'
            screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
                lazyLoad: true,
                headerBackTitleVisible: false
            }}>
            <Stack.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                initialParams={{ user: user, ownProfile: true }}
                options={() => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => {
                        return <NotificationsHeader navigation={navigation} user={user} />
                    },
                    headerLeft: (props) => {
                        const index = useNavigationState(state => state.index);
                        const routes = useNavigationState(state => state.routes);
                        if (index > 0) {
                            return (
                                <HeaderBackButton
                                    {...props}
                                    onPress={() => {
                                        const popAction = StackActions.pop(1);
                                        navigation.dispatch(popAction);

                                        // If the Profile Screen was NOT entered from the Profile Stack, then you must call an extra goBack
                                        // to get to the original stack
                                        if (routes.length == 2 && routes[1].name == 'ProfileScreen') {
                                            navigation.goBack();
                                        }
                                    }}
                                />
                            )
                        }
                    },
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },

                })}
            />
            <Stack.Screen
                name='DrinkDetailScreen'
                component={DrinkDetailScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    }
                })}
            />
            <Stack.Screen
                name='CommentsScreen'
                component={CommentsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='CreateScreen'
                component={CreateScreen}
                initialParams={route.params, navigation}
                options={() => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },

                })}
            />
            <Stack.Screen
                name='FollowScreen'
                component={FollowScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    }
                })}
            />
            <Stack.Screen
                name='SettingsScreen'
                component={SettingsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='EditProfileScreen'
                component={EditProfileScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => <GoBackOrSaveHeader route={route} navigation={navigation} save={true} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: Styles.PINK,
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='ProfileInputScreen'
                component={ProfileInputScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => <GoBackOrSaveHeader route={route} navigation={navigation} save={true} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: Styles.PINK,
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='MakePrivateScreen'
                component={MakePrivateScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='DeleteAccountScreen'
                component={DeleteAccountScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='ReAuthenticationScreen'
                component={ReAuthenticationScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='ChangeEmailScreen'
                component={ChangeEmailScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='NotificationsSettingsScreen'
                component={NotificationsSettingsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='DrinkOptionsScreen'
                component={DrinkOptionsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='NotificationsScreen'
                component={NotificationsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='FollowRequestsScreen'
                component={FollowRequestsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='AboutUsScreen'
                component={AboutUsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            /><Stack.Screen
                name='ContactUsScreen'
                component={ContactUsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: Platform.isPad ? 150 : 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
        </Stack.Navigator>
    );
}

const mapStateToProps = (state) => {
    const profiles = state.firestore.data.profiles;
    const UID = state.firebase.auth.uid;
    const profile = profiles ? profiles[UID] : null;
    return {
        user: profile
    }
}

export default compose(
    firestoreConnect(() => ['profiles']),
    connect(mapStateToProps)
)(ProfileNavigator);