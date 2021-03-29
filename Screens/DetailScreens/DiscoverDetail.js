import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import GlobalStyles from '../../Styles/GlobalStyles';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getRandomQueries, getDrinksWithFilter } from '../../Functions/drinkFunctions';

// Home page of the application. 
// It takes a number of random query terms and returns a horizontal list
// of all drinks that fit each query
const DiscoverDetail = ({ drinks, queries }) => {

    const [selectedQueries, setSelectedQueries] = useState(null);

    useEffect(() => {
        if (queries) {
            setSelectedQueries(getRandomQueries(queries, 10));
        }
    }, [queries]);

    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <Text>Discover</Text>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    //console.log(state.firestore.data.queries);
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