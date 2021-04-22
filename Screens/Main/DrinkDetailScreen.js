import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import Loading from '../../Components/Main/Loading';
import InputComment from '../../Components/DrinkDetail/InputComment';
import moment from 'moment';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import DetailStyles from '../../Styles/DetailStyles';


// TODO: Add a "bookmark" button that allows the user to add this drink to one of their favorite's buckets
// TODO: If the drink's .authorID and currently authed userID are equal. Then add an "edit drink" button / route
const DrinkDetailScreen = ({ navigation, route, author, comments, authors }) => {
    const drink = route.params.drink;
    const [isLoading, setIsLoading] = useState(true);

    // Load the component after all props are set
    useEffect(() => {
        if (author !== null && authors !== null) {
            cacheImages(drink.imageURL, drink.id)
            setIsLoading(false);
        }
    }, [author, comments, authors]);

    const renderRecipe = () => {
        let result = [];
        for (let i = 0; i < drink.recipe.length; i++) {
            const recipe = drink.recipe[i];
            result.push(
                <View style={DetailStyles.row} key={i}>
                    <View style={DetailStyles.col1}>
                        {recipe.amount
                            ? <Text style={DetailStyles.textGray}>{recipe.amount} {recipe.unit}</Text>
                            : <Text style={DetailStyles.textGray}>{recipe.unit}</Text>
                        }
                    </View>
                    <View style={DetailStyles.col2}>
                        <Text style={[DetailStyles.textBlack, DetailStyles.wrapRecipeText]}>{recipe.type}</Text>
                    </View>
                </View>
            );
        }
        return result;
    }

    const renderComments = () => {
        let result = [];
        if (comments === null || comments.length === 0) {
            return (
                <View>
                    <Text style={DetailStyles.commentText3}>There are no comments for this drink yet!</Text>
                    <Text style={DetailStyles.commentText3}>Share your thoughts with us here</Text>
                    <View style={[CreateStyles.ingrLine, { marginBottom: 8, marginTop: 16 }]}></View>
                    <InputComment />
                </View>
            )
        } else {
            let i = 0;
            while (i < 2 || i < comments.length) {
                const comment = comments[i];
                const author = authors[comment.authorID];
                result.push(
                    <View key={i}>
                        <View style={DetailStyles.commentRow}>
                            <Image source={{ uri: author.imageURL }} style={DetailStyles.commentImage} />
                            <View style={DetailStyles.commentDetail}>
                                <Text style={{ marginBottom: 6 }}>{comment.text}</Text>
                                <Text
                                    style={DetailStyles.commentText2}>- {author.fName} {author.lName} | {moment(comment.dateCreated, "YYYYMMDD").fromNow()}
                                </Text>
                            </View>
                        </View>
                        <View style={[CreateStyles.ingrLine, { marginBottom: 8 }]}></View>
                    </View>
                )
                i++;
            }
            return (
                <>
                    {result}
                    <Text style={DetailStyles.commentText3}>View +{comments.length} more comments</Text>
                </>

            )
        }
    }

    if (isLoading) {
        return <Loading />
    } else {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <SafeAreaView style={[GlobalStyles.headerSafeArea, CreateStyles.container]} >
                    <Text style={CreateStyles.title}>{drink.name}</Text>
                    <View style={DetailStyles.shadowContainer}>
                        <View style={DetailStyles.photoContainer}>
                            <Image source={{ uri: getCachedImage(drink.id) || drink.imageURL }} style={DetailStyles.drinkImage} />
                        </View>
                    </View>

                    {drink.recipe &&
                        <View style={CreateStyles.ingrContainer}>
                            <Text style={CreateStyles.ingrTitle}>INGREDIENTS</Text>

                            <View style={[CreateStyles.ingrLine, { marginBottom: 5 }]}></View>

                            <View style={DetailStyles.recipeContainer}>
                                {renderRecipe()}
                            </View>
                        </View>
                    }

                    {drink.directions &&
                        <View style={CreateStyles.ingrContainer}>
                            <Text style={CreateStyles.ingrTitle}>DIRECTIONS</Text>

                            <View style={[CreateStyles.ingrLine, { marginBottom: 5 }]}></View>
                            <Text style={DetailStyles.textBlack}>{drink.directions}</Text>

                        </View>
                    }

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('CommentsScreen', { comments: comments, drink: drink })}>
                        <View style={[CreateStyles.ingrContainer, DetailStyles.commentContainer]}>
                            <Text style={[CreateStyles.ingrTitle, { alignSelf: 'center' }]}>COMMENTS</Text>

                            <View style={[CreateStyles.ingrLine, { marginBottom: 16 }]}></View>
                            {renderComments()}

                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileScreen', { user: authors[drink.authorID] })}>
                        <View style={[CreateStyles.ingrContainer, DetailStyles.submitContainer]}>
                            <Text style={[CreateStyles.ingrTitle, { alignSelf: 'center' }]}>SUBMITTED BY</Text>

                            <View style={[CreateStyles.ingrLine, { marginBottom: 5 }]}></View>

                            <View style={DetailStyles.submitRow}>
                                <Image source={{ uri: author.imageURL }} style={[DetailStyles.commentImage, { marginRight: 4 }]}></Image>
                                <Text style={DetailStyles.textBlack}>{author.userName}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                </SafeAreaView>
            </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const authorID = ownProps.route.params.drink.authorID;
    const profiles = state.firestore.data.profiles;
    const profile = profiles ? profiles[authorID] : null;

    const commentID = ownProps.route.params.drink.commentID;
    const allComments = state.firestore.data.comments;
    const comments = allComments ? allComments[commentID].comments : null;
    return {
        author: profile,
        comments: comments ? comments : null,
        authors: state.firestore.data.profiles
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['profiles', 'comments'])
)(DrinkDetailScreen);

