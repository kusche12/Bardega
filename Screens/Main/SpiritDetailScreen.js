import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import InputComment from '../../Components/DrinkDetail/InputComment';
import Ratings from '../../Components/Spirit/Ratings';
import { renderTime } from '../../Functions/miscFunctions';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import DetailStyles from '../../Styles/DetailStyles';
import Styles from '../../Styles/StyleConstants';

const SpiritDetailScreen = ({ navigation, drink, comments, authors, userID }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState(null);

    // Load the component after all props are set
    useEffect(() => {
        if (authors && comments && drink) {
            cacheImages(drink.imageURL, drink.id);
            const imgTemp = getCachedImage(drink.id) || drink.imageURL;
            setImage(imgTemp);
            setIsLoading(false);
        }
    }, [authors, comments, drink]);

    const renderComments = () => {
        let result = [];
        console.log(comments.length)
        if (comments.length <= 1) {
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
                    <View style={{ width: Styles.width * .8, alignItems: 'center', textAlign: 'center' }}>
                        <Text style={GlobalStyles.titlebold1}>{drink.name}</Text>
                    </View>
                    <View style={DetailStyles.shadowContainer}>
                        <View style={DetailStyles.photoContainer}>
                            <Image source={{ uri: image }} key={new Date()} style={DetailStyles.drinkImage} />
                        </View>
                    </View>

                    {drink.description.length > 0 &&
                        <View style={CreateStyles.ingrContainerWide}>
                            <Text style={[GlobalStyles.titlebold2]}>DESCRIPTION</Text>
                            <View style={[GlobalStyles.line, { marginBottom: 8 }]}></View>
                            <Text style={[GlobalStyles.paragraph2, { lineHeight: 22 }]}>{drink.description}</Text>
                        </View>
                    }

                    <Ratings drink={drink} />

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('CommentsScreen', { drink: drink, user: authors[userID] })}>
                        <View style={CreateStyles.ingrContainerWide}>
                            <Text style={[GlobalStyles.titlebold2]}>COMMENTS</Text>
                            <View style={[GlobalStyles.line, { marginBottom: 8 }]}></View>
                            {renderComments()}
                        </View>
                    </TouchableWithoutFeedback>
                </SafeAreaView>
            </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const profiles = state.firestore.data.profiles;

    const drinks = state.firestore.data.spirits;
    const drink = drinks ? drinks[ownProps.route.params.drink.id] : null

    return {
        comments: state.firestore.ordered['allComments'],
        authors: profiles,
        userID: state.firebase.auth.uid,
        drink: drink
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        { collection: 'profiles' },
        { collection: 'spirits' },
        {
            collection: "comments",
            doc: props.route.params.drink.commentID,
            storeAs: 'allComments',
            subcollections: [{
                collection: "allComments"
            }
            ]
        }])
)(SpiritDetailScreen);

