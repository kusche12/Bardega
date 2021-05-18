import React, { useState, useEffect } from 'react';
import { FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Image } from 'react-native';
import { renderTime } from '../../Functions/miscFunctions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { rejectRequest, followUser } from '../../Store/Actions/ProfileActions';
import { createNotification, deleteNotification } from '../../Store/Actions/NotificationActions';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants';

const FollowRequestsScreen = ({ userA, navigation, notifications, profiles, rejectRequest, createNotification, followUser, deleteNotification }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);
    const [requestNotifs, setRequestNotifs] = useState([]);

    useEffect(() => {
        if (notifications && userA) {
            let res = [];
            for (let i = 0; i < notifications.length; i++) {
                let notif = notifications[i];
                if (notif.type === 'requestFollow') {
                    res.push(notif);
                }
            }
            setRequestNotifs(res);
            setIsLoading(false)
        }
    }, [notifications, userA]);

    const renderNotification = ({ item }) => {
        if (item.id !== 'default') {
            const user = profiles[item.userID];
            return (
                <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileScreen', { user: user, ownProfile: false })}>
                    <View style={{ width: Styles.width, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', width: Styles.width * .4 }}>
                            <Image source={{ uri: user.imageURL }} style={{ width: 45, height: 45, borderRadius: 100, marginRight: 10 }} />
                            {renderText(item, user)}
                        </View>
                        {renderAcceptFollow(item, user)}
                    </View>
                </TouchableWithoutFeedback>

            )
        }
    }

    const renderText = (item, user) => {
        return (
            <Text>
                <Text style={GlobalStyles.paragraphbold2}>{user.userName} </Text>
                <Text style={GlobalStyles.paragraph2}>requested to follow you. </Text>
                <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY }]}>{renderTime(item.dateCreated)}</Text>
            </Text>

        )
    }

    const renderAcceptFollow = (item, user) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableWithoutFeedback disabled={isDisabled} onPress={() => handleAccepted(item, user)}>
                    <View style={[UserStyles.buttonNotification, UserStyles.buttonFilled, { marginRight: 4 }]}>
                        <Text style={GlobalStyles.paragraph3}>Accept</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback disabled={isDisabled} onPress={() => handleRejection(item, user)}>
                    <View style={UserStyles.buttonNotification}>
                        <Text style={GlobalStyles.paragraph3}>Decline</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    // Firstly gets rid of userB from userA's followRequests collection,
    // Secondly, sends userB a notification that userA declined their request
    const handleRejection = async (item, user) => {
        setIsDisabled(true);
        await rejectRequest({ userA: userA, userB: user });
        await createNotification({ notifID: user.notificationsID, comment: null, drinkID: null, type: 'requestRejected', userID: userA.id });
        await deleteNotification({ notifID: userA.notificationsID, id: item.id })
        setIsDisabled(false);
    }

    // Firstly gets rid of userB from userA's followRequests collection,
    // Secondly, adds the requested user (user) into the userA's profileFollowers collection
    // Thirdly, sends userB a notification that userA declined their request
    // Fourthly, sends userA a notification that says "user B now follows you"
    const handleAccepted = async (item, user) => {
        setIsDisabled(true);
        await rejectRequest({ userA: userA, userB: user });
        await followUser({ userA: user, userB: userA });
        await createNotification({ notifID: user.notificationsID, comment: null, drinkID: null, type: 'requestAccepted', userID: userA.id });
        await deleteNotification({ notifID: userA.notificationsID, id: item.id });
        await createNotification({ notifID: userA.notificationsID, comment: null, drinkID: null, type: 'follow', userID: user.id });
        setIsDisabled(false);
    }

    if (isLoading) {
        return null;
    } else {
        return (
            <SafeAreaView style={GlobalStyles.headerSafeArea}>
                <View style={[UserStyles.followerHeader]}>
                    <Text style={GlobalStyles.titlebold2}>FOLLOW REQUESTS</Text>
                </View>
                <View style={[GlobalStyles.line, { width: Styles.width, alignSelf: 'center', marginBottom: 16 }]}></View>

                <FlatList
                    data={requestNotifs}
                    keyExtractor={item => item.id}
                    renderItem={renderNotification}
                />
            </SafeAreaView>
        )
    }


}

const mapStateToProps = (state) => {
    const profiles = state.firestore.data.profiles;
    let notifications = state.firestore.ordered['allNotifications'];
    let userA = profiles[state.firebase.auth.uid];

    return {
        profiles: profiles,
        notifications: notifications,
        userA: userA
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        rejectRequest: (data) => dispatch(rejectRequest(data)),
        createNotification: (data) => dispatch(createNotification(data)),
        followUser: (data) => dispatch(followUser(data)),
        deleteNotification: (data) => dispatch(deleteNotification(data)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        { collection: 'profiles' },
        {
            collection: "notifications",
            doc: props.route.params.notificationsID,
            storeAs: 'allNotifications',
            subcollections: [{
                collection: "allNotifications"
            }
            ]
        }])
)(FollowRequestsScreen);