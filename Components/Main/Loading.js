import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, ActivityIndicator } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const loadingText = [
    'Blending ice...',
    'Getting ingredients...',
    'Straining mix...',
    'Slicing lemons...',
    'Garnishing glass...',
    'Shaking...',
    'Tasting...',
    'Mixing...',
    'Stirring...',
    'Looking for salt...',
    'Adding egg whites...',
    'Cutting orange peel...',
    'Cleaning cups...',
    'Drinking...',
    'Adding foam...',
    'Chopping strawberries...',
]

const Loading = () => {
    const [index, setIndex] = useState(0);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(Math.floor(Math.random() * loadingText.length));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fadeIn();
    }, [index])

    const fadeIn = () => {
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


    const renderText = () => {
        return <Animated.Text style={[GlobalStyles.paragraphbold2, { color: Styles.DARK_PINK, marginTop: 15, opacity: fadeAnim }]}>
            {loadingText[index]}
        </Animated.Text>
    };

    return (
        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* {renderText()} */}
            <ActivityIndicator color={Styles.DARK_PINK} />
        </View>
    )
}

export default Loading;