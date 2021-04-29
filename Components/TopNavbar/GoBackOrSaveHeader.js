import React, { useState } from 'react';
import { ActivityIndicator, Image, View, TouchableWithoutFeedback, Text } from 'react-native';
import { connect } from 'react-redux';
import { updateBio } from '../../Store/Actions/ProfileActions';
import Images from '../../Images/Images';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const GoBackOrSaveHeader = ({ route, navigation, error, updateBio, userID }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        setIsLoading(true);
        console.log(route.params.action);
        switch (route.params.action) {
            case 'updateBio':
                await updateBio({ bio: route.params.bio, id: userID });
            default:
                break;
        }
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
        userID: state.firebase.auth.uid,
        error: error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBio: (data) => dispatch(updateBio(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoBackOrSaveHeader);