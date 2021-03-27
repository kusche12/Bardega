import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, SafeAreaView } from 'react-native';

const Stack = createStackNavigator();

const SpiritScreen = ({ route }) => {
    return (
        <SafeAreaView>
            <Text>This is the SpiritScreen</Text>
        </SafeAreaView>
    );
}

export default SpiritScreen;