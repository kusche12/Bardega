import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import CreateStyles from '../../Styles/CreateStyles';

const drinkPrepOptions = [
    { value: 'light', label: 'Light' },
    { value: 'medium', label: 'Medium' },
    { value: 'heavy', label: 'Heavy' }
];

const CreatePrepTime = ({ drinkPrep, setDrinkPrep }) => {

    const renderOption = (option, index) => {
        // Selected
        if (option.value === drinkPrep.value) {
            return (
                <View key={index} style={[CreateStyles.tag, { opacity: 1 }]}>
                    <Text style={{ color: 'white' }}>{drinkPrep.label}</Text>
                </View>
            )
        } else {
            // Not selected
            return (
                <TouchableWithoutFeedback key={index} onPress={() => handleSelect(option)}>
                    <View style={CreateStyles.tag}>
                        <Text style={{ color: 'white' }}>{option.label}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }

    }

    // If not selected, deselect the other option and replace it with this one
    const handleSelect = (option) => {
        setDrinkPrep(option)
    }

    return (
        <View style={[CreateStyles.ingrContainer, { paddingBottom: 20 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={CreateStyles.ingrTitle}>PREP TIME</Text>
            </View>
            <View style={[CreateStyles.ingrLine, { marginBottom: 5 }]}></View>
            <View style={CreateStyles.tagContainer}>
                {drinkPrepOptions.map((option, index) => {
                    return renderOption(option, index);
                })}
            </View>
        </View>
    )
}

export default CreatePrepTime;