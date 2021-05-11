import React from 'react';
import { View, FlatList, Platform } from 'react-native';
import SearchResult from '../../Components/Main/SearchResult';
import Styles from '../../Styles/StyleConstants';

const SearchScreen = ({ route, navigation }) => {
    const items = route.params.results;

    const renderItem = ({ item }) => {
        return <SearchResult navigation={navigation} item={item} removable={false} />
    }

    return (
        <View>
            {Platform.OS === 'ios' &&
                <View style={{ width: Styles.width, height: 10, backgroundColor: Styles.PINK }}></View>
            }
            <FlatList
                data={items}
                renderItem={renderItem}
            />
        </View>
    );
}

export default SearchScreen;