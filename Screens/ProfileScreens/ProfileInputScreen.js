import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { updateBio } from '../../Store/Actions/ProfileActions';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';
import UserStyles from '../../Styles/UserStyles';

// TODO: Check if the user's bio is > 150 characters. In that case, throw the reducer error into the
// navigation params and display the error on this screen.
//  Yes, this will require lots of data movement.
const ProfileInputScreen = ({ route, navigation, userID, updateBio, error }) => {
    const [bio, setBio] = useState(route.params.value);

    // Update the bio state in real time for the UI
    // Also set the navigation state with the new updated bio and the Redux Action to update the bio
    // if the user clicks "save"
    useEffect(() => {
        navigation.setParams({ action: updateBio, data: { id: userID, bio: route.params.value } });
    }, [])

    const handleChange = (e) => {
        navigation.setParams({ action: updateBio, data: { id: userID, bio: e } });
        setBio(e);
    }

    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'space-between' }}>
                <Text style={GlobalStyles.paragraphbold2}>Bio</Text>
                <Text style={150 - bio.length < 0 ? GlobalStyles.paragraphError2 : GlobalStyles.paragraphbold2}>{150 - bio.length}</Text>
            </View>
            <View style={[GlobalStyles.line, { backgroundColor: Styles.LIGHT_GRAY }]}></View>
            <TextInput
                value={bio}
                onChangeText={handleChange}
                style={[GlobalStyles.paragraph2, UserStyles.profileInputBio]}
                multiline={true}
            />
            { error && <Text style={[GlobalStyles.paragraphError2, { textAlign: 'center' }]}>{error}</Text>}
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        userID: state.firebase.auth.uid,
        error: state.profile.profileError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBio: (data) => dispatch(updateBio(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileInputScreen);