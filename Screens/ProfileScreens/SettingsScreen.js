import React from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { logOut } from '../../Store/Actions/AuthActions';
import GlobalStyles from '../../Styles/GlobalStyles';
import SettingsButton from '../../Components/Profile/SettingsButton';
import UserStyles from '../../Styles/UserStyles';
import Images from '../../Images/Images';
import Styles from '../../Styles/StyleConstants';

// TODO: Get these buttons to work
const SettingsScreen = ({ logOut, navigation }) => {

    return (
        <ScrollView>
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { alignItems: 'center' }]} >
                <Text style={[GlobalStyles.titlebold1, { marginBottom: 25 }]}>SETTINGS</Text>
                <View style={[UserStyles.settingsButton, { backgroundColor: Styles.BRIGHT_PINK, height: 50, marginBottom: 16 }]}>
                    <Text style={GlobalStyles.titlebold2}>YOUR ACCOUNT</Text>
                </View>
                <SettingsButton name="Edit Profile" icon={Images.settings.switch} action={() => navigation.navigate('EditProfileScreen')} />
                <SettingsButton
                    name="Privacy"
                    icon={Images.settings.lock}
                    action={() => navigation.navigate('MakePrivateScreen')}
                />
                <SettingsButton name="Log out" icon={Images.settings.signout} action={() => logOut()} />
                <SettingsButton
                    name="Delete account"
                    icon={Images.settings.trash}
                    action={() => navigation.navigate('DeleteAccountScreen', { navigation })} />
                <View style={[UserStyles.settingsButton, { backgroundColor: Styles.BRIGHT_PINK, height: 50, marginBottom: 16 }]}>
                    <Text style={GlobalStyles.titlebold2}>DEVICE & ADDITIONAL SERVICES</Text>
                </View>
                <SettingsButton name="Notifications" icon={Images.settings.notifications} action={() => navigation.navigate('NotificationsSettingsScreen')} />
                <SettingsButton name="About us" icon={Images.settings.about} action={() => console.log('about us')} />
                <SettingsButton name="Contact us" icon={Images.settings.contact} action={() => console.log('contact us')} />
            </SafeAreaView>
        </ScrollView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut())
    }
}

export default connect(null, mapDispatchToProps)(SettingsScreen);