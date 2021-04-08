import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import GlobalStyles from '../../Styles/GlobalStyles';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getRandomQueries, getDrinksWithQuery } from '../../Functions/drinkFunctions';
import HorizontalList from '../../Components/Discover/HorizontalList';
import DiscoverStyles from '../../Styles/DiscoverStyles';

// Dummy data for testing purposes
const TEST_DATA = [{
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
    "tags": ["Sweet", "Citrusy"]
}, {
    "description": "Take flight with this classic floral and citrusy gin-based cocktail. Disclaimer: this drink does not, in fact, give you wings. ",
    "id": "2",
    "instructions": "Combine all ingredients in a shaker. Add ice, seal, & shake vigorously for 10 secs. Double strain into coupe glass.Garnish with cherry or express lemon peel over cocktail. Rub peel around rim of glass & place into drink.",
    "name": "Aviation",
    "prepTime": "light",
    "recipe": [{
        "amount": "2",
        "type": "gin",
        "unit": "oz"
    }, {
        "amount": ".75",
        "type": "fresh lemon juice",
        "unit": "oz"
    }, {
        "amount": ".5",
        "type": "maraschino liqueur (Luxardo preferably)",
        "unit": "oz"
    }, {
        "amount": ".5",
        "type": "crème de violette",
        "unit": "oz"
    }, {
        "amount": "",
        "type": "cherry or lemon twist garnish ",
        "unit": "garnish"
    }],
    "spirit": "gin",
    "tags": ["Herbaceous", "Citrusy", "Floral"]
}, {
    "description": "Feel \"Bad and Boujee\" with this gin or vodka-based cocktail that adds a refreshing and unique kick with kombucha and blueberries. ",
    "id": "3",
    "instructions": "Muddle blueberries directly in wine glass. Add all remaining ingredients, except lemon wedge & club soda, to glass & stir. Top with ice & splash of club soda.  Squeeze lemon wedge in glass, discard, & stir.",
    "name": "Bad & Boochy",
    "prepTime": "medium",
    "recipe": [{
        "amount": ".5",
        "type": "gin or vodka",
        "unit": "oz"
    }, {
        "amount": ".75",
        "type": "sweet vermouth",
        "unit": "oz"
    }, {
        "amount": "3",
        "type": "kombucha (regular preferred but any flavor will do)",
        "unit": "oz"
    }, {
        "amount": "",
        "type": "club soda",
        "unit": "splash"
    }, {
        "amount": "",
        "type": "handful of blueberries",
        "unit": "small"
    }, {
        "amount": "",
        "type": "lemon wedge",
        "unit": "garnish"
    }],
    "spirit": "gin/ vodka",
    "tags": ["Bitter", "Sweet", "Citrusy"]
}, {
    "description": "We're bringing it back to the prohibition-era with the Bee's Knees, a gin-based drink that's sweet and sour and WOW is this refreshing. A classic that can be easily manipulated to your liking. Adjust the lemon & honey syrup to your preference of tartness & sweet. ",
    "id": "4",
    "instructions": "Combine all ingredients in a shaker. Add ice, seal, & shake vigorously for 10 secs. Double strain into coupe glass.Express lemon peel over cocktail. Rub peel around rim of glass & place into drink.",
    "name": "Bee's Knees",
    "prepTime": "light",
    "recipe": [{
        "amount": "2",
        "type": "gin",
        "unit": "oz"
    }, {
        "amount": "1",
        "type": "fresh lemon juice",
        "unit": "oz"
    }, {
        "amount": "1",
        "type": "honey syrup",
        "unit": "oz"
    }, {
        "amount": "",
        "type": "lemon peel",
        "unit": "garnish"
    }],
    "spirit": "gin",
    "tags": ["Sweet", "Sour"]
}, {
    "description": "Stockard Channing seal of approval, well in our minds anyway. This rum-based drink is sweet, refreshing, and sure to satisfy the needs of the pink ladies. ",
    "id": "5",
    "instructions": "Combine all ingredients in a shaker. Add ice, seal, & shake vigorously for 10 secs. Strain into collins glass. Top with ice.  Go crazy with your garnish game! Make it silly & weird. ",
    "name": "Betty Rizzo",
    "prepTime": "light",
    "recipe": [{
        "amount": "1",
        "type": "white rum",
        "unit": "oz"
    }, {
        "amount": ".75",
        "type": "aged rum",
        "unit": "oz"
    }, {
        "amount": ".75",
        "type": "Aperol or Cappelletti Aperitivo",
        "unit": "oz"
    }, {
        "amount": ".75",
        "type": "orgeat (almond syrup)",
        "unit": "oz"
    }, {
        "amount": ".75",
        "type": "fresh lime juice",
        "unit": "oz"
    }, {
        "amount": "",
        "type": "go crazy!",
        "unit": "garnish"
    }],
    "spirit": "rum",
    "tags": ["Sweet"]
}, {
    "description": "Boobles are bubbles, dirty mind. Get your bubble machine ready and your sparkling wine uncorked for this effervescent, refreshing tequila-based cocktail. ",
    "id": "6",
    "instructions": "Combine all ingredients, except sparkling wine, in a shaker. Add ice, seal, & shake vigorously for 10 secs. Double strain into flute glass & top with sparkling wine.",
    "name": "Boobles All Day",
    "prepTime": "light",
    "recipe": [{
        "amount": ".75",
        "type": "blanco tequila",
        "unit": "oz"
    }, {
        "amount": ".5",
        "type": "Cocchi Americano or Lillet Blanc",
        "unit": "oz"
    }, {
        "amount": ".5",
        "type": "dry vermouth",
        "unit": "oz"
    }, {
        "amount": ".5",
        "type": "Campari",
        "unit": "oz"
    }, {
        "amount": ".5",
        "type": "fresh lemon juice",
        "unit": "oz"
    }, {
        "amount": ".5",
        "type": "fresh orange juice",
        "unit": "oz"
    }, {
        "amount": "3-4",
        "type": "sparkling wine",
        "unit": "oz"
    }],
    "spirit": "tequila/ bubbles",
    "tags": ["Citrusy", "Bitter"]
}, {
    "description": "Named after the infamous hat-shaped diner in 1930s Los Angeles, this whiskey-based cocktail is bittersweet light and refreshing.",
    "id": "7",
    "instructions": "Combine all ingredients in a shaker. Add ice, seal, & shake vigorously for 10 secs. Double strain into coupe glass.Express grapefruit peel over cocktail. Rub peel around rim of glass & place into drink.",
    "name": "Brown Derby",
    "prepTime": "light",
    "recipe": [{
        "amount": "2",
        "type": "bourbon",
        "unit": "oz"
    }, {
        "amount": "1",
        "type": "fresh grapefruit juice",
        "unit": "oz"
    }, {
        "amount": ".5",
        "type": "honey syrup",
        "unit": "oz"
    }, {
        "amount": "2",
        "type": "Angostura bitters",
        "unit": "dashes"
    }, {
        "amount": "",
        "type": "grapefruit peel",
        "unit": "garnish"
    }],
    "spirit": "bourbon",
    "tags": ["Sweet", "Bitter"]
}, {
    "description": "Any time is a good time for bubbles, especially with this spin on the Boulevardier. This whiskey-based cocktail is bittersweet and refreshing. ",
    "id": "8",
    "instructions": "Add bourbon, Aperol, & sweet vermouth directly into wine glass.Top with club soda & sparkling wine. Fill glass with ice.Express orange peel over cocktail.Rub peel around rim of glass & place into drink.",
    "name": "Bubbles Blvd",
    "prepTime": "light",
    "recipe": [{
        "amount": ".75",
        "type": "bourbon",
        "unit": "oz"
    }, {
        "amount": ".75",
        "type": "Aperol",
        "unit": "oz"
    }, {
        "amount": ".75",
        "type": "sweet vermouth",
        "unit": "oz"
    }, {
        "amount": "2",
        "type": "sparkling wine",
        "unit": "oz"
    }, {
        "amount": "2",
        "type": "club soda",
        "unit": "oz"
    }, {
        "amount": "",
        "type": "orange peel",
        "unit": "garnish"
    }],
    "spirit": "whiskey",
    "tags": ["Bitter", "Refreshing"]
}, {
    "description": "This is top secret, agents. Pip only reveals this to the truly elite. Hey wait, that's you guys. This bourbon-based cocktail hits a lot of the flavors with sweet, bitter, and citrusy notes.",
    "id": "9",
    "instructions": "You’re so lucky we’re giving you this recipe!  Take good care of it... Combine all ingredients in a mixing glass.Add enough ice to cover ingredients. Stir for 15 secs. Strain into rocks glass over large cut cube.Express lemon peel over cocktail. Rub peel around rim of glass & place into drink.",
    "name": "Buen Hombres",
    "prepTime": "light",
    "recipe": [{
        "amount": "1",
        "type": "mezcal",
        "unit": "oz"
    }, {
        "amount": "1",
        "type": "bourbon",
        "unit": "oz"
    }, {
        "amount": ".75",
        "type": "Cocchi Americano or Lillet Blanc",
        "unit": "oz"
    }, {
        "amount": ".5",
        "type": "crème de pêche",
        "unit": "oz"
    }, {
        "amount": "",
        "type": "bitters",
        "unit": "lemon"
    }, {
        "amount": "",
        "type": "habanero bitters or spicy bitters",
        "unit": "optional:"
    }, {
        "amount": "",
        "type": "lemon peel",
        "unit": "garnish"
    }],
    "spirit": "mezcal/ bourbon",
    "tags": ["Sweet", "Citrusy", "Bitter"]
}, {
    "description": "This spin on the classic island drink swaps out the original dark rum recipe with a sweet, floral Brazilian cachaca. Alexa, play Kokomo by the Beach Boys. ",
    "id": "10",
    "instructions": "Combine all ingredients in a shaker. Add ice, seal, & shake vigorously for 10 secs. Strain into collins glass & top with fresh ice.With microplane, shave nutmeg over cocktail.",
    "name": "Cachaca Killer",
    "prepTime": "medium",
    "recipe": [{
        "amount": "2",
        "type": "Cachaça",
        "unit": "oz"
    }, {
        "amount": "4",
        "type": "pineapple juice",
        "unit": "oz"
    }, {
        "amount": "1",
        "type": "fresh orange juice",
        "unit": "oz"
    }, {
        "amount": "1",
        "type": "cream of coconut",
        "unit": "oz"
    }, {
        "amount": "3",
        "type": "Angostura bitters",
        "unit": "dashes"
    }, {
        "amount": "",
        "type": "nutmeg",
        "unit": "garnish"
    }],
    "spirit": "rum/ cachaça",
    "tags": ["Sweet"]
}
]

