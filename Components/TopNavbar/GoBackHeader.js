import React from 'react';
import { Image, View, TouchableWithoutFeedback } from 'react-native';
import Images from '../../Images/Images';
import GlobalStyles from '../../Styles/GlobalStyles';

const GoBackHeader = ({ navigation }) => {
    return (
        <View style={GlobalStyles.headerWithButtons} >
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Image
                    style={{ height: 20, width: 20 }}
                    source={Images.topNav.backButton}
                    resizeMode='contain'
                />
            </TouchableWithoutFeedback>
        </View>
    )
}

export default GoBackHeader;