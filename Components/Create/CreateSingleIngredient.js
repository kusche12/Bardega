import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableWithoutFeedback, Platform } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import SegmentedPicker from 'react-native-segmented-picker';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import PickerOptions from '../../API/pickerOptions';

const WIDTH = Dimensions.get('screen').width;

// TODO: Convert any floating point amounts into two columns. The right column being the fraction of the decimal.
const CreateSingleIngredient = ({ ingredient, updateIngredient, index, updateIngredientType, deleteIngredient }) => {

    const [showPicker, setShowPicker] = useState(false);
    console.log(PickerOptions);
    // Handle update for the amount and unit of the ingredient
    // TODO: Test this. Like, ASAP.
    const onPickerConfirm = (selections) => {
        let newAmount = selections.column1.label;
        let newUnit = selections.column3.label;

        updateIngredient(newAmount, newUnit, ingredient.type, key);
        setShowPicker(false);
    }

    return (
        <View style={styles.container}>
            <Grid>
                {/* Amount and Unit */}
                <Col size={2}>
                    <TouchableWithoutFeedback onPress={() => setShowPicker(!showPicker)}>
                        <View style={styles.amount}>
                            {ingredient.amount !== '0' && <Text style={styles.font1}>{ingredient.amount}</Text>}
                            <Text style={styles.font2}> </Text>
                            <Text style={styles.font2}>{ingredient.unit}</Text>
                            <AntDesign name="down" size={18} color="#a1a1a1" style={styles.arrow} />
                        </View>
                    </TouchableWithoutFeedback>
                </Col>

                {/* Ingredient type */}
                <Col size={5}>
                    <View style={styles.ingredient}>
                        <TextInput
                            style={styles.ingredientText}
                            autoCapitalize="words"
                            value={ingredient.type}
                            onChangeText={(text) => updateIngredientType(text, index, ingredient.id)}
                        />
                    </View>
                </Col>
                <Col size={1}>
                    <View style={styles.delete}>
                        <TouchableWithoutFeedback onPress={() => deleteIngredient("Ingredient", ingredient.id)}>
                            <Feather name="x" size={Platform.isPad ? 26 : 20} color="#a1a1a1" style={styles.x} />
                        </TouchableWithoutFeedback>
                    </View>
                </Col>
            </Grid>
            <SegmentedPicker
                ref={React.createRef()}
                onConfirm={onPickerConfirm}
                onCancel={() => setShowPicker(!showPicker)}
                visible={showPicker}
                //options={PickerOptions}
                defaultSelections={{ column1: ingredient.amount, column2: ingredient.amount, column3: ingredient.unit }}
                toolbarBackground="#64CAF6"
                toolbarBorderColor="#56b9e3"
                confirmTextColor="white"
            />
        </View>
    );
}
const PINK = '#F29288';
const GRAY = '#a1a1a1';

const styles = StyleSheet.create({
    container: {
        width: WIDTH * .75,
        borderTopWidth: 1.5,
        borderTopColor: PINK,
    },
    amount: {
        flexDirection: 'row',
        alignItems: 'baseline',
        paddingVertical: 5,
    },
    ingredientText: {
        fontSize: 16,
        fontStyle: 'italic',
        color: GRAY
    },
    ingredient: {
        paddingLeft: 10,
        borderLeftColor: PINK,
        borderLeftWidth: 1.5,
        paddingVertical: 8
    },
    font1: {
        color: GRAY,
        fontSize: 18,
        fontStyle: 'italic',
        marginTop: Platform.OS === 'android' ? 4 : 0
    },
    font2: {
        color: GRAY,
        fontSize: 12,
        fontStyle: 'italic',
    },
    arrow: {
        position: 'absolute',
        marginTop: Platform.OS === 'android' ? 14 : 8,
        right: 5,
    },
    x: {
        position: 'absolute',
        marginTop: Platform.OS === 'android' ? 12 : 8,
        left: 8,
    }
});

export default CreateSingleIngredient;