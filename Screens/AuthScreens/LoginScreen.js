import React, { useState, useEffect } from 'react';
import { View, Image, TouchableWithoutFeedback, Text, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getCachedImage, cacheImages } from '../../Functions/cacheFunctions';
import { Asset } from 'expo-asset';
import { connect } from 'react-redux';
import { logIn } from '../../Store/Actions/AuthActions';
import AuthInput from '../../Components/Auth/AuthInput';
import AuthStyles from '../../Styles/AuthStyles';

const DARKPINK = '#f06656';

// TODO: Load and render a higher quality version of the logo
const LoginScreen = ({ navigation, logIn, authError }) => {
    console.log(authError);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const imageURI = Asset.fromModule(require('./splash_background.png')).uri;
        cacheImages(imageURI, 0);
    }, []);

    const handleLogin = () => {
        //console.log('hello world')
        logIn({ email, password });
    }

    return (
        <SafeAreaView style={AuthStyles.container}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                contentContainerStyle={{ flexGrow: 1 }}
            >

                <Image source={require('./bardega_logo_full.png')} style={AuthStyles.screenLogo} />

                <View style={AuthStyles.loginForm}>
                    <AuthInput image={'user'} value={email} setValue={setEmail} type={'Email / Username'} />
                    <AuthInput image={'password'} value={password} setValue={setPassword} type={'Password'} />
                    <TouchableWithoutFeedback onPress={() => handleLogin()}>
                        <View style={AuthStyles.mainButton}>
                            <Text style={{ fontWeight: '500' }}>Sign In</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {authError &&
                        <Text>{authError}</Text>
                    }
                </View>

                <View style={AuthStyles.footer}>
                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                        <Text style={{ fontWeight: '500' }}>Don't have an account? </Text>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Create')}>
                            <Text style={{ color: DARKPINK, fontWeight: '500' }}>Create one</Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={{ color: DARKPINK, fontWeight: '500' }}>Forgot Password</Text>
                    </TouchableWithoutFeedback>
                </View>

            </KeyboardAwareScrollView>
            <Image source={{ uri: getCachedImage(0) }} style={AuthStyles.background} />
        </SafeAreaView>
    );
}

// Get any authentication errors that occur during sign in
const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
}

// Dispatch the login function to authenticate the user
const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (credentials) => dispatch(logIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);