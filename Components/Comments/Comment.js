import React, { useState, useEffect } from 'react';
import { Image, View, TouchableWithoutFeedback, TouchableHighlight, Text, StyleSheet, Vibration, Alert, ActivityIndicator } from 'react-native';
import { renderTime, renderNum } from '../../Functions/miscFunctions';
import { likeComment, unLikeComment, deleteComment } from '../../Store/Actions/CommentActions';
import Images from '../../Images/Images';
import DoubleTapButton from '../Main/DoubleTapButton';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { createNotification } from '../../Store/Actions/NotificationActions';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const Comment = ({ comment, author, navigation, commentID,
    likedByUsers, numLikes, userID, likeComment,
    unLikeComment, deleteComment, createNotification, drinkID, profiles }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        // If this comment's author no longer has a profile, then delete the comment
        if (!author) {
            deleteComment({ commentID: commentID, comment: comment });
        } else if (likedByUsers !== null && comment !== null && userID !== null) {
            setIsLoading(false);
        }
    }, [likedByUsers])

    const renderHeart = () => {
        let img;
        if (likedByUsers && likedByUsers[userID]) {
            img = <Image source={Images.comment.fullHeart} style={styles.heartImg} />
        } else {
            img = <Image source={Images.comment.emptyHeart} style={styles.heartImg} />
        }
        return <View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center' }}>
            {img}
        </View>
    }

    const handleLike = async () => {
        if (isDisabled) {
            return;
        }
        setIsDisabled(true);
        if (likedByUsers && likedByUsers[userID]) {
            await unLikeComment({ userID: userID, comment: comment, commentID: commentID });
        } else {
            await likeComment({ userID: userID, comment: comment, commentID: commentID });
            if (userID !== author.id) {
                await createNotification({
                    notifID: author.notificationsID,
                    userID: userID,
                    comment: comment.text,
                    type: 'likedComment',
                    drinkID: drinkID,
                    token: author.expoToken
                })
            }
        }
        setIsDisabled(false);
    }

    const handleRemove = () => {
        if (userID === comment.authorID) {
            Vibration.vibrate([0, 500]);
            return Alert.alert(
                "Delete comment?",
                null,
                [
                    {
                        text: "Yes delete this comment",
                        onPress: () => deleteComment({ commentID: commentID, comment: comment }),
                        style: "destructive"
                    },
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                    },
                ],
                { cancelable: true }
            );

        }
    }

    const renderText = () => {
        if (!comment.taggedUsers || comment.taggedUsers.length == 0) {
            return <Text>{comment.text}</Text>
        } else {
            let words = comment.text.split(' ');
            let res = words;

            // Render all the other words as normal text
            for (let j = 0; j < res.length; j++) {
                res[j] = <Text key={'' + j} style={GlobalStyles.paragraph3}>{words[j]} </Text>
            }

            for (let i = 0; i < comment.taggedUsers.length; i++) {
                let tag = comment.taggedUsers[i];
                res[tag.wordPosition] = <Text key={'' + (i + 1) * 50} onPress={() => handleNavUser(tag.userID)} style={{ color: Styles.DARK_PINK }}>{words[tag.wordPosition]} </Text>
            }

            return <Text>{res}</Text>
        }
    }

    const handleNavUser = (userID) => {
        navigation.push('ProfileScreen', { user: profiles[userID] })
    }

    if (isLoading) {
        return <ActivityIndicator />
    } else {
        return (
            <TouchableHighlight
                onLongPress={() => handleRemove()}
                underlayColor={'white'}
            >
                <DoubleTapButton onDoubleTap={() => handleLike()}>
                    <View style={styles.container}>
                        <View style={styles.user}>
                            <TouchableWithoutFeedback disabled={isDisabled} onPress={() => navigation.push('ProfileScreen', { user: author })}>
                                <Image source={{ uri: author.imageURL }} style={styles.img} />
                            </TouchableWithoutFeedback>
                            <View>
                                <Text style={{ marginBottom: 2, width: Styles.width * .67 }}>
                                    <Text style={GlobalStyles.paragraphbold3}>{author.userName} </Text>
                                    <Text style={GlobalStyles.paragraph3}>{renderText()}</Text>
                                </Text>
                                <Text>
                                    <Text style={GlobalStyles.paragraph3}>{renderTime(comment.dateCreated)}  </Text>
                                    {numLikes && numLikes === 1
                                        ? <Text style={GlobalStyles.paragraph3}>1 Like</Text>
                                        : <Text style={GlobalStyles.paragraph3}>{renderNum(numLikes)} Likes</Text>
                                    }
                                </Text>
                            </View>
                        </View>
                        <TouchableWithoutFeedback disabled={isDisabled} onPress={() => handleLike()}>
                            {renderHeart()}
                        </TouchableWithoutFeedback>
                    </View>
                </DoubleTapButton>
            </TouchableHighlight>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingLeft: 12,
        paddingRight: 24,
        paddingTop: 12,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        overflow: 'hidden'
    },
    user: {
        flexDirection: 'row',
    },
    img: {
        borderRadius: 50,
        width: 38,
        height: 38,
        marginRight: 12,
        resizeMode: 'contain'
    },
    heartImg: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    }

});

const mapStateToProps = (state, ownProps) => {
    let likedByUsers = state.firestore.data['likedByUsers' + ownProps.comment.commentLikesID]

    return {
        userID: state.firebase.auth.uid,
        numLikes: ownProps.comment.numLikes,
        likedByUsers: likedByUsers ? likedByUsers : null,
        profiles: state.firestore.data.profiles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeComment: (data) => dispatch(likeComment(data)),
        unLikeComment: (data) => dispatch(unLikeComment(data)),
        deleteComment: (data) => dispatch(deleteComment(data)),
        createNotification: (data) => dispatch(createNotification(data)),
    }
}

// Subcollection of a subcollection: 
// https://stackoverflow.com/questions/53968379/how-to-point-firestoreconnect-to-a-nested-collection-in-react-redux-firebase
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        { collection: 'profiles' },
        {
            collection: "commentLikes",
            doc: props.comment.commentLikesID,
            storeAs: 'likedByUsers' + props.comment.commentLikesID,
            subcollections: [{
                collection: "likedByUsers"
            }
            ]
        }])
)(Comment);