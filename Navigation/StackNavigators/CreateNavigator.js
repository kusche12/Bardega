import * as React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DrinkDetailScreen from '../../Screens/Main/DrinkDetailScreen';
import CreateScreen from '../../Screens/Main/CreateScreen';
import DrinkOptionsScreen from '../../Screens/Main/DrinkOptionsScreen';
import MainHeader from '../../Components/TopNavbar/MainHeader';
import Styles from '../../Styles/StyleConstants';

const Stack = createStackNavigator();

const CreateNavigator = ({ route, navigation }) => {

    return (
        <Stack.Navigator
            headerMode='screen'
            screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
                lazyLoad: false,
                headerBackTitleVisible: false
            }}>
            <Stack.Screen
                name='CreateScreen'
                component={CreateScreen}
                initialParams={route.params, navigation}
                options={() => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
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
        </Stack.Navigator>
    );
}

export default CreateNavigator;