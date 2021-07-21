import React from 'react';
import { Dimensions, SafeAreaView, Platform } from 'react-native';
import BardegaTextSVG from '../Main/BardegaTextSVG';
import GlobalStyles from '../../Styles/GlobalStyles';

const width = Dimensions.get('screen').width;

const MainHeader = () => {
    return (
        <SafeAreaView style={GlobalStyles.headerContainer}>
            <BardegaTextSVG style={Platform.OS === 'ios' && { marginLeft: 24 }} width={width / 2.5} height={50} />
        </SafeAreaView>
    )
}

export default MainHeader;