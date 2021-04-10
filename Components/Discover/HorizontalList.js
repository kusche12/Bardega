import React from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, Image, SafeAreaView } from 'react-native';
import DetailStyles from '../../Styles/DetailStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';

const HorizontalList = ({ data, query, navigation }) => {
    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('DrinkDetailScreen', { drink: item, prev: 'DiscoverDetail' })}>
                <View style={DetailStyles.shadowContainer}>
                    <View style={DiscoverStyles.cardContainer}>
                        <Image source={{ uri: item.imageURL }} style={DiscoverStyles.drinkImg} />
                        <Text style={DiscoverStyles.cardTitle}>{item.name}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
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