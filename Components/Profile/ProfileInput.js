import React from 'react';
import { Text, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';
import UserStyles from '../../Styles/UserStyles';

const ProfileInput = ({ value, setValue, name, navigation }) => {
    return (
        <View style={[UserStyles.profileInputContainer, name === "Bio" && { borderBottomColor: Styles.LIGHT_GRAY, borderBottomWidth: 1 }]}>
            <View style={{ width: Styles.width * .33 }}>
                <Text style={GlobalStyles.paragraphbold1}>{name}</Text>
            </View>
            <View style={{ width: Styles.width * 20 }}>
                {name === "Bio"
                    ? <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileInputScreen', { value: value, setValue: setValue })}>
                        <Text style={GlobalStyles.paragraph1}>{value}</Text>
                    </TouchableWithoutFeedback>

                    : <TextInput
                        value={value}
                        onChangeText={setValue}
                        style={GlobalStyles.paragraph1}
                    />

                }
            </View>
        </View>
    )
}

export default ProfileInput
