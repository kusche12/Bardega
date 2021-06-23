import React, { useState, useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const LoadingBar = () => {
    const bar = useRef(new Animated.Value(0)).current;

    const animated = () => {
        console.log('animate')
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 400,
                useNativeDriver: true
            }),
            Animated.delay(1200),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true
            }),
        ]).start();
    };

    return (
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'red', width: Styles.width, height: Styles.height }}>

        </View>
    )
}

export default LoadingBar;