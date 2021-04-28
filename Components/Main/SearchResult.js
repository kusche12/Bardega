import React from 'react';
import { View, Image, Text, Vibration, Alert, TouchableHighlight } from 'react-native';
import { getCachedImage } from '../../Functions/cacheFunctions';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

// TODO: Implement the delete item from collection in react-redux-firebase 
const SearchResult = ({ drink, navigation, removable }) => {
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

    const handleRemove = () => {
        Vibration.vibrate([0, 500]);
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
                    <Text style={GlobalStyles.paragraphbold1}>{drink.name}</Text>
                    <Text style={GlobalStyles.paragraph3}>{drink.strength.label}</Text>
                    {renderTags()}
                </View>
            </View>
        </TouchableHighlight>
    )
}

export default SearchResult;