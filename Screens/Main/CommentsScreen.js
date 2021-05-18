import React, { useState } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import CommentInput from '../../Components/Comments/CommentInput';
import Comment from '../../Components/Comments/Comment';
import { getCachedImage } from '../../Functions/cacheFunctions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { createComment } from '../../Store/Actions/CommentActions';
import { createNotification } from '../../Store/Actions/NotificationActions';
import GlobalStyles from '../../Styles/GlobalStyles';
import DetailStyles from '../../Styles/DetailStyles';
import Styles from '../../Styles/StyleConstants';

const CommentsScreen = ({ route, profiles, navigation, comments, createComment, userID, createNotification, notifID }) => {
    const { drink } = route.params;
    const [text, setText] = useState('');

    const renderTags = () => {
        let res = '';
        for (let i = 0; i < drink.tags.length; i++) {
            res += drink.tags[i].name + ', '
        };
        res = res.substr(0, res.length - 2);
        return <Text style={[GlobalStyles.paragraph3, { color: Styles.GRAY }]}>{res}</Text>
    }

    const handleCreateComment = () => {
        createComment({
            authorID: userID,
            text: text,
            commentID: drink.commentID
        });
        createNotification({ drinkID: drink.id, type: 'comment', userID: userID, comment: text, notifID: notifID });
        setText('');
    }

    return (
        <View style={[GlobalStyles.headerSafeArea, GlobalStyles.footerSafeArea]} >
            <View style={DetailStyles.commentHeaderRow}>
                <Image source={{ uri: getCachedImage(drink.id) || drink.imageURL }} style={DetailStyles.commentHeaderImage} />
                <View>
                    <Text style={[GlobalStyles.paragraph1, { fontSize: 20 }]}>{drink.name}</Text>
                    <Text style={GlobalStyles.paragraph2}>{drink.strength.label}</Text>
                    {renderTags()}
                </View>

            </View>
            <ScrollView>
                {comments && comments.length > 0
                    ?
                    comments.slice(0).reverse().map((comment, index) => {
                        if (comment.id !== 'default') {
                            return <Comment
                                comment={comment}
                                key={index}
                                commentID={drink.commentID}
                                author={profiles[comment.authorID]}
                                navigation={navigation}
                                drinkID={drink.id}
                            />
                        }
                    }
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
        createNotification: (data) => dispatch(createNotification(data)),
    }
}

const mapStateToProps = (state, ownProps) => {
    const profiles = state.firestore.data.profiles;
    const author = profiles[ownProps.route.params.drink.authorID];
    const notifID = author.notificationsID;
    return {
        profiles: state.firestore.data.profiles,
        userID: state.firebase.auth.uid,
        comments: state.firestore.ordered['allComments'],
        notifID: notifID
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
            }]
        }])
)(CommentsScreen);