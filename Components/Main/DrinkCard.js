import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View, Image, Text } from 'react-native';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import DetailStyles from '../../Styles/DetailStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import GlobalStyles from '../../Styles/GlobalStyles';

const DrinkCard = ({ drink, navigation, navigateTo }) => {
    const [cached, setCached] = useState(false);
    useEffect(() => {
        if (!cached) {
            cacheImages(drink.imageURL, drink.id);
        }
        setCached(true);
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate(navigateTo, { drink: drink })}>
            <View style={DetailStyles.shadowContainer}>
                <View style={DiscoverStyles.cardContainer}>
                    <Image source={{ uri: getCachedImage(drink.id) || drink.imageURL }} style={DiscoverStyles.drinkImg} />
                    <Text style={[GlobalStyles.paragraphbold3, { paddingBottom: 8, paddingTop: 8, paddingHorizontal: 8, textAlign: 'center' }]}>{drink.name}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default DrinkCard;