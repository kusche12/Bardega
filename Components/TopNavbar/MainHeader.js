import React from 'react';
import { Dimensions, View } from 'react-native';
import BardegaTextSVG from '../Main/BardegaLogoSVGc';
import GlobalStyles from '../../Styles/GlobalStyles';

const width = Dimensions.get('screen').width;

const MainHeader = () => {
    return (
        <View style={GlobalStyles.headerContainer}>
            <BardegaTextSVG width={width} height={80} />
        </View>
    )
}

export default MainHeader;