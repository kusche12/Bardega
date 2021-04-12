import React from 'react';
import { Image, View, TouchableWithoutFeedback } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';

const GoBackHeader = ({ navigation }) => {
    return (
        <View style={GlobalStyles.headerWithButtons} >
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Image
                    style={{ height: 20, width: 20 }}
                    source={require('./back_button.png')}
                    resizeMode='contain'
                />
            </TouchableWithoutFeedback>
        </View>
    )
}

export default GoBackHeader;