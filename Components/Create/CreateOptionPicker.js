import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import Styles from '../../Styles/StyleConstants';

// Options for drinks
const drinkPrepOptions = [
    { value: 'light', label: 'Light' },
    { value: 'medium', label: 'Medium' },
    { value: 'heavy', label: 'Heavy' }
];

const strengthOptions = [
    { value: 'virgin', label: 'Virgin' },
    { value: 'light', label: 'Light' },
    { value: 'medium', label: 'Medium' },
    { value: 'strong', label: 'Strong' },
    { value: 'very_strong', label: 'Very Strong' }
];

// Options for spirits
const priceOptions = [
    { value: 'affordable', label: 'Affordable' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'treat', label: 'Treat yo self' },
];

const drinkOptions = [
    { value: 'mixing', label: 'Mixing' },
    { value: 'sipping', label: 'Sipping' },
    { value: 'cooking', label: 'Cooking' },
];

const availableOptions = [
    { value: 'limited', label: 'Limited' },
    { value: 'regional', label: 'Regional' },
    { value: 'national', label: 'National' },
];

const spiritOptions = [
    { value: 'gin', label: 'Gin' },
    { value: 'tequila', label: 'Tequila' },
    { value: 'mezcal', label: 'Mezcal' },
    { value: 'vodka', label: 'Vodka' },
    { value: 'bourbon', label: 'Bourbon' },
    { value: 'rum', label: 'Rum' },
    { value: 'absinthe', label: 'Absinthe' },
    { value: 'brandy', label: 'Brandy' },
    { value: 'vermouth', label: 'Vermouth' },
    { value: 'scotch', label: 'Scotch' },
    { value: 'irish_whiskey', label: 'Irish Whiskey' },
    { value: 'rye_whiskey', label: 'Rye Whiskey' },
];

const CreateOptionPicker = ({ item, setItem, itemType }) => {
    const renderOption = (option, index) => {
        // Selected
        if (option.value === item.value) {
            return (
                <View key={index} style={CreateStyles.tag}>
                    <Text style={[GlobalStyles.paragraph3, { color: 'white' }]}>{item.label}</Text>
                </View>
            )
        } else {
            // Not selected
            return (
                <TouchableWithoutFeedback key={index} onPress={() => setItem(option)}>
                    <View style={[CreateStyles.tag, CreateStyles.unselectedTag]}>
                        <Text style={[GlobalStyles.paragraph3, { color: Styles.ADA_DARK_PINK }]}>{option.label}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }

    }

    const renderItemType = () => {
        let result = [];
        if (itemType === 'PREP TIME') {
            drinkPrepOptions.map((option, index) => {
                result.push(renderOption(option, index));
            })
        } else if (itemType === 'STRENGTH LEVEL') {
            strengthOptions.map((option, index) => {
                result.push(renderOption(option, index));
            })
        } else if (itemType === 'PRICE') {
            priceOptions.map((option, index) => {
                result.push(renderOption(option, index));
            })
        } else if (itemType === 'DRINKABILITY') {
            drinkOptions.map((option, index) => {
                result.push(renderOption(option, index));
            })
        } else if (itemType === 'AVAILABILITY') {
            availableOptions.map((option, index) => {
                result.push(renderOption(option, index));
            })
        } else if (itemType === 'SPIRIT TYPE') {
            spiritOptions.map((option, index) => {
                result.push(renderOption(option, index));
            })
        }
        return result;
    }

    return (
        <View style={[CreateStyles.ingrContainer, { paddingBottom: 20 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={GlobalStyles.titlebold2}>{itemType}</Text>
            </View>
            <View style={[GlobalStyles.line, { marginBottom: 8 }]}></View>
            <View style={CreateStyles.tagContainer}>
                {renderItemType()}
            </View>
        </View>
    )
}

export default CreateOptionPicker;