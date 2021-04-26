import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Images from '../../Images/Images';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { clearDrinkState, deleteDrink } from '../../Store/Actions/DrinkActions';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import Loading from '../../Components/Main/Loading';
import InputComment from '../../Components/DrinkDetail/InputComment';
import { renderTime } from '../../Functions/miscFunctions';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import DetailStyles from '../../Styles/DetailStyles';


// TODO: Add a "bookmark", "like", and "share" button that allows the user to add this drink to one of their favorite's buckets
// TODO: Add the description to this screen. Just do a white floating box directly under the drink image.
// TODO: Add the prep time to this screen. Do a white floating box under the ingredients list
// TODO: Add the strength to this screen.
// TODO: Add the tags to this screen.
// TODO: Drink image does not render when moving from CreateScreen to this screen
const DrinkDetailScreen = ({ navigation, route, author, comments, authors, userID, clearDrinkState, deleteDrink }) => {
    const drink = route.params.drink;
    const [isLoading, setIsLoading] = useState(true);

    // Load the component after all props are set
    // Turn the firestore comments object into a comments array
    useEffect(() => {
        if (author && authors && comments && drink && drink.imageURL) {
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
                            ? <Text style={DetailStyles.textGray}>{recipe.amount} {recipe.unit.toLowerCase()}</Text>
                            : <Text style={DetailStyles.textGray}>{recipe.unit.toLowerCase()}</Text>
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
        if (comments.length === 0) {
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
            while (i < 2 && i < comments.length) {
                const comment = comments[i];
                const author = authors[comment.authorID];
                result.push(
                    <View key={i}>
                        <View style={DetailStyles.commentRow}>
                            <Image source={{ uri: author.imageURL }} style={DetailStyles.commentImage} />
                            <View style={DetailStyles.commentDetail}>
                                <Text style={{ marginBottom: 6 }}>{comment.text}</Text>
                                <Text
                                    style={DetailStyles.commentText2}>- {author.fName} {author.lName} | {renderTime(comment.dateCreated)}
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

    // If this is the creator of the drink, allow for editing or deletion
    const handleEditDrink = () => {
        return Alert.alert(
            "Drink Options",
            null,
            [
                {
                    text: "Edit Drink",
                    onPress: () => handleEditDrinkHelper()
                },
                {
                    text: "Delete Drink",
                    onPress: () => handleDeleteDrink(),
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

    const handleEditDrinkHelper = () => {
        clearDrinkState();
        navigation.navigate('CreateScreen', { drink: drink })
    }

    const handleDeleteDrink = () => {
        return Alert.alert(
            "Are you sure?",
            "Once you delete this drink, you will no longer be able to recover it.",
            [
                {
                    text: "Yes, delete this drink",
                    onPress: () => handleDeleteDrinkHelper(),
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

    const handleDeleteDrinkHelper = async () => {
        await navigation.navigate('ProfileScreen');
        deleteDrink(drink);
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
                    {/* Title (add the right edit button if the userID === authorID) */}
                    <View style={{ flexDirection: 'row' }}>
                        {userID === drink.authorID && <View style={{ flex: 1 }} ></View>}
                        <Text style={CreateStyles.title}>{drink.name}</Text>
                        {userID === drink.authorID &&
                            <TouchableWithoutFeedback onPress={() => handleEditDrink()}>
                                <Image source={Images.threedots} style={DetailStyles.editImage} />
                            </TouchableWithoutFeedback>
                        }
                    </View>
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

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('CommentsScreen', { drink: drink })}>
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

    return {
        author: profile,
        comments: state.firestore.ordered['allComments'],
        authors: state.firestore.data.profiles,
        userID: state.firebase.auth.uid,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearDrinkState: () => dispatch(clearDrinkState()),
        deleteDrink: (drink) => dispatch(deleteDrink(drink))
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
)(DrinkDetailScreen);

