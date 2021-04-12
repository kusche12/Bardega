import React from 'react';
import { View, Text, FlatList } from 'react-native';
import DrinkCard from '../Main/DrinkCard';
import DiscoverStyles from '../../Styles/DiscoverStyles';

const HorizontalList = ({ data, query, navigation }) => {
    const renderItem = ({ item }) => {
        return (
            <DrinkCard drink={item} navigation={navigation} prev={'Discover'} />
        )
    }

    return (
        <View style={DiscoverStyles.horizontalContainer}>
            <Text style={DiscoverStyles.queryTitle}>{query}</Text>
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

export default HorizontalList;