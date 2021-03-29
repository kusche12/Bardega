import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import GlobalStyles from '../../Styles/GlobalStyles';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getRandomQueries, getDrinksWithQuery } from '../../Functions/drinkFunctions';
import HorizontalList from '../../Components/Discover/HorizontalList';

// Home page of the application. 
// It takes a number of random query terms and returns a horizontal list
// of 10 drinks that fit each query
const DiscoverDetail = ({ drinks, queries }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedDrinks, setSelectedDrinks] = useState(null);
    const [selectedQueries, setSelectedQueries] = useState(null);
    

    // Wait for drinks and queries to be fully loaded into the app
    useEffect(() => {
        if (drinks && queries) {
            loadData();
        }
    }, [drinks, queries])

    const loadData = () => {
        let ranQueries = getRandomQueries(queries, 10);
        setSelectedQueries(ranQueries);

        let drinkMatrix = [];
        for (let i = 0; i < ranQueries.length; i++) {
            let drinkRow = getDrinksWithQuery(drinks, ranQueries[i]);
            drinkMatrix.push(drinkRow);
        }
        setSelectedDrinks(drinkMatrix);
        setIsLoaded(true);

    }

    if (!isLoaded) {
        return (
            <SafeAreaView style={GlobalStyles.headerSafeArea}>
                <Text>Loading drinks...</Text>
            </SafeAreaView>
            );
    } else {
        return (
            <SafeAreaView style={GlobalStyles.headerSafeArea}>
                <Text>Discover</Text>
                {selectedDrinks.map((drinks, index) => {
                    return <HorizontalList drinks={drinks} index={index} query={selectedQueries[index].name} />
                })}
            </SafeAreaView>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        drinks: state.firestore.ordered.drinks,
        queries: state.firestore.ordered.queries
    }
}

// Connect the drink detail page to our redux store and firestore DB
export default compose(
    firestoreConnect(() => ['drinks', 'queries']),
    connect(mapStateToProps)
)(DiscoverDetail);