import React from 'react';
import { FlatList, Text, SafeAreaView, View, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SearchResult from '../../Components/Main/SearchResult';
import GlobalStyles from '../../Styles/GlobalStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import CreateStyles from '../../Styles/CreateStyles';
const width = Dimensions.get('screen').width;

const DrinkListScreen = ({ route, navigation }) => {
    const { drinks, name } = route.params;

    const renderItem = ({ item }) => {
        return <SearchResult navigation={navigation} drink={item} />
    }

    return (
        <SafeAreaView style={[GlobalStyles.headerSafeArea]} >
            <View style={DiscoverStyles.searchHeader}>
                <Text style={DiscoverStyles.title}>Results for {name}</Text>
            </View>
            {/* <View style={[GlobalStyles.line, { width: width, alignSelf: 'center' }]}></View> */}
            <FlatList
                data={drinks}
                renderItem={renderItem}
            />
        </SafeAreaView>
    )
}

export default DrinkListScreen;