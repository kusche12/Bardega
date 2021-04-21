import React, { useState, useEffect } from 'react';
import { FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from '../../Components/Main/Loading';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';

const FavoritesScreen = ({ route, navigation, drinks }) => {
    const { favorites } = route.params;

    const [isLoading, setIsLoading] = useState(true);

    // Only get all the drink images after the user and drinks are loaded to the DB
    useEffect(() => {
        if (drinks && favorites) {
            setIsLoading(false);
        }
    }, [drinks]);

    const renderBox = ({ item }) => {
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

    const renderBoxImages = (items) => {
        if (items.length < 3) {
            const image1 = drinks[items[0].id];
            cacheImages(image1.imageURL, image1.id);
            return (
                <View style={UserStyles.favoriteImagesContainer}>
                    <Image source={{ uri: getCachedImage(image1.id) }} style={UserStyles.faveImage1} />
                </View>
            );
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
                <SafeAreaView style={[GlobalStyles.headerSafeArea, UserStyles.container]} >
                    <View style={DiscoverStyles.titleContainer}>
                        <Text style={DiscoverStyles.title}>FAVORITES</Text>
                    </View>



                    <View style={UserStyles.favoritesContainer}>
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
        drinks: state.firestore.data.drinks,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['drinks'])
)(FavoritesScreen);