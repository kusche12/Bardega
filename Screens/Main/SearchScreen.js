import React, { useState, useEffect } from 'react';
import { View, FlatList, Platform, Text } from 'react-native';
import SearchResult from '../../Components/Main/SearchResult';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const SearchScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);

    useEffect(() => {
        console.log(route.params.results);
        if (route.params.results) {
            setItems(route.params.results);
            setIsLoading(false);
        }
    }, [route]);

    const renderContent = () => {
        if (items.length === 0) {
            return (
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: Styles.height * .6 }}>
                    <Text style={GlobalStyles.paragraphbold2}>Welcome to the search screen</Text>
                    <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY }]}>Search for drinks, users, tags, or spirits.</Text>
                </View>
            )
        } else {
            return (
                <FlatList
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={(item, idx) => '' + idx}
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