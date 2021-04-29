import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux';
import { updateProfile } from '../../Store/Actions/ProfileActions';
import ProfileInput from '../../Components/Profile/ProfileInput';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';
import UserStyles from '../../Styles/UserStyles';

const EditProfileScreen = ({ user, navigation, userID, updateProfile }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        if (user) {
            setFName(user.fName);
            setLName(user.lName);
            setUserName(user.userName);
            setBio(user.bio);
            setIsLoading(false);
        }
    }, [user]);

    if (isLoading) {
        return <Spinner visible={isLoading} />
    } else {
        return (
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { alignItems: 'center' }]}>
                <View style={{ marginBottom: 20, alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={() => console.log()}>
                        <>
                            <View style={UserStyles.settingsProfileImage}>
                                <Image source={{ uri: user.imageURL }} style={UserStyles.profileImage} />
                            </View>
                            <Text style={[GlobalStyles.paragraphbold2, { color: Styles.DARK_PINK, marginTop: 12 }]}>Change Profile Photo</Text>
                        </>
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <ProfileInput name={"First Name"} value={fName} setValue={setFName} />
                    <ProfileInput name={"Last Name"} value={lName} setValue={setLName} />
                    <ProfileInput name={"Username"} value={userName} setValue={setUserName} />
                    <ProfileInput name={"Bio"} value={bio} setValue={setBio} navigation={navigation} />
                </View>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    const profiles = state.firestore.data.profiles;
    // For testing purposes only
    const profile = profiles ? profiles['IcEeZVtsDnZfFwdDpTRhwmtp6vf1'] : null;
    // For production, uncomment below
    // const profile = profiles ? profiles[state.firebase.auth.uid] : null;
    return {
        user: profile,
        userID: state.firebase.auth.uid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (data) => dispatch(updateProfile(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);