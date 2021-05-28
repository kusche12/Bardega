import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import AuthInput from '../../Components/Auth/AuthInput';
import { connect } from 'react-redux';
import Images from '../../Images/Images';
import { deleteAccount } from '../../Store/Actions/ProfileActions';
import { logIn } from '../../Store/Actions/AuthActions'
import GlobalStyles from '../../Styles/GlobalStyles';
import AuthStyles from '../../Styles/AuthStyles'

import Styles from '../../Styles/StyleConstants';

const ReAuthenticationScreen = ({ error, authError, user, deleteAccount, logIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authed, setAuthed] = useState(false);
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        if (!authError && !error) {
            setAuthed(true);
        } else {
            setSignedIn(false);
        }
    }, [authError, error]);

    useEffect(() => {
        if (authed && signedIn) {
            deleteAccount(user);
        }
    }, [authed, signedIn]);

    const handleChange = () => {
        return Alert.alert(
            "Are you sure?",
            "Once your account is deleted, all of your data will be deleted with no way to recover them.",
            [
                {
                    text: "Yes, Delete my Account",
                    onPress: () => handleSubmit(),
                    style: "destructive",
                },
                {
                    text: "Cancel",
                    onPress: console.log('canceled'),
                    style: "cancel",
                }
            ],
            { cancelable: true }
        );
    }

    const handleSubmit = async () => {
        await logIn({ email: email, password, password });
        setSignedIn(true);
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

                <View style={{ alignSelf: 'center' }}>
                    {error && <Text style={[GlobalStyles.paragraphError2, { textAlign: 'center' }]}>{error}</Text>}
                    {authError && <Text style={[GlobalStyles.paragraphError2, { textAlign: 'center' }]}>{authError}</Text>}
                </View>
            </View>
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    const profiles = state.firestore.data.profiles;
    const profile = profiles ? profiles[state.firebase.auth.uid] : null;

    return {
        error: state.profile.profileError,
        authError: state.auth.authError,
        user: profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteAccount: (data) => dispatch(deleteAccount(data)),
        logIn: (data) => dispatch(logIn(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReAuthenticationScreen);
