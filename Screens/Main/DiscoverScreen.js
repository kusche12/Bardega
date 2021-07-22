import React, { useEffect, useState } from 'react';
import { RefreshControl, Text, SafeAreaView, View, Platform, FlatList, ActivityIndicator, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getRandomQueries, getDrinksWithQuery } from '../../Functions/drinkFunctions';
import LoadingBar from '../../Components/Main/LoadingBar';
import AdBanner1 from '../../Components/SVG/AdBanner1';
import HorizontalList from '../../Components/Discover/HorizontalList';
import Loading from '../../Components/Main/Loading';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

// Home page of the application. 
// It takes a number of random query terms and returns a horizontal list
// of a number of drinks that fit each query
const DiscoverScreen = ({ drinks, queries, navigation, drinkID, allDrinks, isMember, ads }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
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
            async function fetchData() {
                // Randomize the array of queries
                const ranQueries = await getRandomQueries(queries, queries.length);
                setSelectedQueries(ranQueries);

                // Generate the first 3 horizontal lists
                let drinkMatrix = [];
                for (let i = 0; i < 3; i++) {
                    let drinkRow = await getDrinksWithQuery(drinks, ranQueries[i], 6);
                    drinkMatrix.push(drinkRow);
                }

                setQueryIndex(3);
                setRenderItems(drinkMatrix);
                setIsLoaded(true);
                setInitialized(true);
            }
            fetchData();
        }
    }, [queries, drinks, allDrinks, drinkID, ads]);

    // Every time a component is added to the Render Items state,
    // Check the number of items in the state.
    // On certain conditions (total lengths of the currently rendered items), 
    // you must add an advertisement OR a single drink component
    useEffect(() => {
        if (ads) {
            if (renderItems.length % 3 === 0 && adIndex < ads.length) {
                let currItems = [...renderItems];
                currItems.push({ itemType: 'advertisement', imageURL: ads[adIndex].imageURL });
                setRenderItems(currItems);
                setAdIndex(adIndex + 1);
            }
        }

    }, [ads, renderItems]);

    // Get the drinks corresponding to the current drink query
    const fetchDrinkRow = async () => {
        let res = await getDrinksWithQuery(drinks, selectedQueries[queryIndex], 6);
        setQueryIndex(queryIndex + 1);
        return res;
    }

    // If the query index is already at the end of all queries
    // then you can no longer retrieve more data
    const retrieveData = async () => {
        //console.log("fetching more data");
        if (queryIndex >= selectedQueries.length) {
            return;
        }

        setIsRefreshing(true);
        let currRow = await fetchDrinkRow();
        if (currRow) {
            setRenderItems([...renderItems, currRow]);
        }
        //console.log(renderItems.length);
        setIsRefreshing(false);
    }

    // Render the items here. This could either be the horizontal list or an advertisement
    const renderItem = ({ item, index }) => {
        if (item.itemType === 'advertisement') {
            console.log('RENDERING AN AD')
            console.log(item.imageURL);
            return (
                <View style={{ marginLeft: 8, marginBottom: 50 }}>
                    <Text>HELLO WORLDDDDDDDDDDDDDDS</Text>
                    <Image source={item.imageURL} style={{ width: Styles.width, height: Styles.height }} />
                </View>
            )
        } else {
            if (item.length > 2) {
                return (
                    null
                    // <View style={{ marginLeft: 8, marginBottom: 50 }}>
                    //     <HorizontalList
                    //         data={item}
                    //         index={index}
                    //         key={index}
                    //         query={selectedQueries[index]}
                    //         navigation={navigation}
                    //         navigateTo={'DrinkDetailScreen'}
                    //         drinkType={'Drink'}
                    //     />
                    // </View>
                )
            }
        }
    }

    if (!isLoaded) {
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
        <SafeAreaView style={{ marginBottom: 50 }}>
            <FlatList
                ListHeaderComponent={
                    <View style={[DiscoverStyles.titleContainer, GlobalStyles.headerSafeArea, { marginBottom: 50 }]}>
                        <Text style={GlobalStyles.titlebold1}>DISCOVER</Text>
                    </View>
                }
                data={renderItems}
                keyExtractor={(item, index) => '' + index}
                renderItem={renderItem}
                horizontal={false}
                bounces={false}

                onEndReached={retrieveData}
                onEndReachedThreshold={0.5}
                refreshing={isRefreshing}
                ListFooterComponent={isRefreshing &&
                    <View style={{ marginTop: 20 }} >
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

    return {
        drinkID: ownProps.route.params.drinkID || null,
        allDrinks: state.firestore.data.drinks,
        drinks: state.firestore.ordered.drinks,
        queries: state.firestore.ordered.queries,
        ads: state.firestore.ordered.ads,
        isMember: isMember,
    }
}

// Connect the drink detail page to our redux store and firestore DB
export default compose(
    firestoreConnect(() => ['drinks', 'queries', 'memberEmails', 'profiles', 'ads']),
    connect(mapStateToProps)
)(DiscoverScreen);