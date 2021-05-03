import React from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';

const Loading = () => {
    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <ActivityIndicator size='small' />
        </SafeAreaView>
    )
}

export default Loading;