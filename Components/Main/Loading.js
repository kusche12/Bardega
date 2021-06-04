import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

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
    'Cleaning glasses...',
    'Drinking...',
    'Adding foam...',
    'Chopping strawberries...',
    'Rubbing peel...'
]

const Loading = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(Math.floor(Math.random() * loadingText.length));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const renderText = () => {
        return <Text style={[GlobalStyles.paragraphbold2, { color: Styles.DARK_PINK, marginTop: 10 }]}>{loadingText[index]}</Text>
    };

    return (
        <View>
            <ActivityIndicator size="large" color={Styles.DARK_PINK} />
            {renderText()}
        </View>
    )
}

export default Loading;