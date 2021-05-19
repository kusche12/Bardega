import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, Alert, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Images from '../../Images/Images';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { clearDrinkState, deleteDrink } from '../../Store/Actions/DrinkActions';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import InputComment from '../../Components/DrinkDetail/InputComment';
import StrengthAndPrep from '../../Components/DrinkDetail/StrengthAndPrep';
import DetailLikeCommentShare from '../../Components/DrinkDetail/DetailLikeCommentShare';
import { renderTime } from '../../Functions/miscFunctions';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import DetailStyles from '../../Styles/DetailStyles';
import Styles from '../../Styles/StyleConstants';

const DrinkDetailScreen = ({ navigation, drink, author, comments, authors, userID, clearDrinkState, deleteDrink }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState(null);

    // Load the component after all props are set
    useEffect(() => {
        if (author && authors && comments && drink) {
            cacheImages(drink.imageURL, drink.id);
            const imgTemp = getCachedImage(drink.id) || drink.imageURL;
            setImage(imgTemp);
            setIsLoading(false);
        }
    }, [author, comments, drink]);

    const renderRecipe = () => {
        let result = [];
        for (let i = 0; i < drink.recipe.length; i++) {
            const recipe = drink.recipe[i];
            result.push(
                <View style={DetailStyles.row} key={i}>
                    <View style={DetailStyles.col1}>
                        {recipe.amount
                            ? <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY }]}>{recipe.amount} {recipe.unit.toLowerCase()}</Text>
                            : <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY }]}>{recipe.unit.toLowerCase()}</Text>
                        }
                    </View>
                    <View style={DetailStyles.col2}>
                        <Text style={[GlobalStyles.paragraph2, DetailStyles.wrapRecipeText]}>{recipe.type}</Text>
                    </View>
                </View>
            );
        }
        return result;
    }

    const renderComments = () => {
        let result = [];
        if (comments.length === 1) {
            return (
                <View>
                    <Text style={[GlobalStyles.paragraph3, { color: Styles.GRAY }]}>There are no comments for this drink yet!</Text>
                    <Text style={[GlobalStyles.paragraph3, { color: Styles.GRAY, marginBottom: 16 }]}>Share your thoughts with us here</Text>
                    <InputComment />
                </View>
            )
        } else {
            let i = 0;
            let totalComments = 3;
            while (i < totalComments && i < comments.length) {
                const comment = comments[i];
                const author = authors[comment.authorID];
                if (comments[i].id !== 'default') {
                    result.push(
                        <View style={DetailStyles.commentRow} key={i}>
                            <Image source={{ uri: author.imageURL }} style={DetailStyles.commentImage} />
                            <View style={{ paddingLeft: 8 }}>
                                <Text style={GlobalStyles.paragraph2}>{comment.text}</Text>
                                <Text
                                    style={[GlobalStyles.paragraph3, { color: Styles.GRAY }]}>- {author.fName} {author.lName} | {renderTime(comment.dateCreated)}
                                </Text>
                            </View>
                        </View>
                    )
                } else {
                    totalComments++;
                }
                i++;
            }
            return (
                <>
                    {result}
                    <Text style={[GlobalStyles.paragraph3, { marginTop: 16 }]}>View +{comments.length - 1} more comments</Text>
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
                    text: "Edit Drink Options",
                    onPress: () => navigation.navigate('DrinkOptionsScreen', { drinkID: drink.id })
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
        return null;
    } else {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <SafeAreaView style={[GlobalStyles.headerSafeArea, { alignItems: 'center', marginBottom: 40 }]} >
                    {/* Title (add the right edit button if the userID === authorID) */}
                    <View style={{ flexDirection: 'row' }}>
                        {userID === drink.authorID && <View style={{ flex: 1 }} ></View>}
                        <View style={{ width: Styles.width * .8, alignItems: 'center', textAlign: 'center' }}>
                            <Text style={GlobalStyles.titlebold1}>{drink.name}</Text>
                        </View>
                        {userID === drink.authorID &&
                            <TouchableWithoutFeedback onPress={() => handleEditDrink()}>
                                <Image source={Images.threedots} style={DetailStyles.editImage} />
                            </TouchableWithoutFeedback>
                        }
                    </View>
                    <View style={DetailStyles.shadowContainer}>
                        <View style={DetailStyles.photoContainer}>
                            <Image source={{ uri: image }} key={new Date()} style={DetailStyles.drinkImage} />
                        </View>
                    </View>

                    {drink.recipe && drink.recipe.length > 0 &&
                        <View style={CreateStyles.ingrContainerWide}>
                            <Text style={[GlobalStyles.titlebold2]}>INGREDIENTS</Text>
                            <View style={GlobalStyles.line}></View>

                            <View style={{ alignSelf: 'stretch' }}>
                                {renderRecipe()}
                            </View>
                        </View>
                    }

                    {drink.instructions && drink.instructions.length > 0 &&
                        <View style={[CreateStyles.ingrContainerWide, { alignItems: 'flex-start' }]}>
                            <Text style={[GlobalStyles.titlebold2, { alignSelf: 'center' }]}>DIRECTIONS</Text>
                            <View style={[GlobalStyles.line, { marginBottom: 8 }]}></View>
                            <FlatList
                                data={drink.instructions}
                                keyExtractor={(_, x) => '' + x}
                                renderItem={({ item }) => <Text style={[GlobalStyles.paragraph2, { marginBottom: 4 }]}>•  {item}</Text>}
                            />

                        </View>
                    }

                    {drink.description.length > 0 &&
                        <View style={CreateStyles.ingrContainerWide}>
                            <Text style={[GlobalStyles.titlebold2]}>DESCRIPTION</Text>
                            <View style={[GlobalStyles.line, { marginBottom: 8 }]}></View>
                            <Text style={[GlobalStyles.paragraph2, { lineHeight: 22 }]}>{drink.description}</Text>
                        </View>
                    }

                    <StrengthAndPrep strength={drink.strength} prepTime={drink.prepTime} />

                    {drink.commentsAllowed &&
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('CommentsScreen', { drink: drink })}>
                            <View style={CreateStyles.ingrContainerWide}>
                                <Text style={[GlobalStyles.titlebold2]}>COMMENTS</Text>
                                <View style={[GlobalStyles.line, { marginBottom: 8 }]}></View>
                                {renderComments()}
                            </View>
                        </TouchableWithoutFeedback>
                    }

                    <DetailLikeCommentShare navigation={navigation} drink={drink} numComments={comments.length} />

                </SafeAreaView>
            </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const authorID = ownProps.route.params.drink.authorID;
    const profiles = state.firestore.data.profiles;
    const profile = profiles ? profiles[authorID] : null;

    const drinks = state.firestore.data.drinks;
    const drink = drinks ? drinks[ownProps.route.params.drink.id] : null

    return {
        author: profile,
        comments: state.firestore.ordered['allComments'],
        authors: state.firestore.data.profiles,
        userID: state.firebase.auth.uid,
        drink: drink
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
        { collection: 'drinks' },
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

