import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';

const Loading = () => {
    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <Text>Loading data, please wait</Text>
        </SafeAreaView>
    )
}

export default Loading;