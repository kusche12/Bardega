import React from 'react';
import { TouchableOpacity, Text, View, Image, Platform } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';

const SettingsButton = ({ name, action, icon }) => {
    return (
        <TouchableOpacity onPress={() => action()}>
            <View style={UserStyles.settingsButton}>
                <Text style={GlobalStyles.paragraph3}>{name}</Text>
                <Image source={icon} style={{ width: Platform.isPad ? 35 : 25, height: Platform.isPad ? 35 : 25, resizeMode: 'contain' }} />
            </View>
        </TouchableOpacity>
    )
}

export default SettingsButton
