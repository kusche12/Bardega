import React, { useEffect, useState } from 'react';
import { Image, View, TouchableWithoutFeedback, ActivityIndicator, Text } from 'react-native';
import Images from '../../Images/Images';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';
import UserStyles from '../../Styles/UserStyles';

// Renders a notification button in the header
// If there are notifications that are more recent than the authed user's "lastCheckedNotifs" field,
// then render a pink dot in the header
const NotificationsHeader = ({ navigation, user, notifications }) => {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (notifications) {
            setIsLoading(false);
        }
    }, [notifications]);

    const renderInbox = () => {
        if (isLoading) {
            return <ActivityIndicator />
        } else {
            // Get the total number of unchecked notifications
            // If greater than 9, stop counting
            const checked = user.lastCheckedNotifs;
            const checkedDate = Date.parse(checked);

            let unCheckedNotifs = 0;
            for (let i = notifications.length - 1; i >= 0; i--) {
                let notifDate = notifications[i].dateCreated;
                let notifDateObject = Date.parse(notifDate);
                if (notifDateObject && notifDateObject - checkedDate >= 0) {
                    unCheckedNotifs++;
                }

                if (unCheckedNotifs > 8) {
                    break;
                }
            }
            return (
                <View style={{ position: 'relative' }}>
                    <Image source={Images.profile.inbox} style={{ width: 25, height: 25 }} />
                    {unCheckedNotifs > 0 &&
                        <View style={UserStyles.inboxNum}>
                            <Text style={[GlobalStyles.titlebold3, { color: "white", fontSize: 14 }]}>{unCheckedNotifs}</Text>
                        </View>
                    }
                </View>
            )
        }
    }

    return (
        <View style={[GlobalStyles.headerWithButtons, { justifyContent: 'flex-end', paddingRight: 20 }]}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('NotificationsScreen', { notificationsID: user.notificationsID, userA: user })}>
                {renderInbox()}
            </TouchableWithoutFeedback>
        </View>
    );
}

const mapStateToProps = (state) => {
    const userNotifs = state.firestore.ordered['allNotifications'];

    return {
        notifications: userNotifs,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {
            collection: "notifications",
            doc: props.user.notificationsID,
            storeAs: 'allNotifications',
            subcollections: [{
                collection: "allNotifications"
            }]
        }])
)(NotificationsHeader);