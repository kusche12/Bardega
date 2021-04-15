import React, { useState } from 'react';
import { Dimensions, Image, View, Text, StyleSheet } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

const width = Dimensions.get('screen').width;
const RADIUS = 22;
const GRAY = '#a1a1a1'
const LIGHTPINK = '#F7D2CF';


const data = [
    {
        name: 'drink1',
        value: 'hello'
    },
    {
        name: 'drink2',
        value: 'bye'
    }
]

//TODO: UI Styling
// TODO: Render suggestions on the screen below using the SearchResult component
const SearchHeader = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const renderItem = ({ item }) => {
        return (
            <Text>{item.name}</Text>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputImageRow}>

                <Autocomplete
                    data={data}
                    value={value}
                    containerStyle={styles.inputContainer}
                    inputContainerStyle={styles.input}
                    onChangeText={setValue}
                    flatListProps={{
                        keyExtractor: (_, idx) => idx,
                        renderItem: renderItem
                    }}
                />
                <Image source={require('./search.png')} style={styles.image} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center',
        backgroundColor: LIGHTPINK,
        flex: 1
    },
    inputContainer: {
        width: width * .9,
        borderRadius: 8,
        borderWidth: 1,
    },
    inputImageRow: {
        flexDirection: 'row',
        position: 'relative',
    },
    input: {
        zIndex: 1,

    },
    image: {
        width: 15,
        height: 15,
        bottom: 15,
        right: 15,
        position: 'absolute',
        zIndex: 900
    },
})



export default SearchHeader;