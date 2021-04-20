import React, { useState, useEffect } from 'react';
import { Dimensions, Image, View, StyleSheet, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import Autocomplete from 'react-native-autocomplete-input';
import Images from '../../Images/Images';

const width = Dimensions.get('screen').width;
const LIGHTPINK = '#F7D2CF';
const GRAY = '#a1a1a1'


const comp = (a, b) => {
    return a.toLowerCase().trim() === b.toLowerCase().trim();
}

const findDrink = (query, drinks) => {
    if (query === '') {
        return [];
    }
    const regex = new RegExp(`${query.trim()}`, 'i');
    return drinks.filter((drink) => drink.name.search(regex) >= 0);
}

//TODO: UI Styling
const SearchHeader = ({ drinks, navigation }) => {
    const [query, setQuery] = useState('');
    const [currentDrinks, setCurrentDrinks] = useState([]);

    useEffect(() => {
        const res = findDrink(query, drinks);
        setCurrentDrinks(res);
        navigation.setParams({ results: currentDrinks });
    }, [query])

    const handleCancel = () => {
        setQuery('');
        Keyboard.dismiss();
        setCurrentDrinks([]);
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputImageRow}>
                <View style={{ backgroundColor: 'white', width: width * .9, height: 42 }}>
                    <Autocomplete
                        clearButtonMode={'always'}
                        data={currentDrinks && currentDrinks.length === 1 && comp(query, currentDrinks[0].name) ? [] : currentDrinks}
                        query={query}
                        inputContainerStyle={styles.inputContainerStyle}
                        onChangeText={setQuery}
                        hideResults={true}
                        autoCorrect={false}
                    />
                </View>
                <Image source={Images.topNav.search} style={styles.image} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center',
        backgroundColor: LIGHTPINK,
        flex: 1,
    },
    inputContainerStyle: {
        width: width * .9,
        borderWidth: 2,
        paddingLeft: 35,
        borderColor: GRAY,
        alignSelf: 'center'
    },
    inputImageRow: {
        flexDirection: 'row',
        position: 'relative',
    },
    image: {
        width: 18,
        height: 18,
        top: 13,
        left: 12,
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