import React, { useState } from 'react';
import { TouchableWithoutFeedback, Text, SafeAreaView, TextInput, View, Alert, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createDrink } from '../../Store/Actions/DrinkActions'

import CreateIngredients from '../../Components/Create/CreateIngredients';
import CreateDirections from '../../Components/Create/CreateDirections';
import CreateTags from '../../Components/Create/CreateTags';
import CreateImage from '../../Components/Create/CreateImage';
import CreatePrepTime from '../../Components/Create/CreatePrepTime'
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';

// TODO: Set the correct font given by Care
// TODO: Submit Drink Button (to database)
// TODO: Shrink the image on submission for faster load times and less load space
// TODO: Also make sure to set the drink's 'id' attribute equal to the one given by firebase
// TODO: Also make sure it has an AuthorID which is the ID of the currently authed user
const CreateScreen = ({ tags, authID }) => {

    const [drinkName, setDrinkName] = useState('');
    const [drinkDesc, setDrinkDesc] = useState('');
    const [drinkImage, setDrinkImage] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [direction, setDirection] = useState(null);
    const [drinkPrep, setDrinkPrep] = useState({ value: 'light', label: 'Light' });
    const [selectedTags, setSelectedTags] = useState([]);

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
    const updateIngredientType = (type, index) => {
        let newIngredients = [...ingredients];
        newIngredients[index] = {
            amount: ingredients[index].amount,
            unit: ingredients[index].unit,
            type: type,
        };
        setIngredients(newIngredients);
    };

    // Delete ingredient from list
    const deleteIngredient = (id) => {
        let newIngredients = ingredients.filter(ing => ing.id !== id);
        setIngredients(newIngredients);
    }

    // Add new item to the ingredients list
    const addIngredient = () => {
        let newId = -1;
        // Find the largest ID (as to not copy the others)
        ingredients.forEach(ing => {
            newId = Math.max(parseInt(ing.id, 10), newId);
        });

        newId++;
        newId = '' + newId;

        let newIngredients = ingredients.concat({
            id: newId,
            amount: '0',
            unit: ' ',
            ingredient: '',
        });

        setIngredients(newIngredients);
    };

    // Handle the submission of the drink
    const handleSubmit = () => {
        console.log('handle submit')
        // console.log(drinkDesc);
        // if (drinkName.length < 1) {
        //     return Alert.alert(
        //         "Hang on!",
        //         "You must give your drink a name before submitting.",
        //         [
        //             {
        //                 text: "Okay",
        //                 onPress: console.log("Okay pressed")
        //             }
        //         ],
        //         { cancelable: true }
        //     );
        // } else {
        let formatTags = [];
        for (let i = 0; i < selectedTags.length; i++) {
            formatTags.push(selectedTags[i].name);
        }
        createDrink({
            authorID: authID,
            description: drinkDesc,
            image: drinkImage,
            instructions: direction,
            name: drinkName,
            prepTime: drinkPrep.value,
            recipe: ingredients,
            tags: formatTags
        })
        // }
    }

    // Give the tags some time to load from firestore
    if (tags === undefined) {
        return <Text>Loading...</Text>
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

                <CreateImage {...{ drinkImage, setDrinkImage }} />

                <CreateIngredients {...{
                    ingredients,
                    updateIngredient, deleteIngredient,
                    updateIngredientType, addIngredient
                }} />

                <CreateDirections {...{ direction, setDirection }} />

                <CreatePrepTime {...{ drinkPrep, setDrinkPrep }} />

                <CreateTags {...{ tags, setSelectedTags, selectedTags }} />

                <TouchableWithoutFeedback onPress={() => handleSubmit()}>
                    <View style={CreateStyles.submitBtn}>
                        <Text style={[CreateStyles.ingrTitle, { color: 'white' }]}>Submit Drink</Text>
                    </View>
                </TouchableWithoutFeedback>

            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        authID: state.firebase.auth.uid,
        tags: state.firestore.ordered.tags,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createDrink: (drink) => dispatch(createDrink(drink))
    }
}

export default compose(
    firestoreConnect(() => ['tags']),
    connect(mapStateToProps, mapDispatchToProps)
)(CreateScreen);