// Home page of the application. 
// It takes a number of random query terms and returns a horizontal list
// of 10 drinks that fit each query
const DiscoverDetail = ({ drinks, queries, navigation }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedDrinks, setSelectedDrinks] = useState(null);
    const [selectedQueries, setSelectedQueries] = useState(null);

    // Wait for drinks and queries to be fully loaded into the app
    useEffect(() => {
        if (drinks && queries) {
            loadData();
        }
    }, [drinks, queries])

    const loadData = async () => {
        let ranQueries = await getRandomQueries(queries, 10);
        setSelectedQueries(ranQueries);

        let drinkMatrix = [];
        for (let i = 0; i < ranQueries.length; i++) {
            let drinkRow = await getDrinksWithQuery(drinks, ranQueries[i]);
            drinkMatrix.push(drinkRow);
        }

        await setSelectedDrinks(drinkMatrix);
        setIsLoaded(true);
    }



    if (!isLoaded) {
        return (
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { paddingLeft: 8 }]}>
                <Text>Loading drinks...</Text>
            </SafeAreaView>
        );
    }
    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <SafeAreaView style={[GlobalStyles.headerSafeArea, DiscoverStyles.container]}>
                <View style={DiscoverStyles.titleContainer}>
                    <Text style={DiscoverStyles.title}>DISCOVER</Text>
                </View>
                {selectedDrinks.map((drinks, index) => {
                    return <HorizontalList data={drinks} index={index} key={index} query={selectedQueries[index].name} />
                })}
            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        drinks: state.firestore.ordered.drinks,
        queries: state.firestore.ordered.queries
    }
}

// Connect the drink detail page to our redux store and firestore DB
export default compose(
    firestoreConnect(() => ['drinks', 'queries']),
    connect(mapStateToProps)
)(DiscoverDetail);