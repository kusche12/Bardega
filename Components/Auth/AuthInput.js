import React from 'react';
import { TextInput, View, Image, Platform } from 'react-native';
import Images from '../../Images/Images';
import AuthStyles from '../../Styles/AuthStyles';
import Styles from '../../Styles/StyleConstants';
import GlobalStyles from '../../Styles/GlobalStyles';

const AuthInput = ({ type, value, setValue, image, reauth, capitalize }) => {

    return (
        <View style={[AuthStyles.inputContainer, reauth && { borderBottomColor: Styles.LIGHT_GRAY, width: Styles.width * .95 }]}>
            <Image source={Images.authInput[image]} style={AuthStyles.inputImg} />
            <TextInput
                style={[GlobalStyles.titlebold3, { height: 40 }, Platform.OS === 'android' && { width: Styles.width * .7 }]}
                onChangeText={setValue}
                value={value}
                placeholder={type}
                multiline={false}
                placeholderTextColor={Styles.DARK_GRAY}
                autoCapitalize={capitalize ? 'words' : 'none'}
                autoCorrect={false}
                secureTextEntry={type === 'Password'}
            />
        </View>
    )
}

export default AuthInput;