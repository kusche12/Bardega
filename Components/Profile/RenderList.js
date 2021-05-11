import React from 'react';
import { View, FlatList, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { getCachedImage } from '../../Functions/cacheFunctions';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants';

const renderList = ({ item, index, navigation, ownProfile, user }) => {

    // Renders a drink image that, when clicked, routes to the drink detail page
    const renderDrink = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('DrinkDetailScreen', { drink: item, fromScreen: 'Profile' })}>
                <View style={UserStyles.drinkContainer}>
                    <Image source={{ uri: getCachedImage(item.id) || item.imageURL }} style={UserStyles.drinkImage} />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    if (index === 0) {
        return (
            <View style={{ width: Styles.width }}>
                <FlatList
                    data={item}
                    renderItem={renderDrink}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    scrollEnabled={false}
                    horizontal={false}
                />
            </View>
        )
    } else {
        if (ownProfile || !user.likedDrinksPrivate) {
            return (
                <View style={{ width: Styles.width }}>
                    <FlatList
                        data={item}
                        renderItem={renderDrink}
                        keyExtractor={item => item.id}
                        numColumns={3}
                        scrollEnabled={false}
                        horizontal={false}
                    />
                </View>
            )
        } else {
            return (
                <View style={{ width: Styles.width, flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={[GlobalStyles.paragraphbold2, { marginTop: 48, marginBottom: 8 }]}>The user's liked drinks are private</Text>
                    <Text style={[GlobalStyles.paragraph3, { color: Styles.GRAY }]}>Drinks liked by {user.userName} are currently hidden</Text>
                </View>
            )
        }
    }
}

export default renderList;