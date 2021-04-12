import React, { useState, useEffect } from 'react';
import { FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from '../../Components/Main/Loading';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
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
            return (
                <View style={UserStyles.favoriteImagesContainer}>
                    <Image source={{ uri: drinks[items[0].id].imageURL }} style={UserStyles.faveImage1} />
                </View>
            );
        } else {
            const image1 = drinks[items[0].id].imageURL;
            const image2 = drinks[items[1].id].imageURL;
            const image3 = drinks[items[2].id].imageURL;
            return (
                <View style={UserStyles.favoriteImagesContainer}>
                    <View style={UserStyles.favoriteRow}>
                        <Image source={{ uri: image1 }} style={UserStyles.faveImage2} />
                        <Image source={{ uri: image2 }} style={UserStyles.faveImage2} />
                    </View>
                    <View style={{ overflow: 'hidden' }}>
                        <Image source={{ uri: image3 }} style={UserStyles.faveImage3} />
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

        await navigation.navigate('DrinkListScreen', { drinks: fullDrinks, collection: item });
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