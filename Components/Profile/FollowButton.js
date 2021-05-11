import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { followUser, unfollowUser } from '../../Store/Actions/ProfileActions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants';

// USER A Represents the currently authenticated user of this application
// USER B Represents the other user that user A is currently looking at
// If this component is rendered on User A's page, then just return the edit profile button
// Otherwise, return a follow / unfollow button connected to User B
const FollowButton = ({ navigation, allFollowers, userA, userB, ownProfile, followUser, unfollowUser }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    useEffect(() => {
        if (allFollowers) {
            setIsLoading(false);
        }
    }, [allFollowers]);

    const handleChange = async (type) => {
        if (isDisabled) {
            return;
        }
        setIsDisabled(true);
        if (type === 'unfollow') {
            await unfollowUser({ userA, userB })
        } else {
            await followUser({ userA, userB })
        }
        setIsDisabled(false);
    }

    if (isLoading) {
        return null;
    }

    if (ownProfile) {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableWithoutFeedback disabled={isDisabled} onPress={() => navigation.navigate('EditProfileScreen')}>
                    <View style={UserStyles.button}>
                        <Text style={GlobalStyles.paragraph3}>Edit Profile</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    } else {
        if (allFollowers[userA.id]) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableWithoutFeedback disabled={isDisabled} onPress={() => handleChange('unfollow')}>
                        <View style={UserStyles.button}>
                            <Text style={GlobalStyles.paragraph3}>Following</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        } else {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableWithoutFeedback onPress={() => handleChange('follow')}>
                        <View style={[UserStyles.button, UserStyles.buttonFilled]}>
                            <Text style={[GlobalStyles.paragraph3, { color: Styles.PINK }]}>Follow</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    const profiles = state.firestore.data.profiles;
    const profile = profiles ? profiles[state.firebase.auth.uid] : null;
    let userB;
    if (!ownProps.ownProfile) {
        userB = ownProps.user;
    }
    return {
        userA: profile,
        userB: userB,
        allFollowers: state.firestore.data['allFollowers'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        followUser: (data) => dispatch(followUser(data)),
        unfollowUser: (data) => dispatch(unfollowUser(data))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        {
            collection: "profileFollowers",
            doc: props.user.profileFollowID,
            storeAs: 'allFollowers',
            subcollections: [{
                collection: "followerUsers"
            }
            ]
        }])
)(FollowButton);