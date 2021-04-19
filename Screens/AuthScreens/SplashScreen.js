import React from 'react';
import { Image, View } from 'react-native';
import AuthStyles from '../../Styles/AuthStyles'

const SplashScreen = () => {

    return (
        <View>
            <Image source={require('./splash_background.png')} style={AuthStyles.splashBackground} />
            <Image source={require('./bardega_logo.png')} style={AuthStyles.bardegaLogo} />
        </View>
    )
}

export default SplashScreen;