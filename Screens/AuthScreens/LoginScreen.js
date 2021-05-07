import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Text, SafeAreaView } from 'react-native';
import BardegaLogoSVG from '../../Components/Main/BardegaLogoSVG';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { logIn } from '../../Store/Actions/AuthActions';
import Styles from '../../Styles/StyleConstants';
import AuthInput from '../../Components/Auth/AuthInput';
import AuthStyles from '../../Styles/AuthStyles';
import GlobalStyles from '../../Styles/GlobalStyles';

const LoginScreen = ({ navigation, logIn, authError }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <SafeAreaView style={AuthStyles.container}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                contentContainerStyle={{ flexGrow: 1 }}
            >

                <BardegaLogoSVG width={Styles.width} height={Styles.height / 5} style={{ top: 20, marginBottom: 40 }} />

                <View style={AuthStyles.loginForm}>
                    <AuthInput image={'user'} value={email} setValue={setEmail} type={'Email / Username'} />
                    <AuthInput image={'password'} value={password} setValue={setPassword} type={'Password'} />
                    <TouchableWithoutFeedback onPress={() => logIn({ email, password })}>
                        <View style={AuthStyles.mainButton}>
                            <Text style={[GlobalStyles.titlebold2, { fontSize: 16 }]}>Sign In</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {authError !== null &&
                        <Text style={{ color: 'red', textAlign: 'center' }}>{authError}</Text>
                    }
                </View>

                <View style={AuthStyles.footer}>
                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                        <Text style={GlobalStyles.titlebold3}>Don't have an account? </Text>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Create')}>
                            <Text style={[GlobalStyles.titlebold3, { color: Styles.DARK_PINK }]}>Create one</Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={[GlobalStyles.titlebold3, { color: Styles.DARK_PINK }]}>Forgot Password</Text>
                    </TouchableWithoutFeedback>
                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

// Get any authentication errors that occur during sign in
const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
    }
}

// Dispatch the login function to authenticate the user
const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (credentials) => dispatch(logIn(credentials))
    }
}

export default
    connect(mapStateToProps, mapDispatchToProps)
        (LoginScreen);