import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrinkDetailScreen from '../../Screens/Main/DrinkDetailScreen';
import DrinkListScreen from '../../Screens/Main/DrinkListScreen';
import SearchScreen from '../../Screens/Main/SearchScreen';
import ProfileScreen from '../../Screens/Main/ProfileScreen';
import CommentsScreen from '../../Screens/Main/CommentsScreen';
import MainHeader from '../../Components/TopNavbar/MainHeader';
import SearchHeader from '../../Components/TopNavbar/SearchHeader'
import GoBackHeader from '../../Components/TopNavbar/GoBackHeader';

const Stack = createStackNavigator();
const LIGHTPINK = '#F7D2CF';

const SearchNavigator = ({ route, navigation }) => {
    const { header } = route.params;
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
                    headerTitleStyle: { flexDirection: 'row', flex: 1, backgroundColor: LIGHTPINK },
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: LIGHTPINK,
                    },
                })}
            />
            <Stack.Screen
                name='DrinkDetailScreen'
                component={DrinkDetailScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader header={header} />,
                    headerRight: () => <GoBackHeader navigation={navigation} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: LIGHTPINK
                })}
            />
            <Stack.Screen
                name='DrinkListScreen'
                component={DrinkListScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader header={header} />,
                    headerRight: () => <GoBackHeader navigation={navigation} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: LIGHTPINK
                })}
            />
            <Stack.Screen
                name='CommentsScreen'
                component={CommentsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader header={header} />,
                    headerRight: () => <GoBackHeader navigation={navigation} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: LIGHTPINK
                })}
            />
            <Stack.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                initialParams={route.params, navigation}
                options={() => ({
                    headerTitle: () => <MainHeader header={header} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                })}
            />
        </Stack.Navigator>
    );
}

export default SearchNavigator;