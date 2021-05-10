import React, { useEffect } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';
import { getCachedImage, cacheImages } from '../../Functions/cacheFunctions';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

// TODO: Figure out what the yellow error is happening here
const SearchResult = ({ drink, navigation, removable }) => {
    useEffect(() => {
        cacheImages(drink.id, drink.imageURL)
    }, [drink]);

    const renderTags = () => {
        let res = '';
        if (drink.tags) {
            for (let i = 0; i < drink.tags.length; i++) {
                res += drink.tags[i].name + ', '
            };
            res = res.substr(0, res.length - 2);
            return <Text style={[GlobalStyles.paragraph3, { color: Styles.GRAY }]}>{res}</Text>
        }
        return null;
    }

    return (
        <TouchableHighlight
            onLongPress={() => removable && handleRemove()}
            onPress={() => navigation.navigate('DrinkDetailScreen', { drink: drink })}
            underlayColor={'#d6d6d6'}
        >
            <View style={DiscoverStyles.searchContainer}>
                <Image source={{ uri: getCachedImage(drink.id) || drink.imageURL }} style={DiscoverStyles.searchImage} />
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={GlobalStyles.paragraphbold1}>{drink.name}</Text>
                    <Text style={GlobalStyles.paragraph3}>{drink.strength.label}</Text>
                    {renderTags()}
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default SearchResult;