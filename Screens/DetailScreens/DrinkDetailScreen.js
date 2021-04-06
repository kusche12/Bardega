import React from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import DetailStyles from '../../Styles/DetailStyles';

// Temporary data for UI code
const drink = {
    "description": "We don't need a train to enjoy this play on the 20th Century Cocktail. The 21st Century Man is sweet and citrusy and less boozy for a more refreshing taste.",
    "id": "1",
    "instructions": "Combine all ingredients in a shaker. Add ice, seal, & shake vigorously for 10 secs. Strain into rocks glass over large cut ice cube.Express lemon peel over cocktail. Rub peel around rim of glass & place into drink.",
    "name": "21st Century Man",
    "prepTime": "light",
    "recipe": [{
        "amount": "1.5",
        "type": "gin",
        "unit": "oz"
    }, {
        "amount": ".75",
        "type": "fresh lemon juice",
        "unit": "oz"
    }, {
        "amount": ".5",
        "type": "sweet vermouth",
        "unit": "oz"
    }, {
        "amount": ".5",
        "type": "crème de cacao",
        "unit": "oz"
    }, {
        "amount": "",
        "type": "lemon peel",
        "unit": "garnish"
    }],
    "spirit": "gin",
    "tags": ["Sweet", "Citrusy"],
    "directions": "1. Combine gin, Camapri and Vermouth in a high ball glass filled with ice.\n2. Top with chilled tonic water and stir. \n3. Garnish with an orange twist and rosemary swig. "
};

const comments = [
        {
            commentID: 1,
            authorFirstName: 'Joe',
            authorLastName: 'Rowan',
            date: 'Feb. 19',
            text: 'Love this, made it without the orange though.'
        },
        {
            commentID: 2,
            authorFirstName: 'Allie',
            authorLastName: 'Bishop',
            date: 'Feb. 02',
            text: 'SOO easy and tasty!! :)'
        }
    ]


// TODO: Render the actual drink from the database using the route.params.drinkID
// TODO: If the drink's authorID and currently authed userID are equal. Then add an "edit drink" button / route
// TODO: Get the actual image ID from the imageID in the drink data and fire storage
// TODO: Get the actual comments using the commentID in the drink data
// TODO: Set the comment backend schema to include an authorID. This ID will access the author fName, lName, and Image
    // For UI purposes, use the schema provided below
const DrinkDetailScreen = ({ navigation, route }) => {
    // const drink = route.params.drinkID
    // const comments = (some async api call to get comments with commentID)

    const renderRecipe = () => {
        let result = [];
        for (let i = 0; i < drink.recipe.length; i++) {
            const recipe = drink.recipe[i];
            result.push(
                <View style={DetailStyles.row} key={i}>
                    <View style={DetailStyles.col1}>
                        {recipe.amount
                            ? <Text style={DetailStyles.textGray}>{recipe.amount} {recipe.unit}</Text>
                            : <Text style={DetailStyles.textGray}>{recipe.unit}</Text>
                        }
                    </View>
                    <View style={DetailStyles.col2}>
                        <Text style={DetailStyles.textBlack}>{recipe.type}</Text>
                    </View>
                </View>
            );
        }
        return result;
    }

    const renderComments = () => {
        let result = [];
        if (comments.length < 1) {
            return <Text>This drink has no comments yet! Leave the first one below :)</Text>
        } else {
            for (let i = 0; i < comments.length; i++) {
                const comment = comments[i];
                result.push(
                    <View key={i} style={DetailStyles.row}>
                        <Image source={require('./face.png')} style={DetailStyles.commentImage} />
                        <View style={DetailStyles.commentDetail}>
                            <Text>{comment.text}</Text>
                            <Text style={DetailStyles.commentText2}>- {comment.authorFirstName} {comment.authorLastName} | {comment.date}</Text>
                        </View>
                    </View>
                )
            }
            return result;
        }
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <SafeAreaView style={[GlobalStyles.headerSafeArea, CreateStyles.container]} >
                <Text style={CreateStyles.title}>{drink.name}</Text>
                <View style={DetailStyles.photoContainer}>
                    <Image source={require('./plus.png')} style={CreateStyles.plusImage} />
                </View>

                { drink.recipe && 
                <View style={CreateStyles.ingrContainer}>
                    <Text style={CreateStyles.ingrTitle}>INGREDIENTS</Text>

                    <View style={[CreateStyles.ingrLine, {marginBottom: 5}]}></View>

                    <View style={DetailStyles.recipeContainer}>
                        {renderRecipe()}
                    </View>
                </View>    
                }

                { drink.directions &&
                <View style={CreateStyles.ingrContainer}>
                    <Text style={CreateStyles.ingrTitle}>DIRECTIONS</Text>

                    <View style={[CreateStyles.ingrLine, { marginBottom: 5 }]}></View>
                    <Text style={DetailStyles.textBlack}>{drink.directions}</Text>

                </View>
                }

                <View style={CreateStyles.ingrContainer}>
                    <Text style={CreateStyles.ingrTitle}>COMMENTS</Text>

                    <View style={[CreateStyles.ingrLine, { marginBottom: 5 }]}></View>
                    {renderComments()}

                    {/* The design makes this a text input, but component should be moved to a comments page I think */}
                    {/* <View>
                        <Image source={require('./comment.png')} style={DetailStyles.commentImage} />
                        <TextInput
                            style={DetailStyles.commentInput}
                            onChangeText={setDrinkName}
                            value={drinkName}
                            placeholder='Give your drink a name'
                            multiline={false}
                            placeholderTextColor='#b3b3b3'
                        />
                    </View> */}

                </View>
                    
                

            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default DrinkDetailScreen;