import * as React from "react"
import { View, Text, Image, TouchableWithoutFeedback, Linking } from 'react-native';
import Images from '../../Images/Images';
import GlobalStyles from "../../Styles/GlobalStyles";
import Styles from "../../Styles/StyleConstants";

function JoinClubButton() {
    return (
        <TouchableWithoutFeedback onPress={() => Linking.openURL('https://bardegacocktails.com')}>
            <View style={{
                paddingHorizontal: 14, paddingVertical: 6, backgroundColor: Styles.DARK_PINK, borderRadius: 16, flexDirection: 'row',
                alignItems: 'center', justifyContent: 'center', marginBottom: 22
            }}>
                <Text style={[GlobalStyles.titlebold3, { color: 'white', fontSize: 14 }]}>Join the Club</Text>
                <Image source={Images.detail.rightArrowWhite} style={{ width: 10, height: 10, resizeMode: 'contain', marginLeft: 8 }} />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default JoinClubButton;
