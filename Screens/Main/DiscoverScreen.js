import React, { useEffect, useState } from 'react';
import { RefreshControl, Text, SafeAreaView, View, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getRandomQueries, getDrinksWithQuery } from '../../Functions/drinkFunctions';
import LoadingBar from '../../Components/Main/LoadingBar';
import AdBanner1 from '../../Components/SVG/AdBanner1';
// import AdBanner2 from '../../Components/SVG/AdBanner2';
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
const DiscoverScreen = ({ drinks, queries, navigation, drinkID, allDrinks, isMember }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedDrinks, setSelectedDrinks] = useState(null);
    const [selectedQueries, setSelectedQueries] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [drinksRendered, setDrinksRendered] = useState(false);

    useEffect(() => {
        // If the user enters the app from a deep link sent to them by another user,
        // then move directly from the discover screen into the drink detail screen.
        if (drinkID && allDrinks) {
            navigation.navigate('DrinkDetailScreen', { drink: allDrinks[drinkID] });
        }
        // Otherwise, stay on this screen and get data whenever the user pulls to refresh the page
        if (allDrinks && drinks && queries) {
            async function fetchData() {
                if (!drinksRendered) {
                    await loadData();
                    setDrinksRendered(true);
                }
            }
            fetchData();
        }
    }, [queries, drinks, allDrinks, drinkID]);

    const loadData = async () => {
        console.log('loadData');
        console.log(queries.length);
        if (queries) {
            console.log('queries')
            let ranQueries = await getRandomQueries(queries, 9);
            console.log(ranQueries.length);
            setSelectedQueries(ranQueries);

            let drinkMatrix = [];
            for (let i = 0; i < ranQueries.length; i++) {
                let drinkRow = await getDrinksWithQuery(drinks, ranQueries[i], 6);
                drinkMatrix.push(drinkRow);
            }

            setSelectedDrinks(drinkMatrix);
            setIsLoaded(true);
        }

    }

    const onRefresh = React.useCallback(() => {
        setIsRefreshing(true);
        wait(1)
            .then(() => loadData())
            .then(() => setIsRefreshing(false));
    }, []);

    // TODO: for some funking reason the banner ad here does not want to cooperate.
    // The horizontal List above it has a weirdly long margin bottom, even though I am specifically 
    // setting marginAmount. Any fix would be fucking great, thanks.
    const renderHorizontalList = (drinks, index) => {
        if (drinks.length < 3) {
            return;
        }

        let res = [];
        if (isMember && index === 4) {
            res.push(<View style={{ marginBottom: 30, backgroundColor: 'red', marginTop: 0, top: 0 }}>
                <AdBanner1 />
            </View>);
        } else if (isMember && index === 8) {
            res.push(<View style={{ marginBottom: 30 }}>
                <AdBanner1 />
            </View>)
        }

        let marginAmount = 0;
        if (res.length == 0) {
            marginAmount = 50;
        }

        return (
            <>
                {res}
                <View style={{ marginLeft: 8, marginBottom: marginAmount }}>
                    <HorizontalList
                        isRefreshing={isRefreshing}
                        data={drinks}
                        index={index}
                        key={index}
                        query={selectedQueries[index]}
                        navigation={navigation}
                        navigateTo={'DrinkDetailScreen'}
                        drinkType={'Drink'}
                    />
                </View>
            </>
        )
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
    // TODO: Change the 'isMember' to '!isMember' after testing UI
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
            <SafeAreaView style={[GlobalStyles.headerSafeArea, isRefreshing && Platform.OS === 'ios' && { top: 0 }]}>
                <View style={DiscoverStyles.titleContainer}>
                    <Text style={GlobalStyles.titlebold1}>DISCOVER</Text>
                </View>
                {selectedDrinks.map((drinks, index) => {
                    return renderHorizontalList(drinks, index)
                })}
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

// If this screen is navigated to with a drinkID, then redirect to the DrinkDetailScreen
// Also, check if the current user is a member. If they are, do not render ads. If they are not
// then render them ads
const mapStateToProps = (state, ownProps) => {
    const profiles = state.firestore.data.profiles;
    const userEmail = profiles[state.firebase.auth.uid].email || '';
    const memberEmails = state.firestore.data.memberEmails || [];
    const isMember = memberEmails[userEmail]

    return {
        drinkID: ownProps.route.params.drinkID || null,
        allDrinks: state.firestore.data.drinks,
        drinks: state.firestore.ordered.drinks,
        queries: state.firestore.ordered.queries,
        isMember: isMember
    }
}

// Connect the drink detail page to our redux store and firestore DB
export default compose(
    firestoreConnect(() => ['drinks', 'queries', 'memberEmails', 'profiles']),
    connect(mapStateToProps)
)(DiscoverScreen);