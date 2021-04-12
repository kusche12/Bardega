import React from 'react';
import { Text, SafeAreaView, View, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../Styles/GlobalStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';

const DrinkListScreen = ({ drinks }) => {
    console.log(drinks);
    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <SafeAreaView style={GlobalStyles.headerSafeArea} >
                <View style={DiscoverStyles.titleContainer}>
                    <Text style={DiscoverStyles.title}>DRINK LIST SCREEN</Text>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default DrinkListScreen;