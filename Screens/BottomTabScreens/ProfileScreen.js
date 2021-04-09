import * as React from 'react';
import ProfileDetail from '../DetailScreens/ProfileDetail'
import Header from '../../Components/Main/Header';

const ProfileScreen = ({ route, navigation }) => {
    return (
        <Header route={route} navigation={navigation} name="Profile" component={ProfileDetail} />
    );
}

export default ProfileScreen;