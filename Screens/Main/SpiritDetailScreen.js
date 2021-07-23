import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { deleteSpirit } from '../../Store/Actions/SpiritActions';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import Images from '../../Images/Images';
import { ADMIN_ID } from '../../API/ADMIN_ID';
import InputComment from '../../Components/DrinkDetail/InputComment';
import Ratings from '../../Components/Spirit/Ratings';
import { renderTime } from '../../Functions/miscFunctions';
import { Placeholder, PlaceholderMedia, Loader } from 'rn-placeholder';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import DetailStyles from '../../Styles/DetailStyles';
import Styles from '../../Styles/StyleConstants';

const SpiritDetailScreen = ({ navigation, drink, comments, authors, userID, deleteSpirit }) => {
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

    const renderFeatureRow = (type, name) => {
        return (
            <View style={DetailStyles.row}>
                <View style={[DetailStyles.col1, { width: Styles.width * .5 }]}>
                    <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY }]}>{type}</Text>
                </View>
                <View style={DetailStyles.col2}>
                    <Text style={GlobalStyles.paragraph2}>{name}</Text>
                </View>
            </View>
        )
    }

    const renderFeatures = () => {
        return (
            <View style={CreateStyles.ingrContainerWide}>
                <Text style={[GlobalStyles.titlebold2]}>FEATURES</Text>
                <View style={[GlobalStyles.line, { marginBottom: 8 }]}></View>
                <View style={{ flexDirection: 'column' }}>
                    {renderFeatureRow('Spirit', drink.spirit)}
                    {renderFeatureRow('Used For', drink.drinkability)}
                    {renderFeatureRow('Availability', drink.availability)}
                    {renderFeatureRow('Price', drink.price)}
                </View>
            </View>
        )
    }

    const handleDeleteSpirit = () => {
        return Alert.alert(
            "Delete Spirit?",
            "Once you delete this spirit, you will no longer be able to recover it.",
            [
                {
                    text: 'Yes, delete this spirit',
                    onPress: () => handleDeleteSpiritHelper(),
                    style: "destructive"
                },
                {
                    text: "Cancel",
                    onPress: () => console.log('action cancelled'),
                }
            ],
            { cancelable: true }
        );
    }

    const handleDeleteSpiritHelper = async () => {
        await navigation.navigate('SpiritScreen');
        deleteSpirit(drink);
    }

    if (isLoading) {
        return (
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { alignItems: 'center', marginBottom: 40 }]} >
                <View style={{ width: Styles.width * .8, alignItems: 'center', textAlign: 'center' }}>
                    <Text style={GlobalStyles.titlebold1}>{drink.name}</Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                    <Placeholder Animation={Loader}>
                        <PlaceholderMedia style={[DetailStyles.photoContainer, { alignSelf: 'center' }]} />
                    </Placeholder>

                    <Placeholder Animation={Loader}>
                        <PlaceholderMedia style={[DetailStyles.photoContainer, { alignSelf: 'center', width: Styles.width * .95 }]} />
                    </Placeholder>
                </View>
            </SafeAreaView>
        )
    } else {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <SafeAreaView style={[GlobalStyles.headerSafeArea, { alignItems: 'center', marginBottom: 40 }]} >
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 3, justifyContent: 'center' }}>
                            <Text style={[GlobalStyles.titlebold1, { textAlign: 'center' }]}>{drink.name}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            {userID === ADMIN_ID &&
                                <TouchableWithoutFeedback style={{ width: 40, height: 40 }} onPress={() => handleDeleteSpirit()}>
                                    <Image source={Images.settings.trash} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                </TouchableWithoutFeedback>
                            }
                        </View>
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

                    {renderFeatures()}

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

const mapDispatchToProps = (dispatch) => {
    return {
        deleteSpirit: (data) => dispatch(deleteSpirit(data)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
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

