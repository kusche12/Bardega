import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrinkDetailScreen from '../../Screens/Main/DrinkDetailScreen';
import SpiritScreen from '../../Screens/Main/SpiritScreen';
import MainHeader from '../../Components/TopNavbar/MainHeader';
import GoBackOrSaveHeader from '../../Components/TopNavbar/GoBackOrSaveHeader';
import Styles from '../../Styles/StyleConstants';

const Stack = createStackNavigator();

const SpiritNavigator = ({ route, navigation }) => {

    return (
        <Stack.Navigator
            headerMode='screen'
            screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
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
                    headerStyle: {
                        backgroundColor: Styles.PINK,
                    },
                    headerTintColor: Styles.PINK
                })}
            />
        </Stack.Navigator>
    );
}

export default SpiritNavigator;