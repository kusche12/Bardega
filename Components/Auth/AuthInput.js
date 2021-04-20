import React from 'react';
import { TextInput, View, Image } from 'react-native';
import Images from '../../Images/Images';
import AuthStyles from '../../Styles/AuthStyles';


const AuthInput = ({ type, value, setValue, image }) => {

    return (
        <View style={AuthStyles.inputContainer}>
            <Image source={Images.authInput[image]} style={AuthStyles.inputImg} />
            <TextInput
                style={AuthStyles.input}
                onChangeText={setValue}
                value={value}
                placeholder={type}
                multiline={false}
                placeholderTextColor='#333'
                autoCapitalize={'none'}
                autoCorrect={false}
                secureTextEntry={type === 'Password'}
            />
        </View>
    )
}

export default AuthInput;