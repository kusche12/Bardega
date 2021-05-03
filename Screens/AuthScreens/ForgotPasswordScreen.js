import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Text, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { forgotPassword } from '../../Store/Actions/AuthActions';
import AuthInput from '../../Components/Auth/AuthInput';
import BardegaLogoSVG from '../../Components/Main/BardegaLogoSVG';
import Styles from '../../Styles/StyleConstants';
import AuthStyles from '../../Styles/AuthStyles';
import GlobalStyles from '../../Styles/GlobalStyles';

const ForgotPasswordScreen = ({ navigation, forgotPassword, authError, authSuccess }) => {
    const [email, setEmail] = useState('');

    const handleResetPassword = () => {
        forgotPassword(email);
    }

    return (
        <SafeAreaView style={AuthStyles.container}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                contentContainerStyle={{ flexGrow: 1 }}
            >

                <BardegaLogoSVG width={Styles.width} height={Styles.height / 5} style={{ top: 20, marginBottom: 40 }} />

                <View style={AuthStyles.forgotForm}>
                    <Text style={[GlobalStyles.titlebold1, { marginBottom: 14 }]}>Forgot your password?</Text>
                    <Text style={[GlobalStyles.title3, { fontSize: 16, marginBottom: 14 }]}>Confirm your email and we'll send the instructions.</Text>
                    <AuthInput image={'user'} value={email} setValue={setEmail} type={'Email'} />
                    <TouchableWithoutFeedback onPress={() => handleResetPassword()}>
                        <View style={AuthStyles.mainButton}>
                            <Text style={{ fontWeight: '500' }}>Reset Password</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {authError !== null &&
                        <Text style={{ color: 'red', textAlign: 'center' }}>{authError}</Text>
                    }
                    {authSuccess !== null &&
                        <Text style={{ color: '#04d93d', textAlign: 'center' }}>{authSuccess}</Text>
                    }
                </View>

                <View style={AuthStyles.footer}>
                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                        <Text style={GlobalStyles.titlebold3}>Don't have an account? </Text>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Create')}>
                            <Text style={[GlobalStyles.titlebold3, { color: Styles.DARK_PINK }]}>Create one</Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                        <Text style={GlobalStyles.titlebold3}>Already have an account? </Text>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                            <Text style={[GlobalStyles.titlebold3, { color: Styles.DARK_PINK }]}>Log In</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        authSuccess: state.auth.authSuccess,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        forgotPassword: (newUser) => dispatch(forgotPassword(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);