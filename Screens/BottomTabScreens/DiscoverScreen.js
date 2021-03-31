import * as React from 'react';
import DiscoverDetail from '../DetailScreens/DiscoverDetail';
import Header from '../../Components/Main/Header';

const DiscoverScreen = ({ route, navigation }) => {
    return (
        <Header route={route} name="Discover" component={DiscoverDetail} navigation={navigation} />
    );
}

export default DiscoverScreen;