import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SpiritDetailScreen from '../../Screens/Main/SpiritDetailScreen';
import SpiritScreen from '../../Screens/Main/SpiritScreen';
import MainHeader from '../../Components/TopNavbar/MainHeader';
import GoBackOrSaveHeader from '../../Components/TopNavbar/GoBackOrSaveHeader';
import Styles from '../../Styles/StyleConstants';

const Stack = createStackNavigator();
// TODO: Implement a DrinkListScreen when clicking the "See more" button on the horizontal list of spirit screen
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
                name='SpiritDetailScreen'
                component={SpiritDetailScreen}
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