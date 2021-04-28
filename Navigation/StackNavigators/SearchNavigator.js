import * as React from 'react';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { createStackNavigator } from '@react-navigation/stack';
import DrinkDetailScreen from '../../Screens/Main/DrinkDetailScreen';
import DrinkListScreen from '../../Screens/Main/DrinkListScreen';
import SearchScreen from '../../Screens/Main/SearchScreen';
import ProfileScreen from '../../Screens/Main/ProfileScreen';
import CommentsScreen from '../../Screens/Main/CommentsScreen';
import MainHeader from '../../Components/TopNavbar/MainHeader';
import SearchHeader from '../../Components/TopNavbar/SearchHeader'
import GoBackHeader from '../../Components/TopNavbar/GoBackHeader';
import Styles from '../../Styles/StyleConstants';

const Stack = createStackNavigator();

const SearchNavigator = ({ route, navigation, drinks }) => {
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
                initialParams={{ results: drinks.slice(0, 1) }}
                options={({ route, navigation }) => ({
                    headerTitle: () => <SearchHeader navigation={navigation} />,
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
                    headerRight: () => <GoBackHeader navigation={navigation} />,
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
                    headerRight: () => <GoBackHeader navigation={navigation} />,
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
                    headerRight: () => <GoBackHeader navigation={navigation} />,
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

const mapStateToProps = (state) => {
    return {
        drinks: state.firestore.ordered.drinks,
    }
}

// Connect the drink detail page to our redux store and firestore DB
export default compose(
    firestoreConnect(() => ['drinks']),
    connect(mapStateToProps)
)(SearchNavigator);