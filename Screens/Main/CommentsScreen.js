import React, { useEffect, useState } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import CommentInput from '../../Components/Comments/CommentInput';
import Comment from '../../Components/Comments/Comment';
import { getCachedImage } from '../../Functions/cacheFunctions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { createComment } from '../../Store/Actions/CommentActions';
import Loading from '../../Components/Main/Loading';
import GlobalStyles from '../../Styles/GlobalStyles';
import DetailStyles from '../../Styles/DetailStyles';

// TODO: Maybe mess with the UI of the header. Make it prettier but keep same information
// TODO: Implement pagination on the currComments component so that it does not have to load all at once
const CommentsScreen = ({ route, profiles, navigation, comments, createComment, userID }) => {
    const { drink } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [text, setText] = useState('');

    const renderTags = () => {
        let res = '';
        for (let i = 0; i < drink.tags.length; i++) {
            res += drink.tags[i].name + ', '
        };
        res = res.substr(0, res.length - 2);
        return <Text style={{ fontWeight: '300', fontSize: 16 }}>{res}</Text>
    }

    const handleCreateComment = () => {
        createComment({
            authorID: userID,
            text: text,
            commentID: drink.commentID
        })
    }

    return (
        <View style={[GlobalStyles.headerSafeArea, GlobalStyles.footerSafeArea]} >
            <View style={DetailStyles.commentHeaderRow}>
                <Image source={{ uri: getCachedImage(drink.id) || drink.imageURL }} style={DetailStyles.commentHeaderImage} />
                <View>
                    <Text style={{ fontWeight: '500', fontSize: 20 }}>{drink.name}</Text>
                    <Text style={{ fontWeight: '300', fontSize: 16 }}>{drink.strength.label}</Text>
                    {renderTags()}
                </View>

            </View>
            <ScrollView>
                {comments && comments.length > 0
                    ?
                    comments.map((comment, index) =>
                        <Comment comment={comment} key={index} author={profiles[comment.authorID]} navigation={navigation} />
                    )
                    : null

                }
            </ScrollView>
            <CommentInput {...{ text, setText, handleCreateComment }} />
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (comment) => dispatch(createComment(comment)),
    }
}

const mapStateToProps = (state) => {
    return {
        profiles: state.firestore.data.profiles,
        userID: state.firebase.auth.uid,
        comments: state.firestore.ordered['allComments']
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        { collection: 'profiles' },
        {
            collection: "comments",
            doc: props.route.params.drink.commentID,
            storeAs: 'allComments',
            subcollections: [{
                collection: "allComments"
            }
            ]
        }])
)(CommentsScreen);