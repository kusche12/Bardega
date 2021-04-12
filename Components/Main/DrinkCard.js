import React from 'react';
import { TouchableWithoutFeedback, View, Image, Text } from 'react-native';
import DetailStyles from '../../Styles/DetailStyles'
import DiscoverStyles from '../../Styles/DiscoverStyles'

const DrinkCard = ({ drink, navigation, prev }) => {
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('DrinkDetailScreen', { drink: drink, prev: prev })}>
            <View style={DetailStyles.shadowContainer}>
                <View style={DiscoverStyles.cardContainer}>
                    <Image source={{ uri: drink.imageURL }} style={DiscoverStyles.drinkImg} />
                    <Text style={DiscoverStyles.cardTitle}>{drink.name}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default DrinkCard;