import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Loading from '../../Components/Main/Loading';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import DetailStyles from '../../Styles/DetailStyles';


const comments = [
    {
        commentID: 1,
        authorFirstName: 'Joe',
        authorLastName: 'Rowan',
        date: 'Feb. 19',
        text: 'Love this, made it without the orange though.'
    },
    {
        commentID: 2,
        authorFirstName: 'Allie',
        authorLastName: 'Bishop',
        date: 'Feb. 02',
        text: 'SOO easy and tasty!! :)'
    }
]

// TODO: Add a "bookmark" button that allows the user to add this drink to one of their favorite's buckets
// TODO: If the drink's .authorID and currently authed userID are equal. Then add an "edit drink" button / route
// TODO: Get the actual comments using the .commentID in the drink data
// TODO: Set the comment backend schema to include an authorID. This ID will access the author fName, lName, and Image
// For UI purposes, use the schema provided below
// TODO: Add a "submitted by" button / component at the bottom of the detail screen that takes you to the author's profile page
const DrinkDetailScreen = ({ navigation, route, author }) => {
    const drink = route.params.drink;

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (author !== null) {
            setIsLoading(false);
        }
    }, [author]);

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
                        <Text style={DetailStyles.textBlack}>{recipe.type}</Text>
                    </View>
                </View>
            );
        }
        return result;
    }

    const renderComments = () => {
        let result = [];
        if (comments.length < 1) {
            return <Text>This drink has no comments yet! Leave the first one below :)</Text>
        } else {
            let i = 0;
            while (i < 2 || i < comments.length) {
                const comment = comments[i];
                result.push(
                    <View key={i}>
                        <View style={DetailStyles.commentRow}>
                            <Image source={require('./face.png')} style={DetailStyles.commentImage} />
                            <View style={DetailStyles.commentDetail}>
                                <Text style={{ marginBottom: 6 }}>{comment.text}</Text>
                                <Text style={DetailStyles.commentText2}>- {comment.authorFirstName} {comment.authorLastName} | {comment.date}</Text>
                            </View>
                        </View>
                        <View style={[CreateStyles.ingrLine, { marginBottom: 8 }]}></View>
                    </View>
                )
                i++;
            }
            return result;
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
                            <Image source={{ uri: drink.imageURL }} style={DetailStyles.drinkImage} />
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

                    <TouchableWithoutFeedback onPress={() => console.log('navigate to comments page')}>
                        <View style={[CreateStyles.ingrContainer, DetailStyles.commentContainer]}>
                            <Text style={[CreateStyles.ingrTitle, { alignSelf: 'center' }]}>COMMENTS</Text>

                            <View style={[CreateStyles.ingrLine, { marginBottom: 5 }]}></View>
                            {renderComments()}

                            {/* The design makes this a text input, but component should be moved to a comments page I think */}
                            {
                                comments.length > 2
                                    ? <Text style={DetailStyles.commentText3}>View +{comments.length - 2} more comments</Text>
                                    : <Text style={DetailStyles.commentText3}>View more comments</Text>
                            }

                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => console.log('navigate to drink authors profile page')}>
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

// TODO: Get the comments object from the commentID aswell
const mapStateToProps = (state, ownProps) => {
    const authorID = ownProps.route.params.drink.authorID;
    const profiles = state.firestore.data.profiles;
    const profile = profiles ? profiles[authorID] : null
    return {
        author: profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['profiles'])
)(DrinkDetailScreen);