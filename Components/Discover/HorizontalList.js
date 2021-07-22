import React from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import DrinkCard from '../Main/DrinkCard';
import GlobalStyles from '../../Styles/GlobalStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';

const HorizontalList = ({ data, query, navigation, navigateTo, drinkType, isRefreshing }) => {
    const renderItem = ({ item }) => {
        return (
            <DrinkCard isRefreshing={isRefreshing} drink={item} navigation={navigation} navigateTo={navigateTo} />
        )

    }

    return (
        <View style={DiscoverStyles.horizontalContainer}>
            <View style={DiscoverStyles.horizRow}>
                <Text style={GlobalStyles.titlebold2}>{query.name}</Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('DrinkListScreen', { query: query, drinkType: drinkType })}>
                    <Text style={GlobalStyles.titlebold3}>See more</Text>
                </TouchableWithoutFeedback>

            </View>
            <FlatList
                horizontal={true}
                data={data}
                keyExtractor={(item, index) => '' + index}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}


// Connect the drink detail page to our redux store and firestore DB
export default HorizontalList;