import * as React from 'react';
import { Text, SafeAreaView } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';

const DiscoverDetail = ({ route }) => {
    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <Text>This is the Hello</Text>
        </SafeAreaView>
    );
}

export default DiscoverDetail;