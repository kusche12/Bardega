import React from 'react';
import { SafeAreaView, ScrollView, Text, Image, View } from 'react-native';
import CommentInput from '../../Components/Comments/CommentInput';
import Comment from '../../Components/Comments/Comment';
import { getCachedImage } from '../../Functions/cacheFunctions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Loading from '../../Components/Main/Loading';
import GlobalStyles from '../../Styles/GlobalStyles';
import DetailStyles from '../../Styles/DetailStyles';

const CommentsScreen = ({ route, profiles, navigation }) => {
    const { comments, drink } = route.params;

    const renderTags = () => {
        let res = '';
        for (let i = 0; i < drink.tags.length; i++) {
            res += drink.tags[i] + ', '
        };
        res = res.substr(0, res.length - 2);
        return <Text style={{ fontWeight: '300' }}>{res}</Text>
    }

    return (
        <View style={[GlobalStyles.headerSafeArea, GlobalStyles.footerSafeArea]} >
            <View style={DetailStyles.commentHeaderRow}>
                <Image source={{ uri: getCachedImage(drink.id) || drink.imageURL }} style={DetailStyles.commentHeaderImage} />
                <View>
                    <Text style={{ fontWeight: '500', fontSize: 20 }}>{drink.name}</Text>
                    {renderTags()}
                </View>

            </View>
            <ScrollView>
                {comments.map((comment, index) =>
                    <Comment comment={comment} key={index} author={profiles[comment.authorID]} navigation={navigation} />
                )}
            </ScrollView>
            <CommentInput />
        </View>
    )
}

const mapStateToProps = (state) => {

    return {
        profiles: state.firestore.data.profiles
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['profiles', 'comments'])
)(CommentsScreen);