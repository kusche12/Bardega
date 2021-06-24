import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import Images from '../../Images/Images';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const DeleteAccountScreen = ({ error, navigation }) => {
    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'flex-start' }}>
                <Text style={GlobalStyles.paragraphbold2}>Account Settings</Text>
            </View>
            <View style={[GlobalStyles.line, { backgroundColor: Styles.LIGHT_GRAY, marginBottom: 16 }]}></View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'space-between' }}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('ReAuthenticationScreen', { type: "deleteAccount", navigation })}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={Images.settings.trash} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 8 }} />
                            <Text style={[GlobalStyles.paragraph1]}>Delete Account</Text>
                        </View>
                        <Image source={Images.settings.about} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                    </View>
                </TouchableWithoutFeedback>

            </View>
            {error && <Text style={[GlobalStyles.paragraphError2, { textAlign: 'center' }]}>{error}</Text>}
        </SafeAreaView>
    )
}
export default DeleteAccountScreen
