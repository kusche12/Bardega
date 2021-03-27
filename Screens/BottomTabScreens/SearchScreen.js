import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, SafeAreaView } from 'react-native';

const Stack = createStackNavigator();

const SearchScreen = ({ route }) => {
    return (
        <SafeAreaView>
            <Text>This is the SearchScreen</Text>
        </SafeAreaView>
    );
}

export default SearchScreen;