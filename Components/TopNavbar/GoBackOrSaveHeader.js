import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Image, View, TouchableWithoutFeedback, Text } from 'react-native';
import { connect } from 'react-redux';
import Images from '../../Images/Images';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

// TODO: Figure out how to error catch with this component so that it does not navigate
// on errors

// This component features a back button and a save button on the header. 
// The save button takes a Redux action from route.params which is passed by a 
// screen component.
const GoBackOrSaveHeader = ({ route, navigation, error, success }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [runOnce, setRunOnce] = useState(true);

    const handleSave = async () => {
        setIsLoading(true);
        await route.params.action(route.params.data)
        if (error) {
            console.log(error);
        } else {
            navigation.goBack();
        }
        setIsLoading(false);
    }

    return (
        <View style={GlobalStyles.headerWithButtons} >
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Image
                    style={{ height: 20, width: 20, bottom: 6 }}
                    source={Images.topNav.backButton}
                    resizeMode='contain'
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handleSave()}>
                {isLoading
                    ? <ActivityIndicator size="small" />
                    : <Text style={[GlobalStyles.paragraphbold1, { color: Styles.DARK_PINK }]}>Save</Text>
                }
            </TouchableWithoutFeedback>
        </View>
    )
}

// Use this error in the state to make sure everything works before navigating away
// You can add multiple reducer errors to the error object at one time by using &&
const mapStateToProps = (state) => {
    let error = state.profile.profileError;
    let success = state.profile.profileSuccess;
    return {
        error: error,
        success: success
    }
}

export default connect(mapStateToProps)(GoBackOrSaveHeader);