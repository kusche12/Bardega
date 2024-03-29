import React, { useState, useEffect } from 'react';
import { FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Image, ActivityIndicator, Platform } from 'react-native';
import { renderTime, renderNotificationText } from '../../Functions/miscFunctions';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { rejectRequest, followUser, updateNotificationChecked } from '../../Store/Actions/ProfileActions';
import { createNotification, deleteNotification } from '../../Store/Actions/NotificationActions';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants';
import Images from '../../Images/Images';

const LIMIT = 10;

const NotificationsScreen = ({ userA, navigation, notifications, deleteNotification,
    profiles, drinks, rejectRequest, createNotification, followUser, allRequests, updateNotificationChecked }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [updateOnce, setUpdateOnce] = useState(true);
    const [renderedNotifs, setRenderedNotifs] = useState([]);
    const [lastIndex, setLastIndex] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);

    // Every time this screen is entered, update the user's notifsLastChecked dateTime field
    useEffect(() => {
        if (allRequests && notifications && profiles && drinks && updateOnce) {
            updateNotificationChecked({ id: userA.id });
            retrieveData();
            setUpdateOnce(false);
        }
    }, [allRequests, notifications, profiles, drinks]);

    // Fetch more notifications as use scrolls
    const retrieveData = () => {
        setIsRefreshing(true);
        console.log('getting data')
        let currItems = [];
        let currIndex = lastIndex;
        let allItems = [...renderedNotifs];

        while (currIndex < notifications.length && renderedNotifs.length < LIMIT) {
            if (notifications[currIndex].id !== 'default') {
                currItems.push(notifications[currIndex]);
            }
            currIndex++;
        }

        setRenderedNotifs(allItems.concat(currItems));
        setLastIndex(currIndex);
        setIsLoading(false);
        setIsRefreshing(false);
    }

    const renderNotification = ({ item }) => {
        if (item.id !== 'default') {
            const user = profiles[item.userID];

            // User account was deleted, do not render notif AND delete this notification
            if (!user) {
                deleteNotification({ notifID: userA.notificationsID, id: item.id });
                return null;
            }

            cacheImages(user.imageURL, user.id);

            let drink = null;
            if (item.drinkID) {
                drink = drinks[item.drinkID];
                // Drink was deleted, do not render notif AND TODO: delete this notification
                if (!drink) {
                    deleteNotification({ notifID: userA.notificationsID, id: item.id });
                    return null;
                }
                cacheImages(drink.imageURL, drink.id);
            }

            let WIDTH = .6;
            if (item.type === 'requestFollow') {
                WIDTH = .4;
            }

            return (
                <TouchableWithoutFeedback onPress={() => handleCallback(item, user, drink)}>
                    <View style={{ width: Styles.width, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 10 }}>
                        <View style={{ flexDirection: 'row', width: Styles.width * WIDTH }}>
                            <Image source={{ uri: getCachedImage(user.id) || user.imageURL }} style={{ width: Platform.isPad ? 60 : 45, height: Platform.isPad ? 60 : 45, borderRadius: 100, marginRight: 10 }} />
                            {renderText(item, user, drink)}
                        </View>
                        {drink &&
                            <Image source={{ uri: getCachedImage(drink.id) || drink.imageURL }} style={{ width: Platform.isPad ? 70 : 50, height: Platform.isPad ? 70 : 50, borderRadius: Styles.BORDER_RADIUS }} />
                        }
                        {renderAcceptFollow(item, user)}
                    </View>
                </TouchableWithoutFeedback>

            )
        }
    }

    // All notification types: likedDrink, follow, likedComment, comment, requestFollow
    const renderText = (item, user, drink) => {
        let body = renderNotificationText(item, drink);
        return (
            <Text>
                <Text style={GlobalStyles.paragraphbold2}>{user.userName} </Text>
                <Text style={GlobalStyles.paragraph2}>{body} </Text>
                {Platform.isPad && <Text style={GlobalStyles.paragraph2}> </Text>}
                <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY }]}>{renderTime(item.dateCreated)}</Text>
            </Text>

        )
    }

    const renderAcceptFollow = (item, user) => {
        if (item.type === 'requestFollow') {
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
    }

    const handleCallback = (item, user, drink) => {
        if (item.type === 'follow' || item.type === 'requestFollow') {
            navigation.push('ProfileScreen', { user: user, ownProfile: false });
        } else {
            navigation.navigate('DrinkDetailScreen', { drink: drink });
        }
    }

    // Firstly gets rid of userB from userA's followRequests collection,
    // Secondly, sends userB a notification that userA declined their request
    const handleRejection = async (item, user) => {
        setIsDisabled(true);
        await rejectRequest({ userA: userA, userB: user });
        await createNotification({ notifID: user.notificationsID, comment: null, drinkID: null, type: 'requestRejected', userID: userA.id });
        await deleteNotification({ notifID: userA.notificationsID, id: item.id });
        removeRenderedNotification(item);
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
        removeRenderedNotification(item);
        setIsDisabled(false);
    }

    // Removes the rendered notification of a follow request
    const removeRenderedNotification = (item) => {
        let result = [];
        for (let i = 0; i < renderedNotifs.length; i++) {
            if (renderedNotifs[i].id === item.id) {
                result = renderedNotifs.filter((value, index) => i !== index);
                break;
            }
        }

        setRenderedNotifs(result);
    }

    const renderFollowRequestPage = () => {
        let num = allRequests.length - 1;
        if (num > 9) {
            num = 9;
        }
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('FollowRequestsScreen', { notificationsID: userA.notificationsID, userA: userA })}>
                <View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingBottom: 4, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: Platform.isPad ? 60 : 30 }}>
                                <Image source={Images.profile.follower} style={{ width: Platform.isPad ? 54 : 40, height: Platform.isPad ? 53 : 40, objectFit: 'contain' }} />
                                <View style={[UserStyles.requestNumContainer, { position: 'absolute', left: Platform.isPad ? 35 : 25, top: -10 }]}>
                                    <Text style={[GlobalStyles.paragraphbold3, { color: 'white' }]}>{num}+</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={GlobalStyles.paragraphbold2} >Follow Requests</Text>
                                <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY }]}>Accept or decline requests</Text>
                            </View>
                        </View>
                        <Image source={Images.settings.about} style={{ width: 12, height: 20, alignSelf: 'center', marginRight: 10 }} />
                    </View>
                    <View style={[GlobalStyles.line, { width: Styles.width, alignSelf: 'center', marginBottom: 30, backgroundColor: Styles.LIGHT_GRAY }]}></View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    if (isLoading) {
        return null;
    } else {
        return (
            <SafeAreaView style={GlobalStyles.headerSafeArea}>
                <View style={[UserStyles.followerHeader, { marginTop: 20 }]}>
                    <Text style={GlobalStyles.titlebold2}>NOTIFICATIONS</Text>
                </View>
                <View style={[GlobalStyles.line, { width: Platform.isPad ? Styles.width * .95 : Styles.width * .9, alignSelf: 'center', marginBottom: 16 }]}></View>


                {allRequests.length > 1 && profiles && renderFollowRequestPage()}

                <FlatList
                    ListHeaderComponent={
                        <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY, marginLeft: 10, marginBottom: 10 }]}>Activity</Text>
                    }
                    data={renderedNotifs}
                    keyExtractor={item => item.id}
                    renderItem={renderNotification}
                    onEndReached={retrieveData}
                    onEndReachedThreshold={.1}
                    refreshing={isRefreshing}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    ListFooterComponent={isRefreshing &&
                        <View style={{ marginTop: 20 }} >
                            <ActivityIndicator color={Styles.DARK_PINK} />
                        </View>
                    }
                />
            </SafeAreaView>
        )
    }


}


