import React, { useEffect, useState } from 'react';
import { RefreshControl, Text, SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getSpiritsWithQuery, getRandomQueries } from '../../Functions/drinkFunctions';
import LoadingBar from '../../Components/Main/LoadingBar';
import HorizontalList from '../../Components/Discover/HorizontalList';
import Loading from '../../Components/Main/Loading';
import Styles from '../../Styles/StyleConstants';
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
    const [selectedQueries, setSelectedQueries] = useState(null);
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
        let ranQueries = await getRandomQueries(spiritQueries, 7);
        setSelectedQueries(ranQueries);

        let spiritMatrix = [];
        for (let i = 0; i < ranQueries.length; i++) {
            let drinkRow = getSpiritsWithQuery(spirits, ranQueries[i], 10);
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
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            contentContainerStyle={{ flexGrow: 1 }}
            refreshControl={
                <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                    tintColor={Styles.DARK_PINK}
                    colors={[Styles.DARK_PINK]}
                />
            }
        >
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { marginLeft: 8 }, isRefreshing && Platform.OS === 'ios' && { top: 0 }]}>
                <View style={DiscoverStyles.titleContainer}>
                    <Text style={GlobalStyles.titlebold1}>REVIEW A SPIRIT</Text>
                </View>
                {selectedDrinks.map((spirits, index) => {
                    return <HorizontalList
                        data={spirits}
                        index={index}
                        key={index}
                        query={selectedQueries[index]}
                        navigation={navigation}
                        navigateTo={'SpiritDetailScreen'}
                        drinkType={'Spirit'}
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