import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrinkDetailScreen from '../../Screens/Main/DrinkDetailScreen';
import CreateScreen from '../../Screens/Main/CreateScreen';
import MainHeader from '../../Components/TopNavbar/MainHeader';
import GoBackHeader from '../../Components/TopNavbar/GoBackHeader';

const Stack = createStackNavigator();
const LIGHTPINK = '#F7D2CF';

const CreateNavigator = ({ route, navigation }) => {

    return (
        <Stack.Navigator
            headerMode='screen'
            screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}>
            <Stack.Screen
                name='CreateScreen'
                component={CreateScreen}
                initialParams={route.params, navigation}
                options={() => ({
                    headerTitle: () => <MainHeader />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
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
                    headerTintColor: LIGHTPINK
                })}
            />
        </Stack.Navigator>
    );
}

export default CreateNavigator;