import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const PINK = '#F29288';
const GRAY = '#a1a1a1';

const CreateAddIngredient = ({ item, addItem }) => {
    return (   
        <View>
            <TouchableOpacity onPress={() => addItem(item)}> 
                <View style={styles.add}>
                    <AntDesign name="pluscircleo" size={Platform.isPad ? 26 : 20} color={GRAY} />
                    <Text style={Platform.isPad ? styles.padAddText : styles.addText}>Add an Ingredient</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    add: {
        width: width * .9,
        padding: 5,
        paddingLeft: 20,
        flexDirection: 'row',
        borderTopWidth: 1.5,
        borderTopColor: PINK,
        alignItems: 'center',
    },
    addText: {
        marginLeft: 20,
        fontSize: 18,
        fontStyle: 'italic',
        color: GRAY
    },
    padAddText: {
        marginLeft: 20,
        fontSize: 26,
        fontStyle: 'italic',
        color: GRAY
    }
});

export default CreateAddIngredient;