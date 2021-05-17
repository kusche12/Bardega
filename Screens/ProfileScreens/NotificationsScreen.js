import React, { useState, useEffect } from 'react';
import { FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Image } from 'react-native';
import Loading from '../../Components/Main/Loading';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import Styles from '../../Styles/StyleConstants';

const NotificationsScreen = ({ route, navigation, notifications }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (notifications) {
            console.log(notifications);
            setIsLoading(false)
        }
    }, [notifications]);

    const renderNotification = ({ item }) => {
        if (item.id !== 'default') {
            return (
                <TouchableWithoutFeedback onPress={() => handleCallback(item)}>
                    <View style={DiscoverStyles.searchContainer}>
                        <Text>{item.type}</Text>
                    </View>
                </TouchableWithoutFeedback>

            )
        }
    }

    if (isLoading) {
        return null;
    } else {
        return (
            <SafeAreaView style={GlobalStyles.headerSafeArea}>
                <View style={UserStyles.followerHeader}>
                    <Text style={GlobalStyles.titlebold2}>NOTIFICATIONS</Text>
                </View>
                <FlatList
                    data={notifications}
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

    return {
        profiles: profiles,
        notifications: notifications
    }
}

export default compose(
    connect(mapStateToProps),
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
)(NotificationsScreen);