import React, { useEffect } from 'react';
import { FlatList, Text, SafeAreaView, View } from 'react-native';
import SearchResult from '../../Components/Main/SearchResult';
import GlobalStyles from '../../Styles/GlobalStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';

const DrinkListScreen = ({ route, navigation }) => {
    const { drinks, collection, drinkType } = route.params;

    useEffect(() => {
        if (route.params) {
            navigation.setParams({ collection: collection })
        }
    }, []);

    const renderItem = ({ item }) => {
        return <SearchResult navigation={navigation} item={item} drinkType={drinkType} />
    }

    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <View style={DiscoverStyles.searchHeader}>
                <Text style={GlobalStyles.titlebold1}>{collection.name}</Text>
            </View>
            <View style={GlobalStyles.line}></View>
            <FlatList
                data={drinks}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}

export default DrinkListScreen;