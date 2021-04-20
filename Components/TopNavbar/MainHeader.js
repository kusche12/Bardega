import React from 'react';
import { Image, Dimensions } from 'react-native';

const width = Dimensions.get('screen').width;

const MainHeader = ({ header }) => {
    if (header) {
        return (
            <Image
                style={{ width: width, height: 150 }}
                source={{ uri: header }}
                resizeMode='cover'
            />
        )
    } else {
        return (
            <Image
                style={{ width: width, height: 150 }}
                source={require('./bardega_logo.png')}
                resizeMode='cover'
            />
        )
    }

}

export default MainHeader;