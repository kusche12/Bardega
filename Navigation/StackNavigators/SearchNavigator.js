import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { getRandomDrinksNoQuery } from '../../Functions/drinkFunctions';
import { createStackNavigator } from '@react-navigation/stack';
import DrinkDetailScreen from '../../Screens/Main/DrinkDetailScreen';
import DrinkListScreen from '../../Screens/Main/DrinkListScreen';
import SearchScreen from '../../Screens/Main/SearchScreen';
import ProfileScreen from '../../Screens/Main/ProfileScreen';
import CommentsScreen from '../../Screens/Main/CommentsScreen';
import DrinkOptionsScreen from '../../Screens/Main/DrinkOptionsScreen';
import MainHeader from '../../Components/TopNavbar/MainHeader';
import SearchHeader from '../../Components/TopNavbar/SearchHeader'
import GoBackOrSaveHeader from '../../Components/TopNavbar/GoBackOrSaveHeader';
import Styles from '../../Styles/StyleConstants';

const Stack = createStackNavigator();

// TODO: Test that the useEffect function actually returns 10 random drinks
// When you have more drinks in the database
const SearchNavigator = ({ route, navigation, drinks }) => {
    // Random drinks preloaded into the search page before user searches anything
    const [isLoading, setIsLoading] = useState(true);
    const [preloadedDrinks, setPreloadedDrinks] = useState([]);
    useEffect(() => {
        async function fetchData() {
            if (drinks) {
                const res = await getRandomDrinksNoQuery(drinks, 10);
                setPreloadedDrinks(res);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [drinks]);

    if (isLoading) {
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
                    initialParams={{ results: preloadedDrinks }}
                    options={({ route, navigation }) => ({
                        headerTitle: () => <SearchHeader navigation={navigation} preloadedDrinks={preloadedDrinks} />,
                        headerTitleStyle: { flexDirection: 'row', flex: 1, backgroundColor: Styles.PINK },
                        headerTitleAlign: 'center',
                        headerStyle: {
                            backgroundColor: Styles.PINK,
                        },
                    })}
                />
            </Stack.Navigator>
        )
    } else {
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
                    initialParams={{ results: preloadedDrinks }}
                    options={({ route, navigation }) => ({
                        headerTitle: () => <SearchHeader navigation={navigation} preloadedDrinks={preloadedDrinks} />,
                        headerTitleStyle: { flexDirection: 'row', flex: 1, backgroundColor: Styles.PINK },
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
                    initialParams={route, navigation}
                    options={() => ({
                        headerTitle: () => <MainHeader />,
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