import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../../Screens/AuthScreens/LoginScreen';
import CreateAccountScreen from '../../Screens/AuthScreens/CreateAccountScreen';
import ForgotPasswordScreen from '../../Screens/AuthScreens/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AuthNavigator = ({ setAuthedUser }) => {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                initialParams={{ setAuthedUser: setAuthedUser }}
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