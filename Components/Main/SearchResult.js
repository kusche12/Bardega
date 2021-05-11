import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableHighlight, ActivityIndicator } from 'react-native';
import { getCachedImage, cacheImages } from '../../Functions/cacheFunctions';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

// This is a horizontal list item that either includes a drink object or a user object based
// on the passed in item
const SearchResult = ({ item, navigation, removable }) => {


    // Only cache the drink images
    useEffect(() => {
        if (item) {
            cacheImages(item.imageURL, item.id);
        }
    }, [item]);

    const renderTags = () => {
        let res = '';
        if (item.tags) {
            for (let i = 0; i < item.tags.length; i++) {
                res += item.tags[i].name + ', '
            };
            res = res.substr(0, res.length - 2);
            return <Text style={[GlobalStyles.paragraph3, { color: Styles.GRAY }]}>{res}</Text>
        }
        return null;
    }

    if (item.authorID) {
        return (
            <TouchableHighlight
                onLongPress={() => removable && handleRemove()}
                onPress={() => navigation.navigate('DrinkDetailScreen', { drink: item })}
                underlayColor={'#d6d6d6'}
            >
                <View style={DiscoverStyles.searchContainer}>
                    <Image source={{ uri: getCachedImage(item.id) || item.imageURL }} style={DiscoverStyles.searchImage} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={GlobalStyles.paragraphbold1}>{item.name}</Text>
                        <Text style={GlobalStyles.paragraph3}>{item.strength.label}</Text>
                        {renderTags()}
                    </View>
                </View>
            </TouchableHighlight>
        )
    } else {
        return (
            <TouchableHighlight
                onPress={() => navigation.navigate('ProfileScreen', { user: item })}
                underlayColor={'#d6d6d6'}
            >
                <View style={DiscoverStyles.searchContainer}>
                    <Image source={{ uri: getCachedImage(item.id) || item.imageURL }} style={[DiscoverStyles.searchImage, DiscoverStyles.searchImageProfile]} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={GlobalStyles.paragraphbold1}>{item.fName} {item.lName}</Text>
                        <Text style={GlobalStyles.paragraph3}>{item.userName}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

}

export default SearchResult;