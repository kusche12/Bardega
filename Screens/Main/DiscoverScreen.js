import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, Text, SafeAreaView, View, FlatList, ActivityIndicator, Linking, RefreshControl, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getRandomQueries, getDrinksWithQuery } from '../../Functions/drinkFunctions';
import LoadingImage from '../../Components/Discover/LoadingImage';
import LoadingBar from '../../Components/Main/LoadingBar';
import HorizontalList from '../../Components/Discover/HorizontalList';
import Loading from '../../Components/Main/Loading';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

// Home page of the application. 
// It takes a number of random query terms and returns a horizontal list
// of a number of drinks that fit each query
const DiscoverScreen = ({ drinks, queries, navigation, drinkID, allDrinks, isMember, ads }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isReloading, setIsReloading] = useState(false);
    const [initalized, setInitialized] = useState(false);
    const [selectedQueries, setSelectedQueries] = useState(null);
    const [queryIndex, setQueryIndex] = useState(0);
    const [adIndex, setAdIndex] = useState(0);
    const [renderItems, setRenderItems] = useState([]);

    useEffect(() => {
        // If the user enters the app from a deep link sent to them by another user,
        // then move directly from the discover screen into the drink detail screen.
        if (drinkID && allDrinks) {
            navigation.navigate('DrinkDetailScreen', { drink: allDrinks[drinkID] });
        }

        // Otherwise, stay on this screen and fetch data
        if (allDrinks && drinks && queries && !initalized && ads) {
            fetchData();
        }
    }, [queries, drinks, allDrinks, drinkID, ads]);

    const fetchData = async () => {
        setInitialized(true);
        // Randomize the array of queries
        const ranQueries = await getRandomQueries(queries, queries.length);
        setSelectedQueries(ranQueries);

        // Generate the first 3 horizontal lists
        let drinkMatrix = [];
        for (let i = 0; i < 3; i++) {
            let drinkRow = await getDrinksWithQuery(drinks, ranQueries[i], 6);
            if (drinkRow.length > 2) {
                drinkMatrix.push({ drinkRow, query: ranQueries[i] });
            }
        }

        setIsLoading(false)
        setQueryIndex(3);
        setRenderItems(drinkMatrix);
    }

    // Completely reload state when the user "pulls to refresh"
    const reloadPage = async () => {
        setIsReloading(true)
        setIsLoading(true);
        setQueryIndex(0);
        setRenderItems([]);
        setAdIndex(0);
        setSelectedQueries(null);
        await fetchData();
        setIsReloading(false);
    }

    // Get the drinks corresponding to the current drink query
    const fetchDrinkRow = async () => {
        let res = await getDrinksWithQuery(drinks, selectedQueries[queryIndex], 6);
        return res;
    }

    // Either get another horizontal row OR an ad based on the number of currently rendered items
    const retrieveData = async () => {
        console.log('retreiving data')
        // If the query index is already at the end of all queries
        // then you can no longer retrieve more data
        if (queryIndex >= selectedQueries.length) {
            console.log('end reached')
            return;
        }

        setIsRefreshing(true);

        if (renderItems.length % 5 === 0 && ads && adIndex < ads.length && !isMember) {
            let currItems = [...renderItems];
            const image = ads[adIndex].imageURL;
            currItems.push({ itemType: 'advertisement', imageURL: image });
            setRenderItems(currItems);
            setAdIndex(adIndex + 1);
        } else {
            let drinkRow = await fetchDrinkRow();
            if (drinkRow.length > 2) {
                setRenderItems([...renderItems, { drinkRow, query: selectedQueries[queryIndex] }]);
            }
            setQueryIndex(queryIndex + 1);
        }

        setIsRefreshing(false);
    }

    // Render the items here. This could either be the horizontal list or an advertisement
    const renderItem = ({ item, index }) => {
        if (item.itemType === 'advertisement') {
            return (
                <View style={{ flexDirection: 'row', marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableWithoutFeedback onPress={() => Linking.openURL('https://bardegacocktails.com')}>
                        <LoadingImage imageURL={item.imageURL} />
                    </TouchableWithoutFeedback>
                </View>
            )
        } else {
            return (
                <View style={{ marginLeft: 8, marginBottom: 25, marginTop: 25 }}>
                    <HorizontalList
                        data={item.drinkRow}
                        index={index}
                        key={index}
                        query={item.query}
                        navigation={navigation}
                        navigateTo={'DrinkDetailScreen'}
                        drinkType={'Drink'}
                    />
                </View>
            )
        }
    }

    if (isLoading) {
        return (
            <SafeAreaView>
                <View>
                    <LoadingBar />
                    <View style={{ marginTop: Styles.height * .33, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Loading />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView>
            <FlatList
                ListHeaderComponent={
                    <View style={[DiscoverStyles.titleContainer, GlobalStyles.headerSafeArea, { marginBottom: 25 }]}>
                        <Text style={GlobalStyles.titlebold1}>DISCOVER</Text>
                    </View>
                }

                data={renderItems}
                keyExtractor={(item, index) => '' + index}
                renderItem={renderItem}
                horizontal={false}

                onEndReached={retrieveData}
                onEndReachedThreshold={.5}

                refreshControl={
                    <RefreshControl
                        refreshing={isReloading}
                        onRefresh={reloadPage}
                        tintColor={Styles.DARK_PINK}
                        colors={[Styles.DARK_PINK]}
                    />
                }

                // style={{ marginBottom: 20 }}

                ListFooterComponent={isRefreshing &&
                    <View style={{ marginTop: 0, marginBottom: 20 }} >
                        <ActivityIndicator color={Styles.DARK_PINK} />
                    </View>
                }
            />
        </SafeAreaView>
    );
}

// If this screen is navigated to with a drinkID, then redirect to the DrinkDetailScreen
// Also, check if the current user is a member. If they are, do not render ads. If they are not
// then render them ads
const mapStateToProps = (state, ownProps) => {
    const profiles = state.firestore.data.profiles;
    const userEmail = profiles[state.firebase.auth.uid].email || '';
    const memberEmails = state.firestore.data.memberEmails || [];
    const isMember = memberEmails[userEmail];
    const ads = state.firestore.ordered.ads;

    return {
        drinkID: ownProps.route.params.drinkID || null,
        allDrinks: state.firestore.data.drinks,
        drinks: state.firestore.ordered.drinks,
        queries: state.firestore.ordered.queries,
        ads: ads,
        isMember: isMember,
    }
}

// Connect the drink detail page to our redux store and firestore DB
export default compose(
    firestoreConnect(() => ['drinks', 'queries', 'memberEmails', 'profiles', 'ads']),
    connect(mapStateToProps)
)(DiscoverScreen);