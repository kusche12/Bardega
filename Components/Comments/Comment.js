import React, { useState, useEffect } from 'react';
import { Image, View, TouchableWithoutFeedback, TouchableHighlight, Text, StyleSheet, Vibration, Alert } from 'react-native';
import { renderTime } from '../../Functions/miscFunctions';
import { likeComment, unLikeComment, deleteComment } from '../../Store/Actions/CommentActions';
import Images from '../../Images/Images';
import Loading from '../../Components/Main/Loading';
import DoubleTapButton from '../Main/DoubleTapButton';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Comment = ({ comment, author, navigation, commentID,
    likedByUsers, numLikes, userID, likeComment,
    unLikeComment, deleteComment }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (likedByUsers !== null && comment !== null && userID !== null) {
            setIsLoading(false);
        }
    }, [likedByUsers])

    const renderLikes = () => {
        if (numLikes < 10000) {
            return numLikes;
        } else if (numLikes >= 10001 && numLikes < 1000000) {
            return `${Math.round(numLikes / 3)}k`;
        } else {
            return `${Math.round(numLikes / 4)}m`;
        }
    }

    const renderHeart = () => {
        let img;
        if (likedByUsers && likedByUsers[userID]) {
            img = <Image source={Images.comment.fullHeart} style={styles.heartImg} />
        } else {
            img = <Image source={Images.comment.emptyHeart} style={styles.heartImg} />
        }
        return <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
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

    if (isLoading) {
        return <Loading />
    } else {
        return (
            <TouchableHighlight
                onLongPress={() => handleRemove()}
                underlayColor={'white'}
            >
                <DoubleTapButton onDoubleTap={() => handleLike()}>
                    <View style={styles.container}>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileScreen', { user: author })}>
                            <View style={styles.user}>
                                <Image source={{ uri: author.imageURL }} style={styles.img} />
                                <View>
                                    <Text style={{ marginBottom: 2 }}>
                                        <Text style={styles.username}>{author.userName} </Text>
                                        <Text>{comment.text}</Text>
                                    </Text>
                                    <Text>
                                        <Text style={styles.date}>{renderTime(comment.dateCreated)}  </Text>
                                        {likedByUsers && likedByUsers.length === 1
                                            ? <Text style={styles.date}>1 Like</Text>
                                            : <Text style={styles.date}>{renderLikes()} Likes</Text>
                                        }
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
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
        alignItems: 'center'
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
    username: {
        fontWeight: '500',
    },
    date: {
        color: "#a1a1a1",
        fontSize: 12,
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
        likedByUsers: likedByUsers ? likedByUsers : null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeComment: (data) => dispatch(likeComment(data)),
        unLikeComment: (data) => dispatch(unLikeComment(data)),
        deleteComment: (data) => dispatch(deleteComment(data)),
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