import React, { useState, useEffect } from 'react';
import { View, Image, TouchableWithoutFeedback, Text, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getCachedImage, cacheImages } from '../../Functions/cacheFunctions';
import { Asset } from 'expo-asset';
import AuthInput from '../../Components/Auth/AuthInput';
import AuthStyles from '../../Styles/AuthStyles';

const DARKPINK = '#f06656';

// TODO: Load and render a higher quality version of the logo
const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const imageURI = Asset.fromModule(require('./splash_background.png')).uri;
        cacheImages(imageURI, 0);
    }, []);

    const handleResetPassword = () => {

    }

    return (
        <SafeAreaView style={AuthStyles.container}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                contentContainerStyle={{ flexGrow: 1 }}
            >

                <Image source={require('./bardega_logo_full.png')} style={AuthStyles.screenLogo} />

                <View style={AuthStyles.forgotForm}>
                    <Text style={{ fontWeight: '700', fontSize: 24, color: '#333', marginBottom: 14 }}>Forgot your password?</Text>
                    <Text style={{ color: '#333', fontSize: 16, marginBottom: 14 }}>Confirm your email and we'll send the instructions.</Text>
                    <AuthInput image={'user'} value={email} setValue={setEmail} type={'Email'} />
                    <TouchableWithoutFeedback onPress={() => handleResetPassword()}>
                        <View style={AuthStyles.mainButton}>
                            <Text style={{ fontWeight: '500' }}>Reset Password</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={AuthStyles.footer}>
                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                        <Text style={{ fontWeight: '500' }}>Don't have an account? </Text>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Create')}>
                            <Text style={{ color: DARKPINK, fontWeight: '500' }}>Create one</Text>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                        <Text style={{ fontWeight: '500' }}>Already have an account? </Text>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: DARKPINK, fontWeight: '500' }}>Log In</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>

            </KeyboardAwareScrollView>
            <Image source={{ uri: getCachedImage(0) }} style={AuthStyles.background} />
        </SafeAreaView>
    );
}

export default ForgotPasswordScreen;