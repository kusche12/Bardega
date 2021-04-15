import React from 'react';
import { Image, View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import DetailStyles from '../../Styles/DetailStyles';

const Comment = ({ comment }) => {

    return (
        <View style={styles.container}>
            <Text>{comment.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
    }

});

export default Comment;