import React, { useState } from 'react';
import { TouchableOpacity, Text, SafeAreaView, TextInput, View, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';

// TODO: The other components
const CreateDetail = ({ route }) => {

    const [drinkName, setDrinkName] = useState('');
    const [drinkDesc, setDrinkDesc] = useState('');

    const handleCloseKeyboard = (e) => {
        if (e.nativeEvent.key === 'Enter') {
            Keyboard.dismiss();
        }
    }

    
    return (
        <SafeAreaView style={[GlobalStyles.headerSafeArea, GlobalStyles.flexCenter]}>
            <KeyboardAwareScrollView>
            <Text style={CreateStyles.title}>CREATE A COCKTAIL</Text>

            <View style={CreateStyles.inputBox}>
                <Text style={CreateStyles.title2}>Cocktail Name</Text>
                <TextInput
                    style={CreateStyles.input}
                    onChangeText={setDrinkName}
                    value={drinkName}
                    placeholder='Give your drink a name'
                    multiline={false}
                    placeholderTextColor='#b3b3b3'
                />
            </View>

            <View style={CreateStyles.inputBox}>
                <Text style={CreateStyles.title2}>Description</Text>
                <TextInput
                    style={CreateStyles.input}
                    onChangeText={setDrinkDesc}
                    value={drinkDesc}
                    placeholder='Give your drink a description'
                    multiline={true}
                        placeholderTextColor='#b3b3b3'
                        onKeyPress={(e) => handleCloseKeyboard(e)}
                />
            </View>

        </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default CreateDetail;