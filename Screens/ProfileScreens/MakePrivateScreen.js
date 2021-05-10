import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Switch, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import Images from '../../Images/Images';
import { updatePrivacy } from '../../Store/Actions/ProfileActions';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

// TODO: Allow the user to hide / show their liked drinks
const MakePrivateScreen = ({ userID, error, user, updatePrivacy }) => {

    const [isPrivate, setIsPrivate] = useState(false);

    useEffect(() => {
        if (user) {
            setIsPrivate(user.private);
        }
    }, [user.private]);

    const handleChange = async () => {
        if (isPrivate) {
            return Alert.alert(
                "Are you sure?",
                "Every user on this app will have access to your account profile and drinks.",
                [
                    {
                        text: "Make Account Public",
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
            return Alert.alert(
                "Are you sure?",
                "Only your followers will be allowed to view your profile and drinks.",
                [
                    {
                        text: "Make Account Private",
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
        }


    }

    const confirm = async () => {
        await updatePrivacy({ id: userID, privacy: !isPrivate });
    }

    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'flex-start' }}>
                <Text style={GlobalStyles.paragraphbold2}>Account Privacy</Text>
            </View>
            <View style={[GlobalStyles.line, { backgroundColor: Styles.LIGHT_GRAY, marginBottom: 16 }]}></View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={Images.settings.lock} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 8 }} />
                    <Text style={GlobalStyles.paragraph1}>Private Account</Text>
                </View>
                <Switch
                    value={isPrivate}
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
        updatePrivacy: (data) => dispatch(updatePrivacy(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MakePrivateScreen);
