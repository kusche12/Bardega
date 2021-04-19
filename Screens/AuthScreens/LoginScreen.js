import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Text, TextInput, Image, SafeAreaView } from 'react-native';
import AuthInput from '../../Components/Auth/AuthInput';
import AuthStyles from '../../Styles/AuthStyles';
import GlobalStyles from '../../Styles/GlobalStyles';

const LoginScreen = () => {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
            <SafeAreaView style={GlobalStyles.headerSafeArea}>
                <Image source={require('./bardega_logo.png')} style={AuthStyles.bardegaLogo} />
                {/* <AuthInput image={0} value={user} setValue={setUser} type={'Firstname Lastname'} /> */}
            </SafeAreaView>


            <Image source={require('./splash_background.png')} style={AuthStyles.splashBackground} />
        </View>
    );
}

export default LoginScreen;