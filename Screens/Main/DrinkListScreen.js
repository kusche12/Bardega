import React, { useEffect } from 'react';
import { FlatList, Text, SafeAreaView, View } from 'react-native';
import SearchResult from '../../Components/Main/SearchResult';
import GlobalStyles from '../../Styles/GlobalStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';

const DrinkListScreen = ({ route, navigation }) => {
    const { drinks, collection } = route.params;

    useEffect(() => {
        if (route.params) {
            navigation.setParams({ collection: collection })
        }
    }, [])

    const renderItem = ({ item }) => {
        return <SearchResult navigation={navigation} drink={item} removable={true} />
    }

    return (
        <SafeAreaView style={[GlobalStyles.headerSafeArea]} >
            <View style={DiscoverStyles.searchHeader}>
                <Text style={DiscoverStyles.title}>{collection.name}</Text>
            </View>
            <View style={[GlobalStyles.line, { color: '#a1a1a1' }]}></View>
            <FlatList
                data={drinks}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}

export default DrinkListScreen;