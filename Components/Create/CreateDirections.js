import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';

const CreateDirections = ({ direction, setDirection }) => {
    if (direction === null) {
        return (
            <TouchableWithoutFeedback onPress={() => setDirection('')}>
                <View style={[CreateStyles.ingrContainer, { height: 250 }]}>
                    <Text style={CreateStyles.ingrTitle}>DIRECTIONS</Text>
                    <View style={CreateStyles.ingrLine}></View>
                    <View style={[GlobalStyles.flexCenter, { bottom: 20 }]}>
                        <Image source={require('./plus.png')} style={CreateStyles.plusImage} />
                        <Text style={CreateStyles.photoText}>Add directions here</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    } else {
        return (
            <View style={[CreateStyles.ingrContainer, { alignItems: 'flex-start', paddingBottom: 50 }]}>
                <Text style={[CreateStyles.ingrTitle, { alignSelf: 'center' }]}>DIRECTIONS</Text>

                <View style={[CreateStyles.ingrLine, { marginBottom: 5 }]}></View>

                <TextInput
                    style={CreateStyles.dirInput}
                    onChangeText={(text) => setDirection(text)}
                    value={direction}
                    placeholder='How do you make this drink?'
                    multiline={true}
                    placeholderTextColor='#b3b3b3'
                />
            </View>
        )
    }
}

export default CreateDirections;