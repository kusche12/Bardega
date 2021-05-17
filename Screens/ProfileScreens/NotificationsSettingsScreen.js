import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Switch, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import Images from '../../Images/Images';
import { updateNotifications } from '../../Store/Actions/ProfileActions';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

// TODO: Deep link from this screen to the app settings screen where the user can turn on / off their settings
// Also, keep the current API call when this switch is hit so that their notif options are still in firestore
// https://www.youtube.com/watch?v=ruaAUbekM9Q around 8:45
const NotificationsSettingsScreen = ({ userID, error, user, updateNotifications }) => {

    const [allowNotifs, setAllowNotifs] = useState(true);

    useEffect(() => {
        if (user) {
            setAllowNotifs(user.receiveNotifications);
        }
    }, [user.receiveNotifications]);

    const handleChange = async () => {
        if (allowNotifs) {
            return Alert.alert(
                "Are you sure?",
                "You will no longer receive any notifications from the application regarding comments or followers.",
                [
                    {
                        text: "Turn off Notifications",
                        onPress: () => confirm()
                    },
                    {
                        text: "Cancel",
                        onPress: console.log(false),
                        style: "cancel",
                    }
                ],
                { cancelable: true }
            );
        } else {
            await confirm();
        }


    }

    const confirm = async () => {
        await updateNotifications({ id: userID, notifications: !allowNotifs });
    }

    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'flex-start' }}>
                <Text style={GlobalStyles.paragraphbold2}>Notification Preferences</Text>
            </View>
            <View style={[GlobalStyles.line, { backgroundColor: Styles.LIGHT_GRAY, marginBottom: 16 }]}></View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={Images.settings.bell} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 8 }} />
                    <Text style={GlobalStyles.paragraph1}>Allow Notifications</Text>
                </View>
                <Switch
                    value={allowNotifs}
                    onValueChange={handleChange}
                />

            </View>
            { error && <Text style={[GlobalStyles.paragraphError2, { textAlign: 'center' }]}>{error}</Text>}
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    const profiles = state.firestore.data.profiles;
    const profile = profiles ? profiles[state.firebase.auth.uid] : null;
    return {
        userID: state.firebase.auth.uid,
        error: state.profile.profileError,
        user: profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNotifications: (data) => dispatch(updateNotifications(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NotificationsSettingsScreen);
