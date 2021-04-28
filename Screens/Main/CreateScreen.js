import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, SafeAreaView, TextInput, View, Alert, Platform, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createDrink, updateDrink } from '../../Store/Actions/DrinkActions'
import Loading from '../../Components/Main/Loading';

import CreateIngredients from '../../Components/Create/CreateIngredients';
import CreateDirections from '../../Components/Create/CreateDirections';
import CreateTags from '../../Components/Create/CreateTags';
import CreateImage from '../../Components/Create/CreateImage';
import CreateOptionPicker from '../../Components/Create/CreateOptionPicker'
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import Styles from '../../Styles/StyleConstants';

const width = Dimensions.get('screen').width;

// TODO: Set the correct font given by Care
const CreateScreen = ({ route, tags, userID, createDrink, updateDrink, navigation, drinkError, drinkID, drinks }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [drinkName, setDrinkName] = useState('');
    const [drinkDesc, setDrinkDesc] = useState('');
    const [drinkImage, setDrinkImage] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [direction, setDirection] = useState(null);
    const [drinkPrep, setDrinkPrep] = useState({ value: 'light', label: 'Light' });
    const [drinkStrength, setDrinkStrength] = useState({ value: 'virgin', label: 'Virgin' });
    const [selectedTags, setSelectedTags] = useState([]);

    // Incase you need to test more create screen stuff
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
        if (route.params.drink && tags) {
            const edit = route.params.drink;
            let ingrObject = getIngredients(edit.recipe);

            setDrinkName(edit.name)
            setDrinkDesc(edit.description)
            setDrinkImage(edit.imageURL)
            setIngredients(ingrObject)
            setDirection(edit.instructions)
            setDrinkPrep(edit.prepTime)
            setDrinkStrength(edit.strength)
            setSelectedTags(edit.tags)
        }
        setIsLoading(false);
    }, [route, tags])

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

            let image = await convertImage();

            // If drink was passed in, then update it
            // Else, then create it
            if (route.params.drink) {
                const edit = route.params.drink;
                console.log(drinkStrength)
                await updateDrink({
                    id: edit.id,
                    authorID: userID,
                    description: drinkDesc,
                    image: image,
                    instructions: direction,
                    name: drinkName,
                    prepTime: drinkPrep,
                    drinkStrength: drinkStrength,
                    recipe: ingredients,
                    tags: selectedTags
                });
            } else {
                await createDrink({
                    authorID: userID,
                    description: drinkDesc,
                    image: image,
                    instructions: direction,
                    name: drinkName,
                    prepTime: drinkPrep,
                    drinkStrength: drinkStrength,
                    recipe: ingredients,
                    tags: selectedTags
                });
            }
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
        return <Loading />
    } else {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <SafeAreaView style={[GlobalStyles.headerSafeArea, CreateStyles.container]}>

                    <Text style={GlobalStyles.title1}>CREATE A COCKTAIL</Text>

                    <View style={CreateStyles.inputBox}>
                        <Text style={GlobalStyles.title2}>Cocktail Name</Text>
                        <TextInput
                            style={[GlobalStyles.paragraph1, { color: Styles.GRAY, width: Styles.width * .9, textAlign: 'center' }]}
                            onChangeText={setDrinkName}
                            value={drinkName}
                            placeholder='Give your drink a name'
                            multiline={false}
                            placeholderTextColor={Styles.GRAY}
                        />
                    </View>

                    <View style={CreateStyles.inputBox}>
                        <Text style={GlobalStyles.title2}>Description</Text>
                        <TextInput
                            style={[GlobalStyles.paragraph1, { color: Styles.GRAY, width: Styles.width * .9, textAlign: 'center' }]}
                            onChangeText={setDrinkDesc}
                            value={drinkDesc}
                            placeholder='Give your drink a description'
                            multiline={true}
                            blurOnSubmit={true}
                            placeholderTextColor={Styles.GRAY}
                        />
                    </View>

                    <CreateImage {...{ drinkImage, setDrinkImage }} />

                    <CreateIngredients {...{ ingredients, setIngredients }} />

                    <CreateDirections {...{ direction, setDirection }} />

                    <CreateOptionPicker item={drinkPrep} setItem={setDrinkPrep} itemType='PREP TIME' />

                    <CreateOptionPicker item={drinkStrength} setItem={setDrinkStrength} itemType='STRENGTH LEVEL' />

                    <CreateTags {...{ tags, setSelectedTags, selectedTags }} />

                    <TouchableWithoutFeedback onPress={() => handleSubmit()}>
                        <View style={CreateStyles.submitBtn}>
                            <Text style={[GlobalStyles.title2, { color: 'white' }]}>Submit Drink</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {drinkError &&
                        <Text style={{ color: 'red', textAlign: 'center', width: width * .8, marginBottom: 20 }}>{drinkError}</Text>
                    }

                </SafeAreaView>
            </KeyboardAwareScrollView>
        );
    }
}

const getIngredients = (ingredients) => {
    let result = [];
    for (let i = 0; i < ingredients.length; i++) {
        let curr = { ...ingredients[i] };
        if (ingredients[i].id === undefined) {
            curr.id = '' + i;
        }
        result.push(curr)
    }
    return result;
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
        createDrink: (drink) => dispatch(createDrink(drink)),
        updateDrink: (drink) => dispatch(updateDrink(drink))
    }
}

export default compose(
    firestoreConnect(() => ['tags', 'drinks']),
    connect(mapStateToProps, mapDispatchToProps)
)(CreateScreen);