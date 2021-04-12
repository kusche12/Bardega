import React from 'react';
import { View, Image, TouchableWithoutFeedback, Text, LogBox } from 'react-native';
import DiscoverStyles from '../../Styles/DiscoverStyles';

// TODO: Delete me
LogBox.ignoreAllLogs()


// TODO: If search result for favorites, add a trash can that allows user to remove from favorites
// Also create an Alert message that clarifies if this is was the user really wants to do
// TODO: Do the same alert / delete when holding down the component
const SearchResult = ({ drink, navigation, removable }) => {

    const renderTags = () => {
        let res = '';
        for (let i = 0; i < drink.tags.length; i++) {
            res += drink.tags[i] + ', '
        };
        res = res.substr(0, res.length - 2);
        return <Text style={{ fontWeight: '300' }}>{res}</Text>
    }

    // If the search result is from the favorites drink list, then render a removable icon on it
    const renderRemove = () => {
        if (removable) {
            return (
                <View>

                </View>
            )
        }
        return null;
    }

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('DrinkDetailScreen', { drink: drink })}>
            <View style={DiscoverStyles.searchContainer}>
                <Image source={{ uri: drink.imageURL }} style={DiscoverStyles.searchImage} />
                <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={{ fontWeight: '700' }}>{drink.name}</Text>
                    {renderTags()}
                </View>
                {renderRemove()}
            </View>
        </TouchableWithoutFeedback>
    )
}

export default SearchResult;