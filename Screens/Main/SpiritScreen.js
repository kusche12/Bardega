import React, { useEffect, useState } from 'react';
import { RefreshControl, Text, SafeAreaView, View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getSpiritsWithQuery, getRandomQueries } from '../../Functions/drinkFunctions';
import LoadingBar from '../../Components/Main/LoadingBar';
import HorizontalList from '../../Components/Discover/HorizontalList';
import Loading from '../../Components/Main/Loading';
import Styles from '../../Styles/StyleConstants';
import { ADMIN_ID } from '../../API/ADMIN_ID';
import GlobalStyles from '../../Styles/GlobalStyles';
import Images from '../../Images/Images';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

// Spirit page of the application. 
// It takes a number of random query terms and returns a horizontal list
// of 10 spirits that fit each query
const SpiritScreen = ({ spirits, spiritQueries, navigation, allSpirits, userID }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedDrinks, setSelectedDrinks] = useState(null);
    const [selectedQueries, setSelectedQueries] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [drinksRendered, setDrinksRendered] = useState(false);

    // Wait for drinks and queries to be fully loaded into the app
    useEffect(() => {
        if (allSpirits && spirits && spiritQueries && userID) {
            async function fetchData() {
                if (!drinksRendered) {
                    loadData();
                    setDrinksRendered(true);
                }
            }
            fetchData();
        }
    }, [spiritQueries, spirits, allSpirits, userID]);

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
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { marginLeft: 8, alignItems: 'center' }, isRefreshing && Platform.OS === 'ios' && { top: 0 }]}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Text style={[GlobalStyles.titlebold1, { textAlign: 'center' }]}>REVIEW A SPIRIT</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', top: 10 }}>
                        {userID === ADMIN_ID &&
                            <TouchableWithoutFeedback style={{ width: 40, height: 40 }} onPress={() => navigation.navigate('SpiritUploadScreen')}>
                                <Image source={Images.plusBlack} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                            </TouchableWithoutFeedback>
                        }
                    </View>
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
        spiritQueries: state.firestore.ordered.spiritQueries,
        userID: state.firebase.auth.uid
    }
}

export default compose(
    firestoreConnect(() => ['spirits', 'spiritQueries']),
    connect(mapStateToProps)
)(SpiritScreen);