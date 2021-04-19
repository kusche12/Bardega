import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../Screens/AuthScreens/LoginScreen';
import CreateAccountScreen from '../../Screens/AuthScreens/CreateAccountScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Create'
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Create"
                component={CreateAccountScreen}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator;