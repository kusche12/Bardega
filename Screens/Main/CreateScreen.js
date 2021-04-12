import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, SafeAreaView, TextInput, View, Image, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import CreateIngredients from '../../Components/Create/CreateIngredients';
import CreateDirections from '../../Components/Create/CreateDirections';
import CreateTags from '../../Components/Create/CreateTags';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';

// Dummy data for ingredients
const customIngr = [
    {
        type: 'gin',
        amount: '1.5',
        unit: 'oz',
        id: '0'
    },
    {
        type: 'fresh lemon juice',
        amount: '.75',
        unit: 'oz',
        id: '1'
    },
    {
        type: 'sweet vermouth',
        amount: '.5',
        unit: 'oz',
        id: '2'
    },
]

const customIngr2 = [];

const customTag = [
    {
        id: '1ZqnH2zScUMqkStAYb9a',
        name: 'Fruity'
    }
]

// TODO: Image handling
// TODO: Set the correct font given by Care
// TODO: Submit Drink Button (to database)
// TODO: Shrink the image on submission for faster load times and less load space
// TODO: Also make sure to set the drink's 'id' attribute equal to the one given by firebase
// TODO: Also make sure it has an AuthorID which is the ID of the currently authed user
const CreateScreen = ({ tags }) => {

    const [drinkName, setDrinkName] = useState('');
    const [drinkDesc, setDrinkDesc] = useState('');
    const [drinkImage, setDrinkImage] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [direction, setDirection] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);

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
    const updateIngredientType = (type, index) => {
        let newIngredients = [...ingredients];
        newIngredients[index] = {
            amount: ingredients[index].amount,
            unit: ingredients[index].unit,
            type: type,
            id: ingredients[index].id,
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

                <TouchableWithoutFeedback onPress={() => handleImageUpload()}>
                    <View style={CreateStyles.photoContainer}>
                        {renderDrinkContainer()}
                    </View>
                </TouchableWithoutFeedback>

                <CreateIngredients {...{
                    ingredients,
                    updateIngredient, deleteIngredient,
                    updateIngredientType, addIngredient
                }} />

                <CreateDirections {...{ direction, setDirection }} />

                <CreateTags {...{ tags, setSelectedTags, selectedTags }} />

            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        tags: state.firestore.ordered.tags,
    }
}

export default compose(
    firestoreConnect(() => ['tags']),
    connect(mapStateToProps)
)(CreateScreen);