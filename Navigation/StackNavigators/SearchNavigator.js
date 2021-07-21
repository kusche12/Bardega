import React from 'react';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { createStackNavigator } from '@react-navigation/stack';
import SpiritDetailScreen from '../../Screens/Main/SpiritDetailScreen';
import DrinkDetailScreen from '../../Screens/Main/DrinkDetailScreen';
import DrinkListScreen from '../../Screens/Main/DrinkListScreen';
import SearchScreen from '../../Screens/Main/SearchScreen';
import ProfileScreen from '../../Screens/Main/ProfileScreen';
import FollowScreen from '../../Screens/ProfileScreens/FollowScreen';
import CommentsScreen from '../../Screens/Main/CommentsScreen';
import DrinkOptionsScreen from '../../Screens/Main/DrinkOptionsScreen';
import CreateScreen from '../../Screens/Main/CreateScreen';
import MainHeader from '../../Components/TopNavbar/MainHeader';
import SearchHeader from '../../Components/TopNavbar/SearchHeader'
import GoBackOrSaveHeader from '../../Components/TopNavbar/GoBackOrSaveHeader';
import Styles from '../../Styles/StyleConstants';

const Stack = createStackNavigator();

const SearchNavigator = ({ route, navigation }) => {
    return (
        <Stack.Navigator
            headerMode='screen'
            screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}>
            <Stack.Screen
                name='SearchScreen'
                component={SearchScreen}
                initialParams={{ results: [] }}
                options={({ route, navigation }) => ({
                    headerTitle: () => <SearchHeader navigation={navigation} />,
                    headerTitleStyle: { flexDirection: 'row', flex: 1, backgroundColor: Styles.PINK },
                    headerTitleAlign: 'center',
                    headerStyle: {
                        height: 100,
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
                        height: 100,
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
                        height: 100,
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
                        height: 100,
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
                        height: 100,
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
                        height: 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                initialParams={route, navigation}
                options={() => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerStyle: {
                        height: 100,
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
                        height: 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
            <Stack.Screen
                name='SpiritDetailScreen'
                component={SpiritDetailScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerRight: () => <GoBackOrSaveHeader navigation={navigation} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerStyle: {
                        height: 100,
                        backgroundColor: Styles.PINK,
                    },
                    headerTintColor: Styles.PINK
                })}
            />
        </Stack.Navigator>
    );
}

const mapStateToProps = (state) => {
    return {
        drinks: state.firestore.ordered.drinks,
    }
}

export default compose(
    firestoreConnect(() => ['drinks']),
    connect(mapStateToProps)
)(SearchNavigator);