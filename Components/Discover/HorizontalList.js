import React from 'react';
import { View, Text } from 'react-native';

const HorizontalList = ({ drinks, query, index }) => {
    return (
        <View>
            <Text>{query}</Text>
        </View>
    )
}

export default HorizontalList;