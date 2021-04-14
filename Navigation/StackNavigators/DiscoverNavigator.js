import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrinkDetailScreen from '../../Screens/Main/DrinkDetailScreen';
import DrinkListScreen from '../../Screens/Main/DrinkListScreen';
import MainHeader from '../../Components/TopNavbar/MainHeader';
import GoBackHeader from '../../Components/TopNavbar/GoBackHeader';
import DiscoverScreen from '../../Screens/Main/DiscoverScreen';
import CommentsScreen from '../../Screens/Main/CommentsScreen';

const Stack = createStackNavigator();
const LIGHTPINK = '#F7D2CF';

const DiscoverNavigator = ({ route, navigation }) => {
    const { header } = route.params;

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
                    headerTitle: () => <MainHeader header={header} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
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
        </Stack.Navigator>
    );
}

export default DiscoverNavigator;