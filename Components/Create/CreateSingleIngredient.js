import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableWithoutFeedback, Platform } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import SegmentedPicker from 'react-native-segmented-picker';
import { AntDesign, Feather } from '@expo/vector-icons';
import PickerOptions from '../../API/pickerOptions';

const WIDTH = Dimensions.get('screen').width;

const CreateSingleIngredient = ({ ingredient, updateIngredient, index, updateIngredientType, deleteIngredient }) => {

    const [showPicker, setShowPicker] = useState(false);

    // Handle update for the amount and unit of the ingredient
    const onPickerConfirm = (selections) => {
        let newInt = selections.column1.label;
        let fraction = selections.column2.label;
        let newUnit = selections.column3.label;

        let newAmount = '' + (parseInt(newInt, 10) + fractionToDec(fraction));

        updateIngredient(newAmount, newUnit, ingredient.type, index);
        setShowPicker(false);
    }

    const renderIngredientAmount = () => {
        if (ingredient.amount !== '') {
            const amount = parseFloat(ingredient.amount, 10);
            if (amount < 1) {
                // Render normal sized fraction
                return <Text style={styles.font1}>{decToFraction(amount)}</Text>
            } else if (amount > 1) {
                // Render normal sized int and small fraction
                return <View style={styles.fractionWrapper}>
                    <Text style={styles.font1}>{Math.trunc(amount)}</Text>
                    <Text style={styles.font2}>{decToFraction(amount % 1)}</Text>
                </View>
            } else {
                // Render normal sized 1
                return <Text style={styles.font1}>{amount}</Text>
            }
        }
    }

    return (
        <View style={styles.container}>
            <Grid>
                {/* Amount and Unit */}
                <Col size={2}>
                    <TouchableWithoutFeedback onPress={() => setShowPicker(!showPicker)}>
                        <View style={styles.amount}>
                            {renderIngredientAmount()}
                            <Text style={styles.font2}> </Text>
                            <Text style={styles.font2}>{ingredient.unit}</Text>
                            {/* <AntDesign name="down" size={18} color="#a1a1a1" style={styles.arrow} /> */}
                        </View>
                    </TouchableWithoutFeedback>
                </Col>

                {/* Ingredient type */}
                <Col size={4}>
                    <View style={styles.ingredient}>
                        <TextInput
                            style={styles.ingredientText}
                            value={ingredient.type}
                            onChangeText={(text) => updateIngredientType(text, index)}
                        />
                    </View>
                </Col>
                <Col size={1}>
                    <View style={styles.delete}>
                        <TouchableWithoutFeedback onPress={() => deleteIngredient(ingredient.id)}>
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
                options={PickerOptions}
                defaultSelections={{ column1: ingredient.amount, column2: ingredient.amount, column3: ingredient.unit }}
                toolbarBackground={PINK}
                toolbarBorderColor={PINK}
                confirmTextColor="white"
            />
        </View>
    );
}

// Helper function to turn fraction string into a decimal number
const fractionToDec = (fract) => {
    switch (fract) {
        case ' ':
            return 0;
        case '1/8':
            return .125;
        case '1/4':
            return .25;
        case '1/3':
            return .33;
        case '1/2':
            return .5;
        case '2/3':
            return .66;
        case '3/4':
            return .75;
        default:
            return 0;
    }
}

// Helper function to do the opposite
const decToFraction = (dec) => {
    if (.32 < dec && dec < .34) {
        dec = .33;
    } else if (.65 < dec && dec < .67) {
        dec = .66;
    }
    switch (dec) {
        case .125:
            return '1/8';
        case .25:
            return '1/4';
        case .33:
            return '1/3';
        case .5:
            return '1/2';
        case .66:
            return '2/3';
        case .75:
            return '3/4';
        default:
            return '';
    }
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
    fractionWrapper: {
        flexDirection: 'row',
        alignItems: 'baseline',
        overflow: 'hidden'
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