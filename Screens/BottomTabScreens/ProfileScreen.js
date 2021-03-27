import * as React from 'react';
import ProfileDetail from '../DetailScreens/ProfileDetail'
import Header from '../../Components/Main/Header';

const ProfileScreen = ({ route }) => {
    return (
        <Header route={route} name="Profile" component={ProfileDetail} />
    );
}

export default ProfileScreen;