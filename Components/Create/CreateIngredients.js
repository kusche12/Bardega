import React from 'react';
import { Text, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import Images from '../../Images/Images'
import CreateAddIngredient from './CreateAddIngredient';
import CreateSingleIngredient from './CreateSingleIngredient';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';

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
                    <Text style={CreateStyles.ingrTitle}>INGREDIENTS</Text>
                    <View style={CreateStyles.ingrLine}></View>
                    <View style={[GlobalStyles.flexCenter, { bottom: 20 }]}>
                        <Image source={Images.profile.plus} style={CreateStyles.plusImage} />
                        <Text style={CreateStyles.photoText}>Add ingredients here</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    } else {
        return (
            <View style={CreateStyles.ingrContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={CreateStyles.ingrTitle}>INGREDIENTS ( </Text>
                    <Text style={CreateStyles.ingrTitle2}>what are we drinking?</Text>
                    <Text style={CreateStyles.ingrTitle}> )</Text>
                </View>

                <View style={CreateStyles.ingrLine}></View>

                <View style={CreateStyles.ingrsubTitle}>
                    <Text style={CreateStyles.ingrsubText}>Quantity - Ex: 2 TBS</Text>
                    <Text style={CreateStyles.ingrsubText}>          </Text>
                    <Text style={CreateStyles.ingrsubText}>Ingredient - Ex: Tonic Water</Text>
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