import React, { useState, useEffect } from 'react';
import { FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from '../../Components/Main/Loading';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import { removeDrinkFromArray } from '../../Store/Actions/DrinkActions';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';

const FavoritesScreen = ({ route, navigation, drinks, removeDrinkFromArray }) => {
    const { favorites } = route.params;

    const [isLoading, setIsLoading] = useState(true);

    // Only get all the drink images after the user and drinks are loaded to the DB
    useEffect(() => {
        if (drinks && favorites) {
            setIsLoading(false);
        }
    }, [drinks]);

    const renderBox = ({ item }) => {
        if (item.length > 1) {
            return (
                <View style={UserStyles.favoritesBox}>
                    <TouchableWithoutFeedback onPress={() => getDrinkDataAndNavigate(item)}>
                        <View>
                            {renderBoxImages(item.drinks)}
                            <Text style={UserStyles.favoritesTitle}>{item.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            )
        }
    }

    // Render 1 image if there are less than 3 drinks in favorites bucket
    // Otherwise, render 3 images
    const renderBoxImages = (items) => {
        if (items.length < 3) {
            let drinkImageID;
            for (let i = 0; i < items.length; i++) {
                if (getDrinkImageOrDeleteDrink(items[i].id)) {
                    drinkImageID = items[i].id;
                    break;
                }
            }

            // If there are no drinks in this collection, do not render any images
            if (drinkImageID) {
                return (
                    <View style={UserStyles.favoriteImagesContainer}>
                        <Image source={{ uri: getCachedImage(drinkImageID) }} style={UserStyles.faveImage1} />
                    </View>
                );
            }
        } else {
            const image1 = drinks[items[0].id];
            const image2 = drinks[items[1].id];
            const image3 = drinks[items[2].id];
            cacheImages(image1.imageURL, image1.id);
            cacheImages(image2.imageURL, image2.id);
            cacheImages(image3.imageURL, image3.id);
            return (
                <View style={UserStyles.favoriteImagesContainer}>
                    <View style={UserStyles.favoriteRow}>
                        <Image source={{ uri: getCachedImage(image1.id) }} style={UserStyles.faveImage2} />
                        <Image source={{ uri: getCachedImage(image2.id) }} style={UserStyles.faveImage2} />
                    </View>
                    <View style={{ overflow: 'hidden' }}>
                        <Image source={{ uri: getCachedImage(image3.id) }} style={UserStyles.faveImage3} />
                    </View>
                </View>
            );
        }
    }

    // This function returns the drink's image for the favorites bucket OR
    // If the drink has no corresponding drink ID in the database
    // Deletes the drink from the user's favorites array
    const getDrinkImageOrDeleteDrink = async (id) => {
        const drink = drinks[id];
        if (!drink) {
            await removeDrinkFromArray({ authorID: userID, drinkID: drink.id });
        } else {
            cacheImages(drink.imageURL, drink.id);
            return drink.id;
        }
    }

    const getDrinkDataAndNavigate = async (item) => {
        let fullDrinks = [];
        for (let i = 0; i < item.drinks.length; i++) {
            const drink = await drinks[item.drinks[i].id]
            fullDrinks.push(drink);
        }

        await navigation.navigate('DrinkListScreen', { drinks: fullDrinks, collection: item, removable: true });
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
                <SafeAreaView style={[GlobalStyles.headerSafeArea, { alignItems: 'center' }]} >
                    <View style={DiscoverStyles.titleContainer}>
                        <Text style={GlobalStyles.title1}>FAVORITES</Text>
                    </View>

                    <View style={UserStyles.allDrinksContainer}>
                        <FlatList
                            data={favorites}
                            renderItem={renderBox}
                            keyExtractor={item => item.dateCreated}
                            numColumns={2}
                            scrollEnabled={false}
                            horizontal={false}
                        />
                    </View>

                </SafeAreaView>
            </KeyboardAwareScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userID: state.firebase.auth.uid,
        drinks: state.firestore.data.drinks,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeDrinkFromArray: (data) => dispatch(removeDrinkFromArray(data)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(() => ['drinks'])
)(FavoritesScreen);