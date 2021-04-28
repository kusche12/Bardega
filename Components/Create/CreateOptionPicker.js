import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';

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

const CreateOptionPicker = ({ item, setItem, itemType }) => {
    const renderOption = (option, index) => {
        // Selected
        if (option.value === item.value) {
            return (
                <View key={index} style={[CreateStyles.tag, { opacity: 1 }]}>
                    <Text style={[GlobalStyles.paragraph3, { color: 'white' }]}>{item.label}</Text>
                </View>
            )
        } else {
            // Not selected
            return (
                <TouchableWithoutFeedback key={index} onPress={() => setItem(option)}>
                    <View style={CreateStyles.tag}>
                        <Text style={[GlobalStyles.paragraph3, { color: 'white' }]}>{option.label}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }

    }

    return (
        <View style={[CreateStyles.ingrContainer, { paddingBottom: 20 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={GlobalStyles.title2}>{itemType}</Text>
            </View>
            <View style={[GlobalStyles.line, { marginBottom: 8 }]}></View>
            <View style={CreateStyles.tagContainer}>
                {itemType === 'PREP TIME'
                    ?
                    drinkPrepOptions.map((option, index) => {
                        return renderOption(option, index);

                    })
                    : strengthOptions.map((option, index) => {
                        return renderOption(option, index);
                    })
                }
            </View>
        </View>
    )
}

export default CreateOptionPicker;