import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();
const { width } = Dimensions.get('window');

// Renders the top header for each main screen.
const Header = ({ route, component, name }) => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={name}
                component={component}
                initialParams={route.params}
                // If it is the profile page, then render the inbox button
                options={name !== "Profile"
                    ? {
                    headerTitle: props => (
                            <Image
                                style={{ width: width, height: 150 }}
                                source={require('./bardega_logo.png')}
                                resizeMode='cover'
                            />
                        ),
                        headerTitleStyle: { flex: 1, textAlign: 'center' },
                        headerTitleAlign: 'center'
                    }
                    : {
                        headerTitle: () => (
                            <Image
                                style={{ height: 150 }}
                                source={require('./bardega_logo.png')}
                                resizeMode='contain'
                            />
                        ),
                        headerTitleStyle: { flex: 1, textAlign: 'center' },
                        headerTitleAlign: 'center',
                        headerRight: () => (
                            <TouchableOpacity onPress={() => console.log('nav to inbox')}>
                                <Feather name="inbox" size={24} color="black" />
                            </TouchableOpacity>
                        )
                    }
                }
            />
        </Stack.Navigator>
    );
}

export default Header;