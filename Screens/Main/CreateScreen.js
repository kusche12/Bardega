import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, SafeAreaView, TextInput, View, Alert, Platform, Dimensions } from 'react-native';
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

const width = Dimensions.get('screen').width;

// TODO: Set the correct font given by Care
const CreateScreen = ({ route, tags, userID, createDrink, navigation, drinkError, drinkID, drinks }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [drinkName, setDrinkName] = useState('');
    const [drinkDesc, setDrinkDesc] = useState('');
    const [drinkImage, setDrinkImage] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [direction, setDirection] = useState(null);
    const [drinkPrep, setDrinkPrep] = useState({ value: 'light', label: 'Light' });
    const [selectedTags, setSelectedTags] = useState([]);

    // const [isLoading, setIsLoading] = useState(true);
    // const [drinkName, setDrinkName] = useState('Test');
    // const [drinkDesc, setDrinkDesc] = useState('Test');
    // const [drinkImage, setDrinkImage] = useState(null);
    // const [ingredients, setIngredients] = useState([{ amount: '1.5', type: 'gin', unit: 'oz' }]);
    // const [direction, setDirection] = useState('Test directions');
    // const [drinkPrep, setDrinkPrep] = useState({ value: 'light', label: 'Light' });
    // const [selectedTags, setSelectedTags] = useState([{ name: 'Sweet', id: 'Lm6VhXQcHuDGaTHZc9kt' }]);

    // If this screen is coming from an "edit drink" button, 
    // then load the state with all of the drink's data
    // Also make sure to clean the data so that this screen is prepared to edit it
    useEffect(() => {
        console.log('edit drink')
        if (route.params.drink) {
            const edit = route.params.drink;
            let prepObject = getPrep(edit.prepTime);
            let tagObject = getTags(edit.tags, tags);
            let ingrObject = getIngredients(edit.recipe);

            // setDrinkName(edit.name)
            // setDrinkDesc(edit.desc)
            // setDrinkImage(edit.imageURL)
            // setIngredients(ingrObject)
            // setDirection(edit.instructions)
            // setDrinkPrep(prepObject)
            // setSelectedTags(tagObject)
        }
        setIsLoading(false);
    }, [route])

    // Update application state if there is a drink error message or
    // Navigate to drink detail as soon as there is a drinkID in the screen's state
    useEffect(() => {
        if (drinkID) {
            const drink = drinks[drinkID];
            navigation.navigate('DrinkDetailScreen', { drink: drink });
        } else if (drinkError) {
            console.log("THERE WAS AN ERROR IN THE CREATE SCREEN")
        }
    }, [drinkID, drinkError])

    // Handle the submission of the drink
    const handleSubmit = async () => {
        if (drinkName.length < 1) {
            return Alert.alert(
                "Hang on!",
                "You must give your drink a name before submitting.",
                [
                    {
                        text: "Okay",
                        onPress: console.log("Okay pressed")
                    }
                ],
                { cancelable: true }
            );
        } else {
            let formatTags = [];
            for (let i = 0; i < selectedTags.length; i++) {
                formatTags.push(selectedTags[i].name);
            }

            let image = await convertImage();

            await createDrink({
                authorID: userID,
                description: drinkDesc,
                image: image,
                instructions: direction,
                name: drinkName,
                prepTime: drinkPrep.value,
                recipe: ingredients,
                tags: formatTags
            });
        }
    }

    // Handler that prepares the drink image to be sent to firestorage
    const convertImage = async () => {
        if (drinkImage === null) {
            return null;
        }
        const response = await fetch(drinkImage);
        const blob = await response.blob();
        return blob;
    }

    // Give the tags some time to load from firestore
    if (tags === undefined || isLoading) {
        return <Text>Loading...</Text>
    } else {

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

                    <CreateIngredients {...{ ingredients, setIngredients }} />

                    <CreateDirections {...{ direction, setDirection }} />

                    <CreatePrepTime {...{ drinkPrep, setDrinkPrep }} />

                    <CreateTags {...{ tags, setSelectedTags, selectedTags }} />

                    <TouchableWithoutFeedback onPress={() => handleSubmit()}>
                        <View style={CreateStyles.submitBtn}>
                            <Text style={[CreateStyles.ingrTitle, { color: 'white' }]}>Submit Drink</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {drinkError &&
                        <Text style={{ color: 'red', textAlign: 'center', width: width * .8 }}>{drinkError}</Text>
                    }

                </SafeAreaView>
            </KeyboardAwareScrollView>
        );
    }
}

const getPrep = (prepTime) => {
    let prepObject;
    switch (prepTime) {
        case 'light':
            prepObject = { value: 'light', label: 'Light' };
            break;
        case 'medium':
            prepObject = { value: 'medium', label: 'Medium' };
            break;
        case 'heavy':
            prepObject = { value: 'heavy', label: 'Heavy' };
            break;
        default:
            prepObject = { value: 'light', label: 'Light' };
    }
    return prepObject;
}

const getTags = (drinkTags, allTags) => {
    let selectedTags = [];
    for (let i = 0; i < drinkTags.length; i++) {
        for (let j = 0; j < allTags.length; j++) {
            if (drinkTags[i] === allTags[j].name) {
                selectedTags.push(allTags[j]);
            }
        }
    }
    return selectedTags;
}

const getIngredients = (ingredients) => {
    let result = [];
    for (let i = 0; i < ingredients.length; i++) {
        result.push(ingredients[i]);
        if (ingredients[i].id === undefined) {
            result[i].id = '' + i;
        }
    }
    return ingredients;
}

const mapStateToProps = (state) => {
    return {
        userID: state.firebase.auth.uid,
        tags: state.firestore.ordered.tags,
        drinks: state.firestore.data.drinks,
        drinkError: state.drink.drinkError,
        drinkID: state.drink.drinkID,
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        createDrink: (drink) => dispatch(createDrink(drink))
    }
}

export default compose(
    firestoreConnect(() => ['tags', 'drinks']),
    connect(mapStateToProps, mapDispatchToProps)
)(CreateScreen);