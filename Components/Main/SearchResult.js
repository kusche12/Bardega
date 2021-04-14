import React from 'react';
import { View, Image, Text, Vibration, Alert, TouchableHighlight } from 'react-native';
import { getCachedImage, cacheImages } from '../../Functions/cacheFunctions';
import DiscoverStyles from '../../Styles/DiscoverStyles';


// TODO: Implement the delete item from collection in react-redux-firebase 
const SearchResult = ({ drink, navigation, removable }) => {
    const renderTags = () => {
        let res = '';
        for (let i = 0; i < drink.tags.length; i++) {
            res += drink.tags[i] + ', '
        };
        res = res.substr(0, res.length - 2);
        return <Text style={{ fontWeight: '300' }}>{res}</Text>
    }

    const handleRemove = () => {
        Vibration.vibrate([0, 100]);
        return Alert.alert(
            "Remove from collection?",
            "If you delete this from your collection, the drink will still be saved in the app.",
            [
                {
                    text: "Remove",
                    onPress: () => console.log('DELETE FROM COLLECTION'),
                    style: "destructive"
                },
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                },
            ],
            { cancelable: true }
        );
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
                    <Text style={{ fontWeight: '700' }}>{drink.name}</Text>
                    {renderTags()}
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default SearchResult;