const mapStateToProps = (state) => {
    const profiles = state.firestore.data.profiles;
    const drinks = state.firestore.data.drinks;
    let userA = profiles[state.firebase.auth.uid];
    let allRequests = state.firestore.ordered['allRequests'];
    let notifications = state.firestore.ordered['allNotifications'];

    let orderedNotifs = notifications.slice(0).sort((a, b) => {
        if (a.id === 'default') {
            return -1;
        }
        let dateA = Date.parse(a.dateCreated);
        let dateB = Date.parse(b.dateCreated);

        return dateB - dateA;
    });

    return {
        profiles: profiles,
        notifications: orderedNotifs,
        drinks: drinks,
        allRequests: allRequests,
        userA: userA
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        rejectRequest: (data) => dispatch(rejectRequest(data)),
        createNotification: (data) => dispatch(createNotification(data)),
        followUser: (data) => dispatch(followUser(data)),
        deleteNotification: (data) => dispatch(deleteNotification(data)),
        updateNotificationChecked: (data) => dispatch(updateNotificationChecked(data)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        { collection: 'profiles' },
        { collection: 'drinks' },
        {
            collection: "notifications",
            doc: props.route.params.notificationsID,
            storeAs: 'allNotifications',
            subcollections: [{
                collection: "allNotifications"
            },
            ]
        },
        {
            collection: "profileRequests",
            doc: props.route.params.userA.profileFollowID,
            storeAs: 'allRequests',
            subcollections: [{
                collection: "allRequests"
            }]
        }

    ])
)(NotificationsScreen);