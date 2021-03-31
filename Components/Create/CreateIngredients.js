import React from 'react';
import { Text, View, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import CreateAddIngredient from './CreateAddIngredient';
import CreateSingleIngredient from './CreateSingleIngredient';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';

const CreateIngredients = ({ingredients, addIngredient, updateIngredient, updateIngredientType, deleteIngredient}) => {
    if (ingredients.length == 0) {
        return (
            <TouchableWithoutFeedback onPress={() => addIngredient()}>
                <View style={[CreateStyles.ingrContainer, {height: 250}]}>
                    <Text style={CreateStyles.ingrTitle}>INGREDIENTS</Text>
                    <View style={CreateStyles.ingrLine}></View>
                    <View style={[GlobalStyles.flexCenter, {bottom: 20}]}>
                        <Image source={require('./plus.png')} style={CreateStyles.plusImage} />
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
                    <Text style={CreateStyles.ingrTitle2}># of ingredients</Text>
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
                    <CreateAddIngredient {...{addIngredient}}/>
                </ScrollView>
            </View>
        )
    }
}

export default CreateIngredients;