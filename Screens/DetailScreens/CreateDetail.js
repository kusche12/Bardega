import React, { useState } from 'react';
import { TouchableWithoutFeedback, Text, SafeAreaView, TextInput, View, Image, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CreateIngredients from '../../Components/Create/CreateIngredients';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';

// Dummy data for ingredients
const customIngr = [
    {
        type: 'gin',
        amount: 1.5,
        unit: 'oz'
    },
    {
        type: 'fresh lemon juice',
        amount: .75,
        unit: 'oz'
    },
    {
        type: 'sweet vermouth',
        amount: .5,
        unit: 'oz'
    },
]


const CreateDetail = ({ route }) => {

    const [drinkName, setDrinkName] = useState('');
    const [drinkDesc, setDrinkDesc] = useState('');
    const [drinkImage, setDrinkImage] = useState(null);
    const [ingredients, setIngredients] = useState(customIngr);

    // Renders the image container with either an empty box or the picture of the drink
    const renderDrinkContainer = () => {
        if (drinkImage === null) {
            return (
                <View style={GlobalStyles.flexCenter}>
                    <Image source={require('./plus.png')} style={CreateStyles.plusImage} />
                    <Text style={CreateStyles.photoText}>Add photo from photo album</Text>
                </View>
            );
        } else {
            return (
                <Image />
            )
        }
    }

    const handleImageUpload = () => {
        console.log('hey')
    }

    // Update ingredient amount due to picker and text input
    const updateIngredient = (amount, unit, type, index) => {
        let newIngredients = [...ingredients];
        newIngredients[index] = {
            amount: amount,
            unit: unit,
            type: type,
        };
        setIngredients(newIngredients);
    };

    // Update ingredient type/text input
    const updateIngredientType = (type, index, newId) => {
        let newIngredients = [ingredients];
        newIngredients[index] = {
            amount: ingredients[index].amount,
            unit: ingredients[index].unit,
            ingredient: type,
            id: newId,
        };
        setIngredients(newIngredients);
    };

    const deleteIngredient = (list, id) => {
        let newIngredients = ingredients.filter(ing => ing.id !== id);
        setIngredients(newIngredients);
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <SafeAreaView style={[GlobalStyles.headerSafeArea, CreateStyles.container]}>
            
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
                    />
                </View>

                <TouchableWithoutFeedback onPress={() => handleImageUpload()}>
                    <View style={CreateStyles.photoContainer}>
                        {renderDrinkContainer()}
                    </View>
                </TouchableWithoutFeedback>

                <CreateIngredients {...{ingredients, setIngredients, updateIngredient, deleteIngredient, updateIngredientType}} />
        
                </SafeAreaView>
            </KeyboardAwareScrollView>
    );
}

export default CreateDetail;