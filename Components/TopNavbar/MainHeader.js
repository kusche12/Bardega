import React from 'react';
import Images from '../../Images/Images';
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
                source={Images.bardegaLogo}
                resizeMode='cover'
            />
        )
    }

}

export default MainHeader;