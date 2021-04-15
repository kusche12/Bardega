import React from 'react';
import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import { getDrinksWithQuery } from '../../Functions/drinkFunctions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import DrinkCard from '../Main/DrinkCard';
import DiscoverStyles from '../../Styles/DiscoverStyles';

const HorizontalList = ({ data, query, navigation, drinks }) => {
    const renderItem = ({ item }) => {
        return (
            <DrinkCard drink={item} navigation={navigation} prev={'Discover'} />
        )
    }

    const getDrinksAndNavigate = () => {
        const collection = { name: query.name };
        const res = getDrinksWithQuery(drinks, query, 100);
        console.log(res.length);
        navigation.navigate('DrinkListScreen', { collection: collection, drinks: res, removable: false });
    }

    return (
        <View style={DiscoverStyles.horizontalContainer}>
            <View style={DiscoverStyles.horizRow}>
                <Text style={DiscoverStyles.queryTitle}>{query.name}</Text>
                <TouchableWithoutFeedback onPress={() => getDrinksAndNavigate()}>
                    <Text style={DiscoverStyles.querySubtitle}>See more</Text>
                </TouchableWithoutFeedback>

            </View>
            <FlatList
                horizontal={true}
                data={data}
                keyExtractor={(item, index) => '' + index}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        drinks: state.firestore.ordered.drinks,
    }
}

// Connect the drink detail page to our redux store and firestore DB
export default compose(
    firestoreConnect(() => ['drinks']),
    connect(mapStateToProps)
)(HorizontalList);