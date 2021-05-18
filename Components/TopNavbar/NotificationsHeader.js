import React from 'react';
import { Image, View, TouchableWithoutFeedback } from 'react-native';
import Images from '../../Images/Images';
import GlobalStyles from '../../Styles/GlobalStyles';

const NotificationsHeader = ({ navigation, user }) => {
    return (
        <View style={GlobalStyles.headerWithButtons} >
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Image
                    style={{ height: 20, width: 20, bottom: 6 }}
                    source={Images.topNav.backButton}
                    resizeMode='contain'
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('NotificationsScreen', { notificationsID: user.notificationsID, userA: user })}>
                <Image source={Images.profile.inbox} style={{ width: 25, height: 25 }} />
            </TouchableWithoutFeedback>
        </View>
    )
}

export default NotificationsHeader;