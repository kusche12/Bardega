import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getRandomQueries, getDrinksWithQuery } from '../../Functions/drinkFunctions';
import HorizontalList from '../../Components/Discover/HorizontalList';
import Loading from '../../Components/Main/Loading';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import GlobalStyles from '../../Styles/GlobalStyles';

// Home page of the application. 
// It takes a number of random query terms and returns a horizontal list
// of 10 drinks that fit each query
const DiscoverScreen = ({ drinks, queries, navigation, drinkID, allDrinks }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedDrinks, setSelectedDrinks] = useState(null);
    const [selectedQueries, setSelectedQueries] = useState(null);

    // Wait for drinks and queries to be fully loaded into the app
    useEffect(() => {
        if (drinkID && allDrinks) {
            navigation.navigate('DrinkDetailScreen', { drink: allDrinks[drinkID] });
        }
        if (allDrinks && drinks && queries) {
            async function fetchData() {
                if (drinks && queries) {
                    loadData();
                }
            }
            fetchData();
        }
    }, [queries, drinks, allDrinks, drinkID]);

    // TODO: Test function only. Replcace this with the function below for production
    const loadData = async () => {
        const ranQueries = [{
            filterName: "medium",
            filterType: "prepTime",
            id: "gsgstD8P9sXDJ1gVJtWO",
            name: "Medium Prep",
        }]
        setSelectedQueries(ranQueries)

        let drinkMatrix = [];
        for (let i = 0; i < ranQueries.length; i++) {
            let drinkRow = await getDrinksWithQuery(drinks, ranQueries[i], 10);
            drinkMatrix.push(drinkRow);
        }

        setSelectedDrinks(drinkMatrix);
        setIsLoaded(true);
    }

    // // TODO: Uncomment for production, leave commented for development
    // const loadData = async () => {
    //     let ranQueries = await getRandomQueries(queries, 10);
    //     setSelectedQueries(ranQueries);

    //     let drinkMatrix = [];
    //     for (let i = 0; i < ranQueries.length; i++) {
    //         let drinkRow = await getDrinksWithQuery(drinks, ranQueries[i], 10);
    //         drinkMatrix.push(drinkRow);
    //     }

    //     await setSelectedDrinks(drinkMatrix);
    //     setIsLoaded(true);
    // }

    if (!isLoaded) {
        return (
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { paddingLeft: 8 }]}>
                <Loading />
            </SafeAreaView>
        );
    }
    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            contentContainerStyle={{ flexGrow: 1 }}
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
                    />
                })}
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

// If this screen is navigated to with a drinkID, then redirect to the DrinkDetailScreen
const mapStateToProps = (state, ownProps) => {
    console.log(ownProps.route.params.drinkID);

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