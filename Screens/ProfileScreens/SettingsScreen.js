import React from 'react';
import { SafeAreaView, View, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { logOut } from '../../Store/Actions/AuthActions';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';

const SettingsScreen = ({ logOut }) => {

    const handleSignout = () => {
        logOut();
    }

    return (
        <SafeAreaView style={[GlobalStyles.headerSafeArea, UserStyles.collectionContainer]} >
            <TouchableWithoutFeedback onPress={() => handleSignout()}>
                <View style={UserStyles.settingsButton}>
                    <Text>Sign out</Text>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(logOut())
    }
}

export default connect(null, mapDispatchToProps)(SettingsScreen);