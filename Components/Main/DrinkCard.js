import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View, Image, Text } from 'react-native';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import DetailStyles from '../../Styles/DetailStyles'
import DiscoverStyles from '../../Styles/DiscoverStyles'

const DrinkCard = ({ drink, navigation }) => {
    const [cached, setCached] = useState(false);
    useEffect(() => {
        if (!cached) {
            cacheImages(drink.imageURL, drink.id);
        }
        setCached(true);
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('DrinkDetailScreen', { drink: drink })}>
            <View style={DetailStyles.shadowContainer}>
                <View style={DiscoverStyles.cardContainer}>
                    <Image source={{ uri: getCachedImage(drink.id) || drink.imageURL }} style={DiscoverStyles.drinkImg} />
                    <Text style={DiscoverStyles.cardTitle}>{drink.name}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default DrinkCard;