import React, { useEffect } from 'react';
import { View, Image, Text, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { getCachedImage, cacheImages } from '../../Functions/cacheFunctions';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

// This is a horizontal list item that either includes a drink object or a user object based
// on the passed in item
const SearchResult = ({ item, navigation, userID }) => {
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
                let tag = item.tags[i].name;
                res += tag.charAt(0).toUpperCase() + tag.slice(1) + ', '
            };
            res = res.substr(0, res.length - 2);
            return <Text style={[GlobalStyles.paragraph3, { color: Styles.GRAY }]}>{res}</Text>
        }
        return null;
    }

    // If the search result is the current user's account, then change the tab navigator to their profile navigation
    // If not, then stay in the current Search tab navigator
    const handleProfileNavigation = () => {
        // if (item.id === userID) {
        //     navigation.navigate('Profile', { screen: 'ProfileScreen', user: item });
        // } else {
        //     navigation.navigate('ProfileScreen', { user: item })
        // }
        navigation.navigate('Profile');
        navigation.push('ProfileScreen', { user: item, ownProfile: item.id === userID });
    }

    // If the item is either a drink (symbolized by authorID) or a spirit (symbolized by numRatings)
    if (item.authorID || item.numRatings) {
        return (
            <TouchableWithoutFeedback
                underlayColor={Styles.UNDERLAY}
                onPress={() =>
                    item.rateID
                        ? navigation.navigate('SpiritDetailScreen', { drink: item })
                        : navigation.navigate('DrinkDetailScreen', { drink: item })
                }>
                <View style={DiscoverStyles.searchContainer}>
                    <Image source={{ uri: getCachedImage(item.id) || item.imageURL }} style={DiscoverStyles.searchImage} />
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Text style={GlobalStyles.paragraphbold1}>{item.name}</Text>
                        {item.strength
                            ? <Text style={GlobalStyles.paragraph3}>{item.strength.label}</Text>
                            : <Text style={GlobalStyles.paragraph3}>{item.drinkability}</Text>
                        }
                        {renderTags()}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    } else {
        return (
            <TouchableHighlight
                onPress={() => handleProfileNavigation()}
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

const mapStateToProps = (state) => {
    return {
        userID: state.firebase.auth.uid,
    }

}

export default connect(mapStateToProps)(SearchResult);