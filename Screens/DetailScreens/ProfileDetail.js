import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, SafeAreaView } from 'react-native';

const Stack = createStackNavigator();

const ProfileDetail = ({ route }) => {
    return (
        <SafeAreaView>
            <Text>This is the ProfileDetail</Text>
        </SafeAreaView>
    );
}

export default ProfileDetail;