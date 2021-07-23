import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View, Image, Text } from 'react-native';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import { Placeholder, PlaceholderMedia, Fade } from 'rn-placeholder';
import DetailStyles from '../../Styles/DetailStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import GlobalStyles from '../../Styles/GlobalStyles';

const DrinkCard = ({ drink, navigation, navigateTo, isRefreshing }) => {
    const [cached, setCached] = useState(false);
    useEffect(() => {
        if (!cached) {
            cacheImages(drink.imageURL, drink.id);
        }
        setCached(true);
    }, []);

    const renderText = () => {
        let text = drink.name;
        if (text.length > 28) {
            text = text.substring(0, 26) + '...';
        }
        return <Text style={[GlobalStyles.paragraphbold3, { paddingBottom: 8, paddingTop: 8, paddingHorizontal: 8, textAlign: 'center' }]}>{text}</Text>
    }

    if (isRefreshing) {
        return (
            <Placeholder Animation={Fade} width={155}>
                <View style={[DetailStyles.shadowContainer]}>
                    <View style={[DiscoverStyles.cardContainer]}>
                        <PlaceholderMedia style={[DiscoverStyles.drinkImg]} />
                    </View>
                </View>
            </Placeholder>
        )
    } else {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate(navigateTo, { drink: drink })}>
                <View style={DetailStyles.shadowContainer}>
                    <View style={DiscoverStyles.cardContainer}>
                        <>
                            <Image source={{ uri: getCachedImage(drink.id) || drink.imageURL }} style={DiscoverStyles.drinkImg} />
                            {renderText()}
                        </>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }

}

export default DrinkCard;