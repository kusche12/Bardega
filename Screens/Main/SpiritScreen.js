import React, { useEffect, useState } from 'react';
import { RefreshControl, Text, SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getSpiritsWithQuery } from '../../Functions/drinkFunctions';
import HorizontalList from '../../Components/Discover/HorizontalList';
import Loading from '../../Components/Main/Loading';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import GlobalStyles from '../../Styles/GlobalStyles';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

// Spirit page of the application. 
// It takes a number of random query terms and returns a horizontal list
// of 10 spirits that fit each query
const SpiritScreen = ({ spirits, spiritQueries, navigation, allSpirits }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedDrinks, setSelectedDrinks] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [drinksRendered, setDrinksRendered] = useState(false);

    // Wait for drinks and queries to be fully loaded into the app
    useEffect(() => {
        if (allSpirits && spirits && spiritQueries) {
            async function fetchData() {
                if (!drinksRendered) {
                    loadData();
                    setDrinksRendered(true);
                }
            }
            fetchData();
        }
    }, [spiritQueries, spirits, allSpirits]);

    const loadData = async () => {
        let spiritMatrix = [];
        for (let i = 0; i < spiritQueries.length; i++) {
            let drinkRow = getSpiritsWithQuery(spirits, spiritQueries[i], 10);
            spiritMatrix.push(drinkRow);
        }

        setSelectedDrinks(spiritMatrix);
        setIsLoaded(true);
    }

    const onRefresh = React.useCallback(() => {
        setIsRefreshing(true);
        wait(10)
            .then(() => loadData())
            .then(() => setIsRefreshing(false));
    }, []);

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
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { marginLeft: 8 }]}>
                <View style={DiscoverStyles.titleContainer}>
                    <Text style={GlobalStyles.titlebold1}>REVIEW A SPIRIT</Text>
                </View>
                {selectedDrinks.map((spirits, index) => {
                    return <HorizontalList
                        data={spirits}
                        index={index}
                        key={index}
                        query={spiritQueries[index]}
                        navigation={navigation}
                        navigateTo={'SpiritDetailScreen'}
                    />
                })}
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        allSpirits: state.firestore.data.spirits,
        spirits: state.firestore.ordered.spirits,
        spiritQueries: state.firestore.ordered.spiritQueries
    }
}

export default compose(
    firestoreConnect(() => ['spirits', 'spiritQueries']),
    connect(mapStateToProps)
)(SpiritScreen);