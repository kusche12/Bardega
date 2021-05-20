import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Image, View, ActivityIndicator } from 'react-native';
import fb from '../../API/FirebaseSetup';
import CommentInput from '../../Components/Comments/CommentInput';
import Comment from '../../Components/Comments/Comment';
import { getCachedImage } from '../../Functions/cacheFunctions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { createComment } from '../../Store/Actions/CommentActions';
import { createNotification } from '../../Store/Actions/NotificationActions';
import User from '../../Components/Comments/User';
import GlobalStyles from '../../Styles/GlobalStyles';
import DetailStyles from '../../Styles/DetailStyles';
import Styles from '../../Styles/StyleConstants';

const CommentsScreen = ({ route, profiles, navigation, comments, createComment, userID, createNotification, notifID, token }) => {
    const { drink, user } = route.params;

    const [text, setText] = useState('');
    const [findingUser, setFindingUser] = useState(false);
    const [query, setQuery] = useState('');
    const [users, setUsers] = useState([]);
    const [focusedUsers, setFocusedUsers] = useState([]);
    const [textedUsers, setTextedUsers] = useState([]);

    // When screen is initialized, fetch all of the user's followers and following accounts
    useEffect(() => {
        async function fetchData() {
            let res = [];
            // Get all followers / following of user
            let db = fb.firestore();
            await db
                .collection('profileFollowers')
                .doc(user.profileFollowID)
                .collection('followerUsers')
                .get()
                .then(snapshot =>
                    snapshot
                        .docs
                        .map(x => {
                            if (x.data()['1']) {
                                res.push(profiles[x.data()['1']]);
                            }
                        }))
                .catch((err) => {
                    console.log(err)
                })
            await db
                .collection('profileFollowing')
                .doc(user.profileFollowID)
                .collection('followingUsers')
                .get()
                .then(snapshot =>
                    snapshot
                        .docs
                        .map(x => {
                            if (x.data()['1']) {
                                res.push(profiles[x.data()['1']]);
                            }
                        }))
                .catch((err) => {
                    console.log(err)
                })
            setUsers(res);
        }
        fetchData();
    }, []);

    // When there is an @ in the text, use the rest of the query to find similar user profiles
    useEffect(() => {
        console.log(query);
        if (query.length === 0) {
            setFindingUser(false);
        }
        if (findingUser) {
            findProfile();
        }
    }, [query]);

    const findProfile = () => {
        const regex = new RegExp(`${query.substring(1).trim()}`, 'i');
        let res = [];
        for (let i = 0; i < users.length; i++) {
            const profile = users[i];
            if (profile.userName.toLowerCase().search(regex) >= 0) {
                res.push(profile)
            }
        }
        setFocusedUsers(res);
    }

    const renderTags = () => {
        let res = '';
        for (let i = 0; i < drink.tags.length; i++) {
            res += drink.tags[i].name + ', '
        };
        res = res.substr(0, res.length - 2);
        return <Text style={[GlobalStyles.paragraph3, { color: Styles.GRAY }]}>{res}</Text>
    }

    const handleCreateComment = () => {
        let formatTags = [];
        let confirmedTagNotifs = [];

        const noSpace = text.split(' ');
        for (let i = 0; i < noSpace.length; i++) {
            let word = noSpace[i];
            // If there is an @, get that user's ID from the array of texted users
            if (word.charAt(0) === '@') {
                for (let j = 0; j < textedUsers.length; j++) {
                    if (textedUsers[j].userName === word.substring(1)) {
                        formatTags.push({ userID: textedUsers[j].id, wordPosition: i });
                        confirmedTagNotifs.push(textedUsers[j]);
                        break;
                    }
                }
            }
        }

        createComment({
            authorID: userID,
            text: text,
            commentID: drink.commentID,
            taggedUsers: formatTags
        });
        createNotification({
            drinkID: drink.id,
            type: 'comment',
            userID: userID,
            comment: text,
            notifID: notifID,
            token: token
        });

        setText('');

        // Traverse the formatTags and send a notification to each tagged user
        for (let j = 0; j < confirmedTagNotifs.length; j++) {
            let tagged = confirmedTagNotifs[j];
            createNotification({
                drinkID: drink.id,
                type: 'taggedComment',
                userID: userID,
                comment: text,
                notifID: tagged.notifID,
                token: tagged.expoToken
            });
        }
    }

    // If the user is currently typing an '@', then render a list of their followers / following
    // to add their handle into the text
    const renderCommentScreen = () => {
        if (findingUser) {
            return (
                <ScrollView>
                    {focusedUsers && focusedUsers.length > 0
                        ?
                        focusedUsers.map((user, index) => {
                            return <User {...{ user, text, setText, setFindingUser, setQuery, setFocusedUsers, users, setTextedUsers }} key={index} />
                        })
                        : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator style={{ marginRight: 10 }} />
                            <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY }]}>No matches found for {query.substring(1)}</Text>
                        </View>
                    }
                </ScrollView>
            )
        } else {
            return (
                <ScrollView>
                    {comments && comments.length > 0
                        ?
                        comments.slice(0).reverse().map((comment, index) => {
                            if (comment.id !== 'default') {
                                return <Comment
                                    comment={comment}
                                    key={'' + index}
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
            )
        }
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

            {renderCommentScreen()}
            <CommentInput {...{ text, setText, handleCreateComment, setFindingUser, findingUser, query, setQuery }} />
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
    const token = author.expoToken;

    return {
        profiles: state.firestore.data.profiles,
        userID: state.firebase.auth.uid,
        comments: state.firestore.ordered['allComments'],
        notifID: notifID,
        token: token
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