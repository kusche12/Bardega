import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, Image } from 'react-native';
import Images from '../../Images/Images';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants';

const ReportSuccessScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={[GlobalStyles.headerSafeArea, { alignItems: 'center', paddingHorizontal: 16 }]}>
            <Image source={Images.detail.success} style={{ width: Styles.width * .25, height: Styles.width * .25, marginBottom: 10 }} />
            <Text style={[GlobalStyles.paragraphbold2, { marginBottom: 40 }]}>Thank you for your consideration. Your report has officially been filed to the Bardega Support Team.</Text>
            <TouchableOpacity onPress={() => navigation.navigate('DiscoverScreen')}>
                <Text style={[GlobalStyles.paragraph2, { color: Styles.DARK_PINK }]}>Return to home screen</Text>

            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ReportSuccessScreen;