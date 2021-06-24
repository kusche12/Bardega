import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import AuthInput from '../../Components/Auth/AuthInput';
import { connect } from 'react-redux';
import Images from '../../Images/Images';
import { updateEmail } from '../../Store/Actions/AuthActions'
import GlobalStyles from '../../Styles/GlobalStyles';
import AuthStyles from '../../Styles/AuthStyles'

import Styles from '../../Styles/StyleConstants';

const ChangeEmailScreen = ({ error, authError, route, user, updateEmail }) => {
    const { navigation } = route.params;
    const [email, setEmail] = useState('');
    const [attemptedUpdate, setAttemptedUpdate] = useState(false);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if (!error && !authError && attemptedUpdate) {
            setSuccess('Success! Your email has been updated.');
        }
    }, [error, authError, attemptedUpdate]);

    const handleChange = () => {
        updateEmail({ email: email, userID: user.id });
        setAttemptedUpdate(true);
    }

    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'flex-start' }}>
                <Text style={GlobalStyles.paragraphbold2}>Account Settings</Text>
            </View>
            <View style={[GlobalStyles.line, { backgroundColor: Styles.LIGHT_GRAY, marginBottom: 8 }]}></View>
            <Text style={[GlobalStyles.paragraph3, { paddingLeft: 8, marginBottom: 32 }]}>What would you like to change your email to?</Text>

            <View style={{ paddingHorizontal: 8, alignItems: 'flex-start' }}>
                <AuthInput image={'user'} value={email} setValue={setEmail} type={'New Email'} reauth={true} />

                <View style={{ alignSelf: 'center', marginTop: 16 }}>
                    <TouchableWithoutFeedback onPress={() => handleChange()}>
                        <View style={[AuthStyles.mainButton, { flexDirection: 'row' }]}>
                            <Image source={Images.settings.email} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 8 }} />
                            <Text style={[GlobalStyles.titlebold2, { fontSize: 16 }]}>Update Email</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{ alignSelf: 'center' }}>
                    {error && <Text style={[GlobalStyles.paragraphError2, { textAlign: 'center' }]}>{error}</Text>}
                    {authError && <Text style={[GlobalStyles.paragraphError2, { textAlign: 'center' }]}>{authError}</Text>}
                    {success && <Text style={[GlobalStyles.paragraphbold2, { textAlign: 'center', color: Styles.DARK_PINK }]}>{success}</Text>}
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
        updateEmail: (data) => dispatch(updateEmail(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmailScreen);
