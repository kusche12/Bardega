import React from 'react';
import { Text, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import Images from '../../Images/Images'
import CreateAddIngredient from './CreateAddIngredient';
import CreateSingleIngredient from './CreateSingleIngredient';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import Styles from '../../Styles/StyleConstants';

const CreateIngredients = ({ ingredients, setIngredients }) => {

    // Update ingredient amount due to picker and text input
    const updateIngredient = (amount, unit, type, index, id) => {
        let newIngredients = [...ingredients];
        newIngredients[index] = {
            id: id,
            amount: amount,
            unit: unit,
            type: type,
        };
        setIngredients(newIngredients);
    };

    // Update ingredient type/text input
    const updateIngredientType = (type, index, id) => {
        let newIngredients = [...ingredients];
        newIngredients[index] = {
            id: id,
            amount: ingredients[index].amount,
            unit: ingredients[index].unit,
            type: type,
        };
        setIngredients(newIngredients);
    };

    // Delete ingredient from list
    const deleteIngredient = (id) => {
        console.log(id);
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
            type: '',
        });

        setIngredients(newIngredients);
    };

    if (ingredients.length == 0) {
        return (
            <TouchableWithoutFeedback onPress={() => addIngredient()}>
                <View style={[CreateStyles.ingrContainer, { height: 250 }]}>
                    <Text style={GlobalStyles.title2}>INGREDIENTS</Text>
                    <View style={GlobalStyles.line}></View>
                    <View style={[GlobalStyles.flexCenter, { bottom: 20 }]}>
                        <Image source={Images.profile.plus} style={CreateStyles.plusImage} />
                        <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY }]}>Add ingredients here</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    } else {
        return (
            <View style={CreateStyles.ingrContainer}>
                <Text style={GlobalStyles.title2}>INGREDIENTS</Text>

                <View style={[GlobalStyles.line, { marginBottom: 16 }]}></View>

                <View style={CreateStyles.ingrsubTitle}>
                    <Text style={[GlobalStyles.paragraph4, { color: Styles.GRAY }]}>Quantity - Ex: 2 TBS</Text>
                    <Text style={[GlobalStyles.paragraph3, { color: Styles.GRAY }]}>               </Text>
                    <Text style={[GlobalStyles.paragraph4, { color: Styles.GRAY }]}>Ingredient - Ex: Limes</Text>
                </View>
                <ScrollView scrollEnabled={false}>
                    {ingredients.map((ingredient, index) => {
                        return <CreateSingleIngredient
                            {...{
                                updateIngredient, ingredient,
                                updateIngredientType, deleteIngredient, index
                            }} key={index}
                        />
                    })}
                    <CreateAddIngredient {...{ addIngredient }} />
                </ScrollView>
            </View>
        )
    }
}

export default CreateIngredients;