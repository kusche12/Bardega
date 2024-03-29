import React, { useState, useEffect } from 'react';
import { View, FlatList, Platform, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import SearchResult from '../../Components/Main/SearchResult';
import { useScrollToTop } from '@react-navigation/native';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const SearchScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const ref = React.useRef(null);
    useScrollToTop(ref);

    useEffect(() => {
        if (route.params.results) {
            setItems(route.params.results);
            setIsLoading(false);
        }
    }, [route]);

    const renderContent = () => {
        if (!route.params.query && items.length === 0) {
            return (
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: Styles.height * .6 }}>
                    <TouchableOpacity
                        style={{ backgroundColor: Styles.DARK_PINK, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 6, position: 'absolute', top: 10 }}
                        onPress={() => navigation.navigate('DrinkListScreen', { query: { filterType: 'all', filterName: null, name: 'All Cocktails' }, drinkType: 'Drink' })}
                    >
                        <Text style={[GlobalStyles.paragraphbold3, { color: 'white' }]}>All Cocktails</Text>
                    </TouchableOpacity>
                    <Text style={GlobalStyles.paragraphbold2}>Welcome to the search screen</Text>
                    <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY }]}>Search for drinks, users, tags, or spirits.</Text>
                </View>
            )
        } else if (route.params.isLoading) {
            return (
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: Styles.height * .6 }}>
                    <ActivityIndicator />
                </View>
            )
        } else if (route.params.query && items.length === 0) {
            console.log('NO RESULTS FOUND')
            return (
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: Styles.height * .6 }}>
                    <Text style={GlobalStyles.paragraphbold2}>No results found for search '{route.params.query}'</Text>
                </View>
            )
        } else {
            return (
                <FlatList
                    ref={ref}
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={(item, idx) => '' + idx}
                    contentContainerStyle={{ paddingBottom: 30 }}
                />
            )
        }
    }

    const renderItem = ({ item }) => {
        return <SearchResult navigation={navigation} item={item} />
    }

    if (isLoading) {
        return null;
    }
    return (
        <View>
            {Platform.OS === 'ios' &&
                <View style={{ width: Styles.width, height: 10, backgroundColor: Styles.PINK }}></View>
            }
            {renderContent()}
        </View>
    );
}

export default SearchScreen;