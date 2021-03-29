import React from 'react';
import { Text, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import GlobalStyles from '../../Styles/GlobalStyles';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

// Home page of the application. 
// It takes 10 random query terms and returns a horizontal list
// of all drinks that fit that query
const DiscoverDetail = ({ drinks, queries }) => {

    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <Text>Discover</Text>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    return {
        drinks: state.firestore.data.drinks,
        queries: state.firestore.data.queries
    }
}

// Connect the drink detail page to our redux store and firestore DB
export default compose(
    firestoreConnect(),
    connect(mapStateToProps)
)(DiscoverDetail);