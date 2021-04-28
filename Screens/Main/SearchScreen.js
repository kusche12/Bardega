import React from 'react';
import { Dimensions, View, FlatList, Platform } from 'react-native';
import SearchResult from '../../Components/Main/SearchResult';
import Styles from '../../Styles/StyleConstants';

const width = Dimensions.get('screen').width;

const SearchScreen = ({ route, navigation }) => {
    const drinks = route.params.results;

    const renderItem = ({ item }) => {
        return <SearchResult navigation={navigation} drink={item} removable={false} />
    }

    return (
        <View>
            {Platform.OS === 'ios' &&
                <View style={{ width: width, height: 10, backgroundColor: Styles.PINK }}></View>
            }
            <FlatList
                data={drinks}
                renderItem={renderItem}
            />
        </View>
    );
}

export default SearchScreen;