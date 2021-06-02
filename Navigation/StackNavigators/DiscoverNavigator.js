import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrinkDetailScreen from '../../Screens/Main/DrinkDetailScreen';
import ProfileScreen from '../../Screens/Main/ProfileScreen';
import DrinkListScreen from '../../Screens/Main/DrinkListScreen';
import DrinkOptionsScreen from '../../Screens/Main/DrinkOptionsScreen';
import MainHeader from '../../Components/TopNavbar/MainHeader';
import GoBackOrSaveHeader from '../../Components/TopNavbar/GoBackOrSaveHeader';
import DiscoverScreen from '../../Screens/Main/DiscoverScreen';
import CreateScreen from '../../Screens/Main/CreateScreen';
import CommentsScreen from '../../Screens/Main/CommentsScreen';
import Styles from '../../Styles/StyleConstants';

const Stack = createStackNavigator();

const DiscoverNavigator = ({ route, navigation }) => {

    return (
        <Stack.Navigator
            headerMode='screen'
            screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}>
            <Stack.Screen
                name='DiscoverScreen'
                component={DiscoverScreen}
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
            <Stack.Screen
                name='DrinkListScreen'
                component={DrinkListScreen}
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
                name='ProfileScreen'
                component={ProfileScreen}
                initialParams={route.params, navigation}
                options={() => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => <GoBackOrSaveHeader navigation={navigation} save={false} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
        </Stack.Navigator>
    );
}

export default DiscoverNavigator;