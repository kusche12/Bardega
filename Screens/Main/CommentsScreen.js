import React from 'react';
import { SafeAreaView, ScrollView, Text, Image, TouchableWithoutFeedback, View } from 'react-native';
import CommentInput from '../../Components/Comments/CommentInput';
import Comment from '../../Components/Comments/Comment';
import Loading from '../../Components/Main/Loading';
import GlobalStyles from '../../Styles/GlobalStyles';
import DetailStyles from '../../Styles/DetailStyles';

const CommentsScreen = ({ route }) => {
    const { comments } = route.params;

    return (
        <View style={[GlobalStyles.headerSafeArea, GlobalStyles.footerSafeArea]} >
            <Text>LOAD DRINK IMAGE AND STUFF</Text>
            <ScrollView>
                {comments.map((comment, index) => <Comment comment={comment} key={index} />)}
            </ScrollView>
            <CommentInput />
        </View>
    )
}

export default CommentsScreen;