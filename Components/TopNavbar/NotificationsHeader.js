import React from 'react';
import { Image, View, TouchableWithoutFeedback } from 'react-native';
import Images from '../../Images/Images';
import GlobalStyles from '../../Styles/GlobalStyles';

const NotificationsHeader = ({ navigation, user }) => {
    return (
        <View style={[GlobalStyles.headerWithButtons, { justifyContent: 'flex-end' }]}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('NotificationsScreen', { notificationsID: user.notificationsID, userA: user })}>
                <Image source={Images.profile.inbox} style={{ width: 25, height: 25 }} />
            </TouchableWithoutFeedback>
        </View>
    )
}

export default NotificationsHeader;