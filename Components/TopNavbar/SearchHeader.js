import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { drinkIsPrivate } from '../../Functions/drinkFunctions';
import Autocomplete from 'react-native-autocomplete-input';
import Images from '../../Images/Images';
import Styles from '../../Styles/StyleConstants';
import GlobalStyles from '../../Styles/GlobalStyles';

const SearchHeader = ({ drinks, navigation, profiles, spirits }) => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);

    // If the query string is empty, just return a random list of publicly available drinks rendered on screen start up
    // Otherwise, render drinks AND profiles based on public availability and user input
    useEffect(() => {
        async function fetchData() {
            if (drinks && profiles && spirits) {
                if (query) {
                    const drinkRes = await findDrink(drinks);
                    const spiritRes = findSpirit(spirits);
                    const profileRes = findProfile(profiles);
                    const res = drinkRes.concat(profileRes);
                    const res2 = res.concat(spiritRes);

                    const shuffledResults = shuffleArray(res2);

                    setData(shuffledResults);
                    navigation.setParams({ results: shuffledResults });
                }
            }
        }
        fetchData();
    }, [query, drinks]);

    // Hard reset the search page to an empty array when query is empty
    useEffect(() => {
        if (!query) {
            const res = [];
            setData(res);
            navigation.setParams({ results: res });
        }
    }, [query]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array;
    }


    const findDrink = async (drinks) => {
        const regex = new RegExp(`${query.trim()}`, 'i');
        const set = new Set();
        let res = [];
        for (let i = 0; i < drinks.length; i++) {
            const drink = drinks[i];
            const isPrivate = await drinkIsPrivate(drink);
            if (!isPrivate) {

                // If the name matches query
                if (drink.name.toLowerCase().search(regex) >= 0 && !set.has(drink)) {
                    res.push(drink);
                    set.add(drink);
                }

                // If strength level matches query
                if (drink.strength.value.toLowerCase().search(regex) >= 0 && !set.has(drink)) {
                    res.push(drink);
                    set.add(drink);
                }

                // If one of the recipes matches query
                for (let k = 0; k < drink.recipe.length; k++) {
                    if (drink.recipe[k].type.toLowerCase().search(regex) >= 0 && !set.has(drink)) {
                        res.push(drink);
                        set.add(drink);
                    }
                }

                // If one of the tags matches query
                for (let j = 0; j < drink.tags.length; j++) {
                    if (drink.tags[j].name.toLowerCase().search(regex) >= 0 && !set.has(drink)) {
                        res.push(drink);
                        set.add(drink);
                    }
                }

                if (res.length > 30) {
                    break;
                }
            }
        }
        return res;
    }

    const findProfile = (profiles) => {
        const regex = new RegExp(`${query.trim()}`, 'i');
        let res = [];
        for (let i = 0; i < profiles.length; i++) {
            const profile = profiles[i];
            if (profile.userName.toLowerCase().search(regex) >= 0) {
                res.push(profile)
            }

            if (res.length > 30) {
                break;
            }
        }

        return res;
    }

    const findSpirit = (spirits) => {
        const regex = new RegExp(`${query.trim()}`, 'i');
        const set = new Set();
        let res = [];
        for (let i = 0; i < spirits.length; i++) {
            const spirit = spirits[i];

            // If the name matches query
            if (spirit.name.toLowerCase().search(regex) >= 0 && !set.has(spirit)) {
                res.push(spirit);
                set.add(spirit);
            }

            // If strength level matches query
            if (spirit.drinkability.toLowerCase().search(regex) >= 0 && !set.has(spirit)) {
                res.push(spirit);
                set.add(spirit);
            }

            // If the spirit type (alcohol) matches the query
            if (spirit.spirit.toLowerCase().search(regex) >= 0 && !set.has(spirit)) {
                res.push(spirit);
                set.add(spirit);
            }


            if (res.length > 30) {
                break;
            }
        }
        return res;
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputImageRow}>
                <Autocomplete
                    clearButtonMode={'always'}
                    data={data}
                    query={query}
                    inputContainerStyle={{ borderColor: 'transparent' }}
                    onChangeText={setQuery}
                    hideResults={true}
                    autoCorrect={false}
                    style={[GlobalStyles.paragraph2, styles.inputContainerStyle]}
                />
                <Image source={Images.topNav.search} style={styles.image} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Styles.width,
        alignItems: 'center',
        backgroundColor: Styles.PINK,
        flex: 1,
    },
    inputContainerStyle: {
        width: Styles.width * .9,
        height: 42,
        borderWidth: 1.5,
        borderColor: 'black',
        paddingLeft: 35,
        borderRadius: Styles.BORDER_RADIUS,
        borderColor: Styles.OFF_BLACK,
        alignSelf: 'center',
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    inputImageRow: {
        flexDirection: 'row',
        position: 'relative',
    },
    image: {
        width: 18,
        height: 18,
        top: 13,
        left: Platform.OS === 'ios' ? 12 : 30,
        position: 'absolute',
        zIndex: 900,
        resizeMode: 'contain'
    },
    cancelImg: {
        width: 18,
        height: 18,
        position: 'absolute',
        right: 12,
        bottom: 12,
    }
})


const mapStateToProps = (state) => {
    return {
        drinks: state.firestore.ordered.drinks,
        profiles: state.firestore.ordered.profiles,
        spirits: state.firestore.ordered.spirits,

    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['drinks', 'profiles', 'spirits'])
)(SearchHeader);