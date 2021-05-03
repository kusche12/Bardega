import React from 'react';
import { View, Text } from 'react-native';
import CreateStyles from '../../Styles/CreateStyles';
import DetailStyles from '../../Styles/DetailStyles';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const StrengthAndPrep = ({ strength, prepTime }) => {

    // Renders 13 little boxes. Colors in the ones on the left according to either the strength or prep
    // level passed into it
    const renderBars = (type, amount) => {
        let filledInBoxes = getBoxes(type, amount);
        let res = [];
        for (let i = 0; i < 13; i++) {
            if (i < filledInBoxes) {
                res.push(
                    <View key={i} style={[DetailStyles.levelBox, DetailStyles.levelBoxFull]}></View>
                )
            } else if (i > filledInBoxes) {
                res.push(
                    <View key={i} style={DetailStyles.levelBox}></View>
                )
            } else {
                res.push(
                    <View key={i} style={{ flexDirection: 'column' }}>
                        <View style={[DetailStyles.levelBox, DetailStyles.levelBoxFull]}></View>
                        <Text style={[GlobalStyles.titlebold3, { position: 'absolute', width: Styles.width * .5, top: 33, left: i * -2.6 }]}>{amount.label}</Text>
                    </View>
                )
            }
        }
        return (
            <View style={{ flexDirection: 'row' }}>
                {res}
            </View>
        )
    }
    return (
        <View style={[CreateStyles.ingrContainerWide, { paddingHorizontal: 30 }]}>
            <Text style={[GlobalStyles.titlebold2, { alignSelf: 'flex-start' }]}>STRENGTH</Text>
            {renderBars('strength', strength)}

            <View style={{ marginBottom: 40 }}></View>

            <Text style={[GlobalStyles.titlebold2, { alignSelf: 'flex-start' }]}>PREP TIME</Text>
            {renderBars('prep', prepTime)}

            <View style={{ marginBottom: 20 }}></View>
        </View>
    )
}

// Helper function that decides the number of boxes filled in according to the type and amount
// of the prep or strength level
const getBoxes = (type, amount) => {
    if (type === 'strength') {
        switch (amount.value) {
            case 'virgin':
                return 0;
            case 'light':
                return 3;
            case 'medium':
                return 6;
            case 'strong':
                return 9;
            case 'very_strong':
                return 12;
            default:
                return 1;
        }
    } else {
        switch (amount.value) {
            case 'light':
                return 0;
            case 'medium':
                return 6;
            case 'heavy':
                return 12;
            default:
                return 1;
        }
    }
}

export default StrengthAndPrep;
