import React, { useState, useEffect } from 'react';
import { View, Image, TouchableWithoutFeedback, Text, SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getCachedImage, cacheImages } from '../../Functions/cacheFunctions';
import { Asset } from 'expo-asset';
import AuthInput from '../../Components/Auth/AuthInput';
import AuthStyles from '../../Styles/AuthStyles';

const DARKPINK = '#f06656';

// TODO: Allow for authentication via, facebook, twitter, or gmail
// TODO: Load and render a higher quality version of the logo
const CreateAccountScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const imageURI = Asset.fromModule(require('./splash_background.png')).uri;
        cacheImages(imageURI, 0);
    }, []);

    const handleFacebookAuth = () => {
        console.log('hello facebook')
    }

    return (
        <SafeAreaView style={AuthStyles.container}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                contentContainerStyle={{ flexGrow: 1 }}
            >

                <Image source={require('./bardega_logo_full.png')} style={AuthStyles.screenLogo} />

                <View style={AuthStyles.form}>
                    <AuthInput image={'user'} value={name} setValue={setName} type={'Firstname Lastname'} />
                    <AuthInput image={'userName'} value={userName} setValue={setUserName} type={'Username'} />
                    <AuthInput image={'email'} value={email} setValue={setEmail} type={'Email'} />
                    <AuthInput image={'password'} value={password} setValue={setPassword} type={'Password'} />
                    <TouchableWithoutFeedback onPress={() => handleCreateAccount()}>
                        <View style={AuthStyles.mainButton}>
                            <Text style={{ fontWeight: '500' }}>Create Account</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={AuthStyles.thirdPartyButtons}>
                    <TouchableWithoutFeedback onPress={() => handleFacebookAuth()}>
                        <Image source={require('./facebook.png')} style={AuthStyles.thirdPartyAuth} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleFacebookAuth()}>
                        <Image source={require('./twitter.png')} style={AuthStyles.thirdPartyAuth} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => handleFacebookAuth()}>
                        <Image source={require('./google.png')} style={AuthStyles.thirdPartyAuth} />
                    </TouchableWithoutFeedback>
                </View>

                <View style={AuthStyles.footer}>
                    <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                        <Text style={{ fontWeight: '500' }}>Already have an account? </Text>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                            <Text style={{ color: DARKPINK, fontWeight: '500' }}>Log in</Text>
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

export default CreateAccountScreen;