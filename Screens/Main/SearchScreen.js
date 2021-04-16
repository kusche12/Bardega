import React from 'react';
import { Text, Dimensions, View, FlatList, Platform } from 'react-native';
import SearchResult from '../../Components/Main/SearchResult';
import GlobalStyles from '../../Styles/GlobalStyles';

const width = Dimensions.get('screen').width;
const LIGHTPINK = '#F7D2CF';

const SearchScreen = ({ route, navigation }) => {
    const drinks = route.params.results;

    const renderItem = ({ item }) => {
        return <SearchResult navigation={navigation} drink={item} removable={false} />
    }

    return (
        <View>
            {Platform.OS === 'ios' &&
                <View style={{ width: width, height: 10, backgroundColor: LIGHTPINK }}></View>
            }
            <FlatList
                data={drinks}
                renderItem={renderItem}
            />
        </View>
    );
}

export default SearchScreen;