import React, { useState, useEffect } from 'react';
import { Image, View, StyleSheet, Keyboard, Platform, LogBox } from 'react-native';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Autocomplete from 'react-native-autocomplete-input';
import Images from '../../Images/Images';
import Styles from '../../Styles/StyleConstants';
import GlobalStyles from '../../Styles/GlobalStyles';

const comp = (a, b) => {
    return a.toLowerCase().trim() === b.toLowerCase().trim();
}

const findDrink = (query, drinks, original) => {
    console.log(query);
    if (query == '') {
        return original;
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return drinks.filter((drink) => drink.name.search(regex) >= 0);
}

LogBox.ignoreAllLogs()

//TODO: UI Styling
const SearchHeader = ({ drinks, navigation, preloadedDrinks }) => {
    const [query, setQuery] = useState('');
    const [currentDrinks, setCurrentDrinks] = useState([]);

    useEffect(() => {
        const res = findDrink(query, drinks, preloadedDrinks);
        setCurrentDrinks(res);
        navigation.setParams({ results: currentDrinks });
    }, [query, drinks])

    return (
        <View style={styles.container}>
            <View style={styles.inputImageRow}>
                <Autocomplete
                    clearButtonMode={'always'}
                    data={currentDrinks && currentDrinks.length === 1 && comp(query, currentDrinks[0].name) ? [] : currentDrinks}
                    query={query}
                    inputContainerStyle={{ visibility: 'hidden', borderColor: 'transparent' }}
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
        drinks: state.firestore.ordered.drinks
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['drinks'])
)(SearchHeader);