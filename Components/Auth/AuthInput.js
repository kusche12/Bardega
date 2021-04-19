import React from 'react';
import { TextInput, View, Image } from 'react-native';
import AuthStyles from '../../Styles/AuthStyles';

const Images = {
    user: require('./user.png'),
    userName: require('./userName.png'),
    email: require('./email.png'),
    password: require('./password.png'),
}

const AuthInput = ({ type, value, setValue, image }) => {

    return (
        <View style={AuthStyles.inputContainer}>
            <Image source={Images[image]} style={AuthStyles.inputImg} />
            <TextInput
                style={AuthStyles.input}
                onChangeText={setValue}
                value={value}
                placeholder={type}
                multiline={false}
                placeholderTextColor='#888'
                autoCapitalize={false}
                autoCorrect={false}
                secureTextEntry={type === 'Password'}
            />
        </View>
    )
}

export default AuthInput;