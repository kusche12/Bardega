import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, SafeAreaView } from 'react-native';

const Stack = createStackNavigator();

const DiscoverDetail = ({ route }) => {
    return (
        <SafeAreaView>
            <Text>This is the DiscoverDetail</Text>
        </SafeAreaView>
    );
}

export default DiscoverDetail;