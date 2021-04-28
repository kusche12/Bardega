import React from 'react';
import { View, Image, Text } from 'react-native';
import Images from '../../Images/Images';
import DetailStyles from '../../Styles/DetailStyles';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const InputComment = () => {

    return (
        <View style={DetailStyles.commentInputRow}>
            <View style={DetailStyles.imageContainer}>
                <Image source={Images.commentImg} style={DetailStyles.commentInputImage} />
            </View>
            <View style={DetailStyles.commentInput}>
                <Text style={[GlobalStyles.paragraph3, { color: Styles.GRAY }]}>Add a comment...</Text>
            </View>
        </View>
    )
}

export default InputComment;