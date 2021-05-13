import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, SafeAreaView, TextInput, View, Alert, Platform, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { createDrink, updateDrink } from '../../Store/Actions/DrinkActions';
import CreateDirectionsList from '../../Components/Create/CreateDirectionsList';

import CreateIngredients from '../../Components/Create/CreateIngredients';
import CreateTags from '../../Components/Create/CreateTags';
import CreateImage from '../../Components/Create/CreateImage';
import CreateOptionPicker from '../../Components/Create/CreateOptionPicker'
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import Styles from '../../Styles/StyleConstants';

const CreateScreen = ({ route, tags, userID, createDrink, updateDrink, navigation, drinkError, drinkID, drinks }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [drinkName, setDrinkName] = useState('');
    const [drinkDesc, setDrinkDesc] = useState('');
    const [drinkImage, setDrinkImage] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [direction, setDirection] = useState(null);
    const [drinkPrep, setDrinkPrep] = useState({ value: 'light', label: 'Light' });
    const [drinkStrength, setDrinkStrength] = useState({ value: 'virgin', label: 'Virgin' });
    const [selectedTags, setSelectedTags] = useState([]);

    // If this screen is coming from an "edit drink" button, 
    // then load the state with all of the drink's data
    // Also make sure to clean the data so that this screen is prepared to edit it
    useEffect(() => {
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
            navigation.navigate('DrinkDetailScreen', { drink });
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
            setIsUploading(true);
            let image = await convertImage();

            // If drink was passed in, then update it
            // Else, then create it
            if (route.params.drink) {
                const edit = route.params.drink;
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
        setIsUploading(false);
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
    if (!tags || isLoading) {
        return null;
    } else {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <SafeAreaView style={[GlobalStyles.headerSafeArea, CreateStyles.container]}>

                    <Text style={GlobalStyles.titlebold1}>CREATE A COCKTAIL</Text>

                    <View style={CreateStyles.inputBox}>
                        <Text style={GlobalStyles.titlebold2}>Cocktail Name</Text>
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
                        <Text style={GlobalStyles.titlebold2}>Description</Text>
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

                    <CreateDirectionsList {...{ direction, setDirection }} />

                    <CreateOptionPicker item={drinkStrength} setItem={setDrinkStrength} itemType='STRENGTH LEVEL' />

                    <CreateOptionPicker item={drinkPrep} setItem={setDrinkPrep} itemType='PREP TIME' />

                    <CreateTags {...{ tags, setSelectedTags, selectedTags }} />

                    <TouchableWithoutFeedback disabled={isUploading} onPress={() => handleSubmit()}>
                        <View style={CreateStyles.submitBtn}>
                            {isUploading
                                ? <ActivityIndicator size="small" color='white' />
                                : <Text style={[GlobalStyles.titlebold2, { color: 'white' }]}>Submit Drink</Text>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                    {drinkError &&
                        <Text style={{ color: 'red', textAlign: 'center', width: Styles.width * .8, marginBottom: 20 }}>{drinkError}</Text>
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