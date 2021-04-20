import React from 'react';
import { Image, View } from 'react-native';
import Images from '../../Images/Images';
import AuthStyles from '../../Styles/AuthStyles';

const SplashScreen = () => {

    return (
        <View>
            <Image source={Images.background} style={AuthStyles.splashBackground} />
            <Image source={Images.bardegaLogo} style={AuthStyles.bardegaLogo} />
        </View>
    )
}

export default SplashScreen;