import React from 'react';
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from '../../Components/Main/Loading';
import GlobalStyles from '../../Styles/GlobalStyles';
import DetailStyles from '../../Styles/DetailStyles';

const CommentsScreen = ({ comments }) => {

    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea} >
            <Text>Comments Screen</Text>
        </SafeAreaView>
    )
}

export default CommentsScreen;