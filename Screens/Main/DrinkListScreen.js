import React, { useEffect } from 'react';
import { FlatList, Text, SafeAreaView, View } from 'react-native';
import SearchResult from '../../Components/Main/SearchResult';
import GlobalStyles from '../../Styles/GlobalStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';

// TODO: Incorporate lazy loading so that not all drinks are loaded in at once. 
// When the user reaches the bottom of the list, it should make an API call to get more data
// https://stackoverflow.com/questions/49648292/how-to-apply-lazy-loading-in-flatlist-in-react-native
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
        <SafeAreaView style={[GlobalStyles.headerSafeArea, { marginBottom: 50 }]}>
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