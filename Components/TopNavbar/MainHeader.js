import React from 'react';
import { Dimensions, View } from 'react-native';
import BardegaTextSVG from '../Main/BardegaTextSVG';
import GlobalStyles from '../../Styles/GlobalStyles';

const width = Dimensions.get('screen').width;

const MainHeader = () => {
    return (
        <View style={GlobalStyles.headerContainer}>
            <BardegaTextSVG width={width / 2.5} height={50} />
        </View>
    )
}

export default MainHeader;