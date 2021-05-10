import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DrinkDetailScreen from '../../Screens/Main/DrinkDetailScreen';
import FollowScreen from '../../Screens/ProfileScreens/FollowScreen';
import FavoritesScreen from '../../Screens/ProfileScreens/FavoritesScreen';
import MakePrivateScreen from '../../Screens/ProfileScreens/MakePrivateScreen';
import DeleteAccountScreen from '../../Screens/ProfileScreens/DeleteAccountScreen';
import NotificationsSettingsScreen from '../../Screens/ProfileScreens/NotificationsSettingsScreen';
import ReAuthenticationScreen from '../../Screens/ProfileScreens/ReAuthenticationScreen';
import SettingsScreen from '../../Screens/ProfileScreens/SettingsScreen';
import EditProfileScreen from '../../Screens/ProfileScreens/EditProfileScreen';
import CreateScreen from '../../Screens/Main/CreateScreen';
import ProfileInputScreen from '../../Screens/ProfileScreens/ProfileInputScreen';
import DrinkOptionsScreen from '../../Screens/Main/DrinkOptionsScreen';
import ProfileScreen from '../../Screens/Main/ProfileScreen';
import CommentsScreen from '../../Screens/Main/CommentsScreen';

import MainHeader from '../../Components/TopNavbar/MainHeader';
import GoBackOrSaveHeader from '../../Components/TopNavbar/GoBackOrSaveHeader';
import Styles from '../../Styles/StyleConstants';

const Stack = createStackNavigator();

const ProfileNavigator = ({ route, navigation }) => {

    return (
        <Stack.Navigator
            headerMode='screen'
            screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}>
            <Stack.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                initialParams={route.params, navigation}
                options={() => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='DrinkDetailScreen'
                component={DrinkDetailScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => <GoBackOrSaveHeader navigation={navigation} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: Styles.PINK,
                    headerStyle: {
                        backgroundColor: Styles.PINK,
                    },

                })}
            />
            <Stack.Screen
                name='CommentsScreen'
                component={CommentsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => <GoBackOrSaveHeader navigation={navigation} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: Styles.PINK,
                    headerStyle: {
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
                    headerStyle: {
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='FollowScreen'
                component={FollowScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => <GoBackOrSaveHeader navigation={navigation} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: Styles.PINK,
                    headerStyle: {
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='FavoritesScreen'
                component={FavoritesScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => <GoBackOrSaveHeader navigation={navigation} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: Styles.PINK,
                    headerStyle: {
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='SettingsScreen'
                component={SettingsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => <GoBackOrSaveHeader navigation={navigation} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: Styles.PINK,
                    headerStyle: {
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
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='MakePrivateScreen'
                component={MakePrivateScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => <GoBackOrSaveHeader route={route} navigation={navigation} save={false} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: Styles.PINK,
                    headerStyle: {
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='DeleteAccountScreen'
                component={DeleteAccountScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => <GoBackOrSaveHeader route={route} navigation={navigation} save={false} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: Styles.PINK,
                    headerStyle: {
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='ReAuthenticationScreen'
                component={ReAuthenticationScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => <GoBackOrSaveHeader route={route} navigation={navigation} save={false} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: Styles.PINK,
                    headerStyle: {
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='NotificationsSettingsScreen'
                component={NotificationsSettingsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => <GoBackOrSaveHeader route={route} navigation={navigation} save={false} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: Styles.PINK,
                    headerStyle: {
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='DrinkOptionsScreen'
                component={DrinkOptionsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => <GoBackOrSaveHeader route={route} navigation={navigation} save={false} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: Styles.PINK,
                    headerStyle: {
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
        </Stack.Navigator>
    );
}

export default ProfileNavigator;