import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../Screens/AuthScreens/LoginScreen';
import CreateAccountScreen from '../../Screens/AuthScreens/CreateAccountScreen';
import ForgotPasswordScreen from '../../Screens/AuthScreens/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='Create'
            screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
                headerShown: false
            }}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
            />
            <Stack.Screen
                name="Create"
                component={CreateAccountScreen}
            />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator;