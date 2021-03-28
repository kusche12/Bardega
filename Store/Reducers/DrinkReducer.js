// Dummy data for drink list
const initState = {
 "drinks" : [ {
  "description" : "We don't need a train to enjoy this play on the 20th Century Cocktail. The 21st Century Man is sweet and citrusy and less boozy for a more refreshing taste.",
  "id" : "1",
  "instructions" : "Combine all ingredients in a shaker. Add ice, seal, & shake vigorously for 10 secs. Strain into rocks glass over large cut ice cube.Express lemon peel over cocktail. Rub peel around rim of glass & place into drink.",
  "name" : "21st Century Man",
  "prepTime" : "light",
  "recipe" : [ {
    "amount" : "1.5",
    "type" : "gin",
    "unit" : "oz"
  }, {
    "amount" : ".75",
    "type" : "fresh lemon juice",
    "unit" : "oz"
  }, {
    "amount" : ".5",
    "type" : "sweet vermouth",
    "unit" : "oz"
  }, {
    "amount" : ".5",
    "type" : "crème de cacao",
    "unit" : "oz"
  }, {
    "amount" : "",
    "type" : "lemon peel",
    "unit" : "garnish"
  } ],
  "spirit" : "gin",
  "tags" : [ "Sweet", "Citrusy" ]
}, {
  "description" : "Take flight with this classic floral and citrusy gin-based cocktail. Disclaimer: this drink does not, in fact, give you wings. ",
  "id" : "2",
  "instructions" : "Combine all ingredients in a shaker. Add ice, seal, & shake vigorously for 10 secs. Double strain into coupe glass.Garnish with cherry or express lemon peel over cocktail. Rub peel around rim of glass & place into drink.",
  "name" : "Aviation",
  "prepTime" : "light",
  "recipe" : [ {
    "amount" : "2",
    "type" : "gin",
    "unit" : "oz"
  }, {
    "amount" : ".75",
    "type" : "fresh lemon juice",
    "unit" : "oz"
  }, {
    "amount" : ".5",
    "type" : "maraschino liqueur (Luxardo preferably)",
    "unit" : "oz"
  }, {
    "amount" : ".5",
    "type" : "crème de violette",
    "unit" : "oz"
  }, {
    "amount" : "",
    "type" : "cherry or lemon twist garnish ",
    "unit" : "garnish"
  } ],
  "spirit" : "gin",
  "tags" : [ "Herbaceous", "Citrusy", "Floral" ]
}]};

const drinkReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_DRINK':
            console.log('created drink', action.drink);
            return state;
        case 'CREATE_DRINK_ERROR':
            console.log('create project error: ', action.err);
            return state;
        default:
            return state;
    }
}

export default drinkReducer;