import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '../../Components/Main/Header';
import SpiritDetail from '../DetailScreens/SpiritDetail';

const SpiritScreen = ({ route, navigation }) => {
    return (
        <Header route={route} name="Search" component={SpiritDetail} navigation={navigation} />
    );
}

export default SpiritScreen;