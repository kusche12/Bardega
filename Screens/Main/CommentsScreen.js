import React, { useEffect, useState } from 'react';
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

// TODO: Maybe mess with the UI of the header. Make it prettier but keep same information
// TODO: Implement pagination on the currComments component so that it does not have to load all at once
const CommentsScreen = ({ route, profiles, navigation, comments }) => {
    const { drink } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [currComments, setCurrComments] = useState([]);

    useEffect(() => {
        if (comments) {
            let result = [];
            Object.keys(comments).map((key, index) => {
                result.push(comments[key]);
            })
            setCurrComments(result);
            setIsLoading(false);
        }
    }, [comments])

    const renderTags = () => {
        let res = '';
        for (let i = 0; i < drink.tags.length; i++) {
            res += drink.tags[i].name + ', '
        };
        res = res.substr(0, res.length - 2);
        return <Text style={{ fontWeight: '300', fontSize: 16 }}>{res}</Text>
    }

    if (isLoading) {
        return <Loading />
    } else {
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
                    {currComments && currComments.length > 0
                        ?
                        currComments.map((comment, index) =>
                            <Comment comment={comment} key={index} author={profiles[comment.authorID]} navigation={navigation} />
                        )
                        : null

                    }
                </ScrollView>
                <CommentInput />
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const commentID = ownProps.route.params.drink.commentID;
    const allComments = state.firestore.data.comments;
    const comments = allComments ? allComments[commentID] : null;
    return {
        profiles: state.firestore.data.profiles,
        comments: comments
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['profiles'])
)(CommentsScreen);