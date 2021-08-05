import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SpiritDetailScreen from '../../Screens/Main/SpiritDetailScreen';
import SpiritScreen from '../../Screens/Main/SpiritScreen';
import SpiritUploadScreen from '../../Screens/Main/SpiritUploadScreen';
import DrinkListScreen from '../../Screens/Main/DrinkListScreen';
import CommentsScreen from '../../Screens/Main/CommentsScreen';
import MainHeader from '../../Components/TopNavbar/MainHeader';
import Styles from '../../Styles/StyleConstants';

const Stack = createStackNavigator();
const SpiritNavigator = ({ route, navigation }) => {
    return (
        <Stack.Navigator
            headerMode='screen'
            screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
                lazyLoad: false,
            }}>
            <Stack.Screen
                name='SpiritScreen'
                component={SpiritScreen}
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
                name='SpiritUploadScreen'
                component={SpiritUploadScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
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
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
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
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
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
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerTintColor: 'black',
                    headerStyle: {
                        height: 100,
                        backgroundColor: Styles.PINK,
                    },
                })}
            />
        </Stack.Navigator>
    );
}

export default SpiritNavigator;