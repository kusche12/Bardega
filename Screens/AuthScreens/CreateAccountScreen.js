import React, { useState } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BardegaLogoSVG from '../../Components/Main/BardegaLogoSVG';
import { connect } from 'react-redux';
import { signUp, loginFacebook, loginGoogle } from '../../Store/Actions/AuthActions';
import AuthInput from '../../Components/Auth/AuthInput';
import AuthStyles from '../../Styles/AuthStyles';
import Styles from '../../Styles/StyleConstants';
import GlobalStyles from '../../Styles/GlobalStyles';

const CreateAccountScreen = ({ navigation, signUp, authError, loginFacebook, loginGoogle }) => {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateAccount = () => {
        signUp({ name, userName, email, password })
    }

    return (
        <SafeAreaView style={AuthStyles.container}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                contentContainerStyle={{ flexGrow: 1 }}
            >

                <BardegaLogoSVG width={Styles.width} height={Styles.height / 5} style={{ top: 20, marginBottom: 40 }} />

                <View style={AuthStyles.form}>
                    <AuthInput image={'user'} value={name} setValue={setName} type={'Firstname Lastname'} capitalize={true} />
                    <AuthInput image={'userName'} value={userName} setValue={setUserName} type={'Username'} />
                    <AuthInput image={'email'} value={email} setValue={setEmail} type={'Email'} />
                    <AuthInput image={'password'} value={password} setValue={setPassword} type={'Password'} />
                    <TouchableOpacity onPress={() => handleCreateAccount()}>
                        <View style={AuthStyles.mainButton}>
                            <Text style={[GlobalStyles.titlebold2, { fontSize: 16 }]}>Create Account</Text>
                        </View>
                    </TouchableOpacity>
                    {authError !== null &&
                        <Text style={{ color: 'red', textAlign: 'center', marginBottom: 8 }}>{authError}</Text>
                    }
                </View>

                <View style={AuthStyles.footer}>
                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                        <Text style={GlobalStyles.titlebold3}>Already have an account? </Text>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                            <Text style={[GlobalStyles.titlebold3, { color: Styles.DARK_PINK }]}>Log in</Text>
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

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser)),
        loginFacebook: () => dispatch(loginFacebook()),
        loginGoogle: () => dispatch(loginGoogle())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountScreen);