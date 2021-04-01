import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity, Dimensions, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DrinkDetailScreen from '../../Screens/DetailScreens/DrinkDetailScreen';

const Stack = createStackNavigator();
const { width } = Dimensions.get('window');
const LIGHTPINK = '#F7D2CF';


// Renders the top header for each main screen.
const Header = ({ route, component, name, navigation }) => {
    return (
        <Stack.Navigator
            headerMode='screen' // SUPER IMPORTANT. This fixed screen transition glitch
            screenOptions={{
            headerStyle: { elevation: 0 },
            cardStyle: { opacity: 1 }
        }}>
            <Stack.Screen
                name={name}
                component={component}
                initialParams={route.params, navigation}
                options={{
                    headerTitle: props => (
                            <Image
                                style={{ width: width, height: 150 }}
                                source={require('./bardega_logo.png')}
                                resizeMode='cover'
                            />
                        ),
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerRight: () => {
                        if (name === 'Profile') {
                            return (
                                <TouchableOpacity onPress={() => console.log('nav to inbox')}>
                                    <Feather name="inbox" size={24} color="black" />
                                </TouchableOpacity>
                            )
                        }
                        return;
                    }
                }}
            />
            <Stack.Screen
                name='DrinkDetailScreen'
                component={DrinkDetailScreen}
                initialParams={route.params, navigation}
                options={
                    {
                        headerTitle: () => (
                            <Image
                                style={{ height: 150 }}
                                source={require('./bardega_logo.png')}
                                resizeMode='contain'
                            />
                        ),
                        headerBackImage: () => {
                            null
                        },
                        headerTitleStyle: { flex: 1, textAlign: 'center' },
                        headerTitleAlign: 'center',
                        headerBackTitleVisible: false,
                        headerTintColor: LIGHTPINK
                    }
                }
            />
        </Stack.Navigator>
    );
}

export default Header;