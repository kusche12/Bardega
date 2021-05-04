import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import AuthInput from '../../Components/Auth/AuthInput';
import { connect } from 'react-redux';
import Images from '../../Images/Images';
import { deleteAccount } from '../../Store/Actions/ProfileActions';
import GlobalStyles from '../../Styles/GlobalStyles';
import AuthStyles from '../../Styles/AuthStyles'

import Styles from '../../Styles/StyleConstants';

const ReAuthenticationScreen = ({ userID, error, user, deleteAccount, navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = async () => {
        return Alert.alert(
            "Are you sure?",
            "Oncwe your account is deleted, all of your created drinks will be deleted with no way to recover them.",
            [
                {
                    text: "Yes, Delete my Account",
                    onPress: () => deleteAccount(),
                    style: "destructive",
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

    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'flex-start' }}>
                <Text style={GlobalStyles.paragraphbold2}>Account Settings</Text>
            </View>
            <View style={[GlobalStyles.line, { backgroundColor: Styles.LIGHT_GRAY, marginBottom: 8 }]}></View>
            <Text style={[GlobalStyles.paragraph3, { paddingLeft: 8, marginBottom: 32 }]}>For privacy purposes, you will need to authenticate yourself before deleting your account.</Text>

            <View style={{ paddingHorizontal: 8, alignItems: 'flex-start' }}>
                <AuthInput image={'user'} value={email} setValue={setEmail} type={'Email / Username'} reauth={true} />
                <AuthInput image={'password'} value={password} setValue={setPassword} type={'Password'} reauth={true} />

                <View style={{ alignSelf: 'center', marginTop: 16 }}>
                    <TouchableWithoutFeedback onPress={() => handleChange()}>
                        <View style={[AuthStyles.mainButton, { flexDirection: 'row' }]}>
                            <Image source={Images.settings.trash} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 8 }} />
                            <Text style={[GlobalStyles.titlebold2, { fontSize: 16 }]}>Delete Account</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {error && <Text style={[GlobalStyles.paragraphError2, { textAlign: 'center' }]}>{error}</Text>}
            </View>
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
        deleteAccount: (data) => dispatch(deleteAccount(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ReAuthenticationScreen);
