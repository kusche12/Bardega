import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';
import UserStyles from '../../Styles/UserStyles';

const ProfileInputScreen = ({ route, navigation }) => {
    const [bio, setBio] = useState(route.params.value);
    useEffect(() => {
        navigation.setParams({ action: 'updateBio', data: { bio: route.params.value } });
    }, [])

    // Update the bio state in real time for the UI
    // Also set the navigation state with the new updated bio and the Redux Action to update the bio
    // if the user clicks "save"
    const handleChange = (e) => {
        navigation.setParams({ action: 'updateBio', data: { bio: e } });
        setBio(e)
    }

    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'space-between' }}>
                <Text style={GlobalStyles.paragraphbold2}>Bio</Text>
                <Text style={[GlobalStyles.paragraphbold2, 150 - bio.length < 0 && { color: 'red' }]}>{150 - bio.length}</Text>
            </View>
            <View style={[GlobalStyles.line, { backgroundColor: Styles.LIGHT_GRAY }]}></View>
            <TextInput
                value={bio}
                onChangeText={handleChange}
                style={[GlobalStyles.paragraph2, UserStyles.profileInputBio]}
                multiline={true}
            />
        </SafeAreaView>
    )
}

export default ProfileInputScreen