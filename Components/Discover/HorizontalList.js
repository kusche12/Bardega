import React from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback, Image, SafeAreaView } from 'react-native';
import DiscoverStyles from '../../Styles/DiscoverStyles';

const HorizontalList = ({ data, query, navigation }) => {
    const renderItem = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('DrinkDetailScreen', { drink: item })}>
                {/* <TouchableWithoutFeedback onPress={() => console.log(item)}> */}
                <View style={DiscoverStyles.cardContainer}>
                    <Image source={require('./tempDrink.png')} style={DiscoverStyles.drinkImg} />
                    <Text style={DiscoverStyles.cardTitle}>{item.name}</Text>
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
            />
        </View>
    )
}

export default HorizontalList;