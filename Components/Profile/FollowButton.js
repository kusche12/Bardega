import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import { followUser, unfollowUser, requestFollow, unrequestFollow } from '../../Store/Actions/ProfileActions';
import { createNotification } from '../../Store/Actions/NotificationActions';
import { connect } from 'react-redux';
import firebase from '../../API/FirebaseSetup'
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants';

// USER A Represents the currently authenticated user of this application
// USER B Represents the other user that user A is currently looking at
// If this component is rendered on User A's page, then just return the edit profile button
// Otherwise, return a follow / unfollow button connected to User B
const FollowButton = ({ navigation, userA, userB, ownProfile, followUser,
    unfollowUser, createNotification, requestFollow, unrequestFollow }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isRequested, setIsRequested] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (userB && userA) {
                let db = firebase.firestore();
                // Check if userA follows userB
                db
                    .collection('profileFollowers')
                    .doc(userB.profileFollowID)
                    .collection('followerUsers')
                    .doc(userA.id)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            setIsFollowing(true);
                        } else {
                            setIsFollowing(false);
                        }
                    }).catch((err) => {
                        console.log(err)
                    })

                // Check if userA is requested to follow userB
                db
                    .collection('profileRequests')
                    .doc(userB.profileFollowID)
                    .collection('allRequests')
                    .doc(userA.id)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            setIsRequested(true);
                        } else {
                            setIsRequested(false);
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
            }

            console.log(isFollowing)
            setIsLoading(false);
        }
        fetchData();
    }, [userB, userA, isDisabled]);

    // Unfollow is called when UserA follows UserB
    // Follow is called when UserA requests to follow UserB and UserB !== private
    // RequestFollow is called when UserA requests to follow UserB and UserB === private
    const handleChange = async (type) => {
        if (isDisabled) {
            return;
        }
        setIsDisabled(true);
        if (type === 'unfollow') {
            await unfollowUser({ userA, userB });
        } else if (type === 'unrequest') {
            await unrequestFollow({ userA, userB });
        } else {
            if (userB.private) {
                // Put userA in userB's profileRequests collection
                // This will allow the profile button to render as "Requested"
                await requestFollow({ userA, userB });

                // Then, create a notification that says "requestFollow"
                // UserB can then call the followUser() function from the notifications screen
                await createNotification({ comment: null, drinkID: null, type: 'requestFollow', userID: userA.id, notifID: userB.notificationsID });

            } else {
                await followUser({ userA, userB });
                await createNotification({ comment: null, drinkID: null, type: 'follow', userID: userA.id, notifID: userB.notificationsID });
            }
        }
        setIsDisabled(false);
    }

    if (isLoading) {
        return null;
    }

    if (ownProfile) {
        console.log("OWN PROFILE")
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
        if (isFollowing) {
            console.log("HE IS FOLLOWING")
            return (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableWithoutFeedback disabled={isDisabled} onPress={() => handleChange('unfollow')}>
                        <View style={UserStyles.button}>
                            <Text style={GlobalStyles.paragraph3}>Following</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        } else if (isRequested) {
            return (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableWithoutFeedback disabled={isDisabled} onPress={() => handleChange('unrequest')}>
                        <View style={UserStyles.button}>
                            <Text style={GlobalStyles.paragraph3}>Requested</Text>
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        followUser: (data) => dispatch(followUser(data)),
        unfollowUser: (data) => dispatch(unfollowUser(data)),
        createNotification: (data) => dispatch(createNotification(data)),
        requestFollow: (data) => dispatch(requestFollow(data)),
        unrequestFollow: (data) => dispatch(unrequestFollow(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);