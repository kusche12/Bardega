import React, { useState } from 'react';
import { ActivityIndicator, Image, View, TouchableWithoutFeedback, Text } from 'react-native';
import { connect } from 'react-redux';
import Images from '../../Images/Images';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const GoBackOrSaveHeader = ({ route, navigation, error }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);
        await route.params.action(route.params.data);
        setIsLoading(false);
        if (!error) {
            navigation.goBack();
        }
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
const mapStateToProps = (state, ownProps) => {
    let error = state.profile.profileError;
    return {
        error: error
    }
}

export default connect(mapStateToProps)(GoBackOrSaveHeader);