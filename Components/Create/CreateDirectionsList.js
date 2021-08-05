import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, FlatList, TextInput, Platform } from 'react-native';
import Images from '../../Images/Images';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import Styles from '../../Styles/StyleConstants';

// A bulleted list where each bullet is a string in an array
// Every time the user presses enter, a new bullet is added
const CreateDirectionsList = ({ direction, setDirection }) => {

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
                <Text style={{ color: Styles.GRAY, marginTop: 6 }}>•</Text>
                <TextInput
                    style={[GlobalStyles.paragraph2, { color: Styles.GRAY, paddingBottom: 0, includeFontPadding: false, width: 240 }]}
                    onChangeText={(text) => setText(text, index)}
                    value={direction[index]}
                    multiline={true}
                    blurOnSubmit={true}
                    onSubmitEditing={handleEnter}
                    placeholderTextColor={Styles.GRAY}
                    scrollEnabled={false}
                />
                {renderClose(index)}
            </View>
        )
    }

    const setText = (text, index) => {
        const array = direction.slice();
        array[index] = text;
        setDirection(array)
    }

    const handleEnter = () => {
        const array = direction.slice();
        array.push('');
        setDirection(array);
    }

    const renderClose = (index) => {
        return (
            <TouchableWithoutFeedback onPress={() => removeItem(index)}>
                <View style={{ width: 20, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
                    <Image source={Images.close} style={{ width: 10, height: 12 }} />
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const removeItem = (index) => {
        if (index === 0 && !direction[1]) {
            setDirection(null)
        } else if (index === 0) {
            let array = direction.slice();
            let arrayMinusFirst = array.splice(1);
            setDirection(arrayMinusFirst);
        } else {
            let array = direction.slice();
            let arrayMinusOne = array.splice(index - 1, 1);
            setDirection(arrayMinusOne);
        }

    }

    if (direction === null || direction.length === 0) {
        return (
            <TouchableWithoutFeedback onPress={() => setDirection([''])}>
                <View style={[CreateStyles.ingrContainer, { height: 250 }]}>
                    <Text style={GlobalStyles.titlebold2}>DIRECTIONS</Text>
                    <View style={GlobalStyles.line}></View>
                    <View style={[GlobalStyles.flexCenter, { bottom: Platform.isPad ? 0 : 20 }]}>
                        <Image source={Images.profile.plus} style={CreateStyles.plusImage} />
                        <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY }]}>Add directions here</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    } else {
        return (
            <View style={[CreateStyles.ingrContainer, { alignItems: 'flex-start', paddingBottom: 50 }]}>
                <Text style={[GlobalStyles.titlebold2, { alignSelf: 'center' }]}>DIRECTIONS</Text>

                <View style={GlobalStyles.line}></View>

                <FlatList
                    data={direction}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => '' + index}
                />

            </View>
        )
    }
}

export default CreateDirectionsList;