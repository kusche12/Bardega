import React, { useState, useEffect } from 'react';
import { FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Image } from 'react-native';
import Loading from '../../Components/Main/Loading';
import { renderTime } from '../../Functions/miscFunctions';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import Styles from '../../Styles/StyleConstants';

const NotificationsScreen = ({ route, navigation, notifications, profiles, drinks }) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (notifications) {
            console.log(notifications);
            setIsLoading(false)
        }
    }, [notifications]);

    const renderNotification = ({ item }) => {
        if (item.id !== 'default') {
            const user = profiles[item.userID];
            cacheImages(user.imageURL, user.id);

            let drink = null;
            if (item.drinkID) {
                drink = drinks[item.drinkID];
                cacheImages(drink.imageURL, drink.id);
            }

            return (
                <TouchableWithoutFeedback onPress={() => handleCallback(item, user, drink)}>
                    <View style={{ width: Styles.width, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', width: Styles.width * .6 }}>
                            <Image source={{ uri: getCachedImage(user.id) || user.imageURL }} style={{ width: 40, height: 40, borderRadius: 100, marginRight: 10 }} />
                            {renderText(item, user, drink)}
                        </View>
                        {drink &&
                            <Image source={{ uri: getCachedImage(drink.id) || drink.imageURL }} style={{ width: 50, height: 50, borderRadius: Styles.BORDER_RADIUS }} />
                        }
                    </View>
                </TouchableWithoutFeedback>

            )
        }
    }

    // All notification types: likedDrink, follow, likedComment, comment
    const renderText = (item, user, drink) => {
        let body;
        switch (item.type) {
            case 'follow':
                body = 'started following you.';
                break;
            case 'likedDrink':
                body = 'liked your drink ' + drink.name + '.';
                break;
            default:
                body = '';
        }

        return (
            <Text>
                <Text style={GlobalStyles.paragraphbold2}>{user.userName} </Text>
                <Text style={GlobalStyles.paragraph2}>{body} </Text>
                <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY }]}>{renderTime(item.dateCreated)}</Text>
            </Text>

        )
    }

    const handleCallback = (item, user, drink) => {
        if (item.type === 'follow') {
            navigation.navigate('ProfileScreen', { user: user, ownProfile: false });
        } else {
            navigation.navigate('DrinkDetailScreen', { drink: drink });
        }
    }

    if (isLoading) {
        return null;
    } else {
        return (
            <SafeAreaView style={GlobalStyles.headerSafeArea}>
                <View style={[UserStyles.followerHeader]}>
                    <Text style={GlobalStyles.titlebold2}>NOTIFICATIONS</Text>
                </View>
                <View style={[GlobalStyles.line, { width: Styles.width * .9, alignSelf: 'center', marginBottom: 16 }]}></View>

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
    const drinks = state.firestore.data.drinks;
    let notifications = state.firestore.ordered['allNotifications'];

    return {
        profiles: profiles,
        notifications: notifications,
        drinks: drinks
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        { collection: 'profiles' },
        { collection: 'drinks' },
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