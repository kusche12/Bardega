import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import DetailStyles from '../../Styles/DetailStyles';

const InputComment = () => {
    const [comment, setComment] = useState('');

    return (
        <View style={DetailStyles.commentInputRow}>
            <View style={DetailStyles.imageContainer}>
                <Image source={require('./comment.png')} style={DetailStyles.commentInputImage} />
            </View>
            <View style={DetailStyles.commentInput}>
                <Text style={{ color: '#979797' }}>Add a comment...</Text>
            </View>
        </View>
    )
}

export default InputComment;