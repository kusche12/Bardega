import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, TextInput } from 'react-native';
import Images from '../../Images/Images';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import Styles from '../../Styles/StyleConstants';

const CreateDirections = ({ direction, setDirection }) => {
    if (direction === null) {
        return (
            <TouchableWithoutFeedback onPress={() => setDirection('')}>
                <View style={[CreateStyles.ingrContainer, { height: 250 }]}>
                    <Text style={GlobalStyles.titlebold2}>DIRECTIONS</Text>
                    <View style={GlobalStyles.line}></View>
                    <View style={[GlobalStyles.flexCenter, { bottom: 20 }]}>
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

                <TextInput
                    style={[GlobalStyles.paragraph2, { color: Styles.GRAY, paddingBottom: 0, includeFontPadding: false, }]}
                    onChangeText={(text) => setDirection(text)}
                    value={direction}
                    placeholder='How do you make this drink?'
                    multiline={true}
                    placeholderTextColor={Styles.GRAY}
                />
            </View>
        )
    }
}

export default CreateDirections;