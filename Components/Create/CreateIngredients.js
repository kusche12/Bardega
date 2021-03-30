import React from 'react';
import { Text, TouchableWithoutFeedback, View, ScrollView } from 'react-native';
import CreateAddIngredient from './CreateAddIngredient';
import CreateSingleIngredient from './CreateSingleIngredient';
import CreateStyles from '../../Styles/CreateStyles';

// TODO: If the ingredients array is empty, render the first page of the Adobe XD
const CreateIngredients = ({ingredients, setIngredients, updateIngredient, updateIngredientType, deleteIngredient}) => {
    console.log(ingredients);
    if (ingredients.length == 0) {
        return <Text>Loading ingredients...</Text>
    } else {
        return (
            <View style={CreateStyles.ingrContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={CreateStyles.ingrTitle}>INGREDIENTS ( </Text>
                    <Text style={CreateStyles.ingrTitle2}># of ingredients</Text>
                    <Text style={CreateStyles.ingrTitle}> )</Text>

                </View>
                <View style={CreateStyles.ingrLine}></View>
                <ScrollView scrollEnabled={false}>
                    {ingredients.map((ingredient, index) => {
                        return <CreateSingleIngredient
                            {...{ updateIngredient, ingredient, updateIngredientType, deleteIngredient, index }} key={index}
                        />
                    })}
                    <CreateAddIngredient />
                </ScrollView>
            </View>
        )
    }
}

export default CreateIngredients;