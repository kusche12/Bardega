import React, { useEffect, useState } from 'react';
import { FlatList, Text, SafeAreaView, View, ActivityIndicator } from 'react-native';
import SearchResult from '../../Components/Main/SearchResult';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { drinkIsPrivate } from '../../Functions/drinkFunctions';
import GlobalStyles from '../../Styles/GlobalStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import Styles from '../../Styles/StyleConstants';

const LIMIT = 6;

// Lazy loading is incorporated to load in drinks or spirits based on their specific query type
const DrinkListScreen = ({ route, navigation, drinks, spirits }) => {
    const { query, drinkType } = route.params;

    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(null);
    const [lastIndex, setLastIndex] = useState(0);
    const [documentData, setDocumentData] = useState([]);

    // Set the correct database to query for the list
    useEffect(() => {
        if (drinks && spirits) {
            retrieveData();
        }
    }, [drinks, spirits]);

    const retrieveData = async () => {
        if (drinkType === 'Drink') {
            getDrinks(lastIndex, query);
        } else {
            getSpirits(lastIndex, query);
        }
    };

    const renderItem = ({ item }) => {
        return <SearchResult navigation={navigation} item={item} drinkType={drinkType} />
    }

    const getDrinks = async (lastIndex, query) => {
        let currItems = [];
        let currIndex = lastIndex;
        let allItems = [...documentData];
        setIsRefreshing(true);

        if (query.filterType === 'tag') {
            while (currIndex < drinks.length && currItems.length < LIMIT) {
                const tags = drinks[currIndex].tags;
                if (tags) {
                    for (let j = 0; j < tags.length; j++) {
                        const tag = tags[j];
                        if (tag.name.toLowerCase() === query.filterName.toLowerCase()) {
                            const isPrivate = await drinkIsPrivate(drinks[currIndex]);
                            if (!isPrivate) {
                                currItems.push(drinks[currIndex]);
                            }
                        }
                    }
                }
                currIndex++;
            }
        } else if (query.filterType === 'prepTime') {
            while (currIndex < drinks.length && currItems.length < LIMIT) {
                const prepTime = drinks[currIndex].prepTime.value;
                if (prepTime.toLowerCase() === query.filterName.toLowerCase()) {
                    const isPrivate = await drinkIsPrivate(drinks[currIndex]);
                    if (!isPrivate) {
                        currItems.push(drinks[currIndex]);
                    }
                }
                currIndex++;
            }
        } else if (query.filterType === 'strength') {
            while (currIndex < drinks.length && currItems.length < LIMIT) {
                const strength = drinks[currIndex].strength.value;
                if (strength.toLowerCase() === query.filterName.toLowerCase()) {
                    const isPrivate = await drinkIsPrivate(drinks[currIndex]);
                    if (!isPrivate) {
                        currItems.push(drinks[currIndex]);
                    }
                }
                currIndex++;
            }
        }
        setDocumentData(allItems.concat(currItems));
        setLastIndex(currIndex);
        setIsLoading(false);
        setIsRefreshing(false);
    }

    const getSpirits = (lastIndex, query) => {
        let currItems = [];
        let currIndex = lastIndex;
        let allItems = [...documentData];
        setIsRefreshing(true);

        while (currIndex < spirits.length && currItems.length < LIMIT) {
            const spiritType = spirits[currIndex].spirit;
            if (spiritType.toLowerCase() === query.name.toLowerCase()) {
                currItems.push(spirits[currIndex]);
            }
            currIndex++;
        }

        setDocumentData(allItems.concat(currItems));
        setLastIndex(currIndex);
        setIsLoading(false);
        setIsRefreshing(false);
    }

    return (
        <SafeAreaView style={[GlobalStyles.headerSafeArea, { marginBottom: 50 }]}>
            <View style={DiscoverStyles.searchHeader}>
                <Text style={GlobalStyles.titlebold1}>{query.name}</Text>
            </View>
            <View style={GlobalStyles.line}></View>
            { isLoading
                ? <View style={{ marginTop: 20 }}>
                    <ActivityIndicator size="large" color={Styles.DARK_PINK} />
                </View>
                : <FlatList
                    data={documentData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => '' + index}
                    onEndReached={retrieveData}
                    onEndReachedThreshold={5}
                    refreshing={isRefreshing}
                    ListFooterComponent={isRefreshing &&
                        <View style={{ marginTop: 20 }} >
                            <ActivityIndicator color={Styles.DARK_PINK} />
                        </View>
                    }
                />
            }

        </SafeAreaView>
    )

}

const mapStateToProps = (state) => {
    return {
        spirits: state.firestore.ordered.spirits,
        drinks: state.firestore.ordered.drinks,
    }
}

export default compose(
    firestoreConnect(() => ['drinks', 'spirits']),
    connect(mapStateToProps)
)(DrinkListScreen);
