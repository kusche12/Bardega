import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, SafeAreaView } from 'react-native';

const Stack = createStackNavigator();

const CreateScreen = ({ route }) => {
    return (
        <SafeAreaView>
            <Text>This is the CreateScreen</Text>
        </SafeAreaView>
    );
}

export default CreateScreen;