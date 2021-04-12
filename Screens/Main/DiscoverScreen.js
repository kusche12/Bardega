import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import GlobalStyles from '../../Styles/GlobalStyles';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getRandomQueries, getDrinksWithQuery } from '../../Functions/drinkFunctions';
import HorizontalList from '../../Components/Discover/HorizontalList';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import Loading from '../../Components/Main/Loading';

// Home page of the application. 
// It takes a number of random query terms and returns a horizontal list
// of 10 drinks that fit each query
const DiscoverScreen = ({ drinks, queries, navigation }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedDrinks, setSelectedDrinks] = useState(null);
    const [selectedQueries, setSelectedQueries] = useState(null);

    // Wait for drinks and queries to be fully loaded into the app
    useEffect(() => {
        if (drinks && queries) {
            loadData();
        }
    }, [drinks, queries])

    const loadData = async () => {
        let ranQueries = await getRandomQueries(queries, 10);
        setSelectedQueries(ranQueries);

        let drinkMatrix = [];
        for (let i = 0; i < ranQueries.length; i++) {
            let drinkRow = await getDrinksWithQuery(drinks, ranQueries[i]);
            drinkMatrix.push(drinkRow);
        }

        await setSelectedDrinks(drinkMatrix);
        setIsLoaded(true);
    }



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
            <SafeAreaView style={[GlobalStyles.headerSafeArea, DiscoverStyles.container]}>
                <View style={DiscoverStyles.titleContainer}>
                    <Text style={DiscoverStyles.title}>DISCOVER</Text>
                </View>
                {/* TODO: Uncomment this and delete the below horizontal list for production */}
                {/* {selectedDrinks.map((drinks, index) => {
                    return <HorizontalList
                        data={drinks}
                        index={index}
                        key={index}
                        query={selectedQueries[index].name}
                        navigation={navigation}
                    />
                })} */}
                {/* Testing purposes, use only one horizontal list */}
                <HorizontalList
                    data={selectedDrinks[0]}
                    index={0}
                    query={selectedQueries[0].name}
                    navigation={navigation}
                />
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
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
)(DiscoverScreen);