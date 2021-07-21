import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const LoadingBar = () => {
    const [loop, setLoop] = useState(false);
    const bar = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        bar.setValue(0)
        animation();
    }, [loop])

    const animation = () => {
        Animated.sequence([
            Animated.timing(bar, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
                easing: Easing.ease
            }),
            Animated.delay(800),
            Animated.timing(bar, {
                toValue: 2,
                duration: 600,
                useNativeDriver: true,
                easing: Easing.ease
            }),
            Animated.delay(400),
        ]).start(() => {
            setLoop(!loop);
        });
    };

    const animatedStyles = {
        transform: [{
            translateX: bar.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [-Styles.width, 0, Styles.width]  // 0 : 150, 0.5 : 75, 1 : 0
            }),
        }],
    };

    return (
        <Animated.View style={[{ backgroundColor: Styles.DARK_PINK, height: 7, width: Styles.width }, animatedStyles]}>

        </Animated.View>
    )
}

export default LoadingBar;