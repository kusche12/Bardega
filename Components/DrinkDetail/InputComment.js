import React, { useState } from 'react';
import { View, Image, TextInput } from 'react-native';
import DetailStyles from '../../Styles/DetailStyles';

const InputComment = () => {
    const [comment, setComment] = useState('');

    return (
        <View style={DetailStyles.commentInputRow}>
            <Image source={require('./comment.png')} style={DetailStyles.commentInputImage} />
            <TextInput
                style={DetailStyles.commentInput}
                onChangeText={setComment}
                value={comment}
                placeholder="Add Review / Comment"
                multiline={false}
                placeholderTextColor='##979797'
            />
        </View>
    )
}

export default InputComment;