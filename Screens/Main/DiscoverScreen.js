import React, { useEffect, useState } from 'react';
import { RefreshControl, Text, SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getRandomQueries, getDrinksWithQuery } from '../../Functions/drinkFunctions';
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
// of 10 drinks that fit each query
const DiscoverScreen = ({ drinks, queries, navigation, drinkID, allDrinks }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedDrinks, setSelectedDrinks] = useState(null);
    const [selectedQueries, setSelectedQueries] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [drinksRendered, setDrinksRendered] = useState(false);

    // TODO: Speed up the initial drink rendering. This takes upwards of 20 seconds when app loads in
    // Wait for drinks and queries to be fully loaded into the app
    useEffect(() => {
        // If the user enters the app from a deep link sent to them by another user,
        // then move directly from the discover screen into the drink detail screen.
        if (drinkID && allDrinks) {
            navigation.navigate('DrinkDetailScreen', { drink: allDrinks[drinkID] });
        }
        // Otherwise, just stay on this screen and get data whenever the user pulls to refresh the page
        if (allDrinks && drinks && queries) {
            async function fetchData() {
                if (drinks && queries && !drinksRendered) {
                    loadData();
                    setDrinksRendered(true);
                }
            }
            fetchData();
        }
    }, [queries, drinks, allDrinks, drinkID]);

    // Test function only. Replcace this with the function below for production
    const loadData = async () => {
        const ranQueries = [{
            filterName: "Sweet",
            filterType: "tag",
            name: "Sweet & Simple",
        },
        {
            filterName: "light",
            filterType: "prepTime",
            id: "6QxFD8AtrI4cgPt61Che",
            name: "Light Prep",
        },
        {
            filterName: "very_strong",
            filterType: "strength",
            name: "Not For The Weak",
        }
        ]
        setSelectedQueries(ranQueries)

        let drinkMatrix = [];
        for (let i = 0; i < ranQueries.length; i++) {
            let drinkRow = await getDrinksWithQuery(drinks, ranQueries[i], 10);
            drinkMatrix.push(drinkRow);
        }

        setSelectedDrinks(drinkMatrix);
        setIsLoaded(true);
    }

    // const loadData = async () => {
    //     let ranQueries = getRandomQueries(queries, 8);
    //     setSelectedQueries(ranQueries);

    //     let drinkMatrix = [];
    //     for (let i = 0; i < ranQueries.length; i++) {
    //         let drinkRow = await getDrinksWithQuery(drinks, ranQueries[i], 6);
    //         if (drinkRow.length > 3) {
    //             drinkMatrix.push(drinkRow);
    //         }
    //     }

    //     setSelectedDrinks(drinkMatrix);
    //     setIsLoaded(true);
    // }

    const onRefresh = React.useCallback(() => {
        setIsRefreshing(true);
        wait(10)
            .then(() => loadData())
            .then(() => setIsRefreshing(false));
    }, []);

    if (!isLoaded) {
        return (
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { paddingLeft: 8 }]}>
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: Styles.height / 4 }}>
                    <Loading />
                </View>
            </SafeAreaView>
        );
    }
    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { marginLeft: 8 }]}>
                <View style={DiscoverStyles.titleContainer}>
                    <Text style={GlobalStyles.titlebold1}>DISCOVER</Text>
                </View>
                {selectedDrinks.map((drinks, index) => {
                    return <HorizontalList
                        data={drinks}
                        index={index}
                        key={index}
                        query={selectedQueries[index]}
                        navigation={navigation}
                        navigateTo={'DrinkDetailScreen'}
                        drinkType={'Drink'}
                    />
                })}
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

// If this screen is navigated to with a drinkID, then redirect to the DrinkDetailScreen
const mapStateToProps = (state, ownProps) => {

    return {
        drinkID: ownProps.route.params.drinkID || null,
        allDrinks: state.firestore.data.drinks,
        drinks: state.firestore.ordered.drinks,
        queries: state.firestore.ordered.queries
    }
}

// Connect the drink detail page to our redux store and firestore DB
export default compose(
    firestoreConnect(() => ['drinks', 'queries']),
    connect(mapStateToProps)
)(DiscoverScreen);