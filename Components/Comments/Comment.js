import React, { useState, useEffect } from 'react';
import { Image, View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import { renderTime } from '../../Functions/miscFunctions';
import { likeComment, unLikeComment } from '../../Store/Actions/CommentActions';
import Images from '../../Images/Images';
import Loading from '../../Components/Main/Loading';
import DoubleTapButton from '../Main/DoubleTapButton';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const Comment = ({ comment, author, navigation, commentID, likedByUsers, numLikes, userID, likeComment, unLikeComment }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (likedByUsers) {
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
        if (likedByUsers && likedByUsers[userID]) {
            return <Image source={Images.comment.fullHeart} style={styles.heartImg} />
        } else {
            return <Image source={Images.comment.emptyHeart} style={styles.heartImg} />
        }
    }

    const handleLike = () => {
        if (likedByUsers && likedByUsers[userID]) {
            unLikeComment({ userID: userID, comment: comment, commentID: commentID });
        } else {
            likeComment({ userID: userID, comment: comment, commentID: commentID });
        }
    }

    if (isLoading) {
        return <Loading />
    } else {
        return (
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
                    <TouchableWithoutFeedback onPress={() => handleLike()}>
                        {renderHeart()}
                    </TouchableWithoutFeedback>
                </View>
            </DoubleTapButton>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 24,
        paddingLeft: 12,
        paddingRight: 24,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    user: {
        flexDirection: 'row',
    },
    img: {
        borderRadius: 100,
        width: 40,
        height: 40,
        marginRight: 12
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
    //console.log("THIS RUNS: " + ownProps.comment.text)
    let likedByUsers = state.firestore.data['likedByUsers']
    console.log(likedByUsers)
    return {
        userID: state.firebase.auth.uid,
        numLikes: ownProps.comment.numLikes,
        likedByUsers: likedByUsers
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeComment: (data) => dispatch(likeComment(data)),
        unLikeComment: (data) => dispatch(unLikeComment(data)),
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
            storeAs: 'likedByUsers',
            subcollections: [{
                collection: "likedByUsers"
            }
            ]
        }])
)(Comment);