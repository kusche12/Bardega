import firebase from '../API/FirebaseSetup'

// Get an array of all drinks that fit a certain search filter.
// Can be either tag or prep time.
export const getDrinksWithQuery = async (drinks, query, max) => {
    let nums = randomUniqueNum(drinks.length, drinks.length);

    let result = [];
    if (query.filterType === 'tag') {
        for (let i in nums) {
            if (result.length === max) {
                return result;
            }

            if (drinks[nums[i]].tags) {
                for (let j = 0; j < drinks[nums[i]].tags.length; j++) {
                    const tag = drinks[nums[i]].tags[j];
                    if (tag.name.toLowerCase() === query.filterName.toLowerCase()) {
                        const isPrivate = await drinkIsPrivate(drinks[nums[i]]);
                        if (!isPrivate) {
                            result.push(drinks[nums[i]]);
                        }
                    }
                }
            }
        }

        return result;
    } else if (query.filterType === 'prepTime') {
        for (let i in nums) {
            if (result.length === max) {
                return result;
            }
            const prepTime = drinks[nums[i]].prepTime.value;
            if (prepTime.toLowerCase() === query.filterName.toLowerCase()) {
                const isPrivate = await drinkIsPrivate(drinks[nums[i]]);
                if (!isPrivate) {
                    result.push(drinks[nums[i]]);
                }
            }
        }

        return result;
    } else if (query.filterType === 'strength') {
        for (let i in nums) {
            if (result.length === max) {
                return result;
            }
            const strength = drinks[nums[i]].strength.value;
            if (strength.toLowerCase() === query.filterName.toLowerCase()) {
                const isPrivate = await drinkIsPrivate(drinks[nums[i]]);
                if (!isPrivate) {
                    result.push(drinks[nums[i]]);
                }
            }
        }

        return result;
    }
    return null;
}

// Get an array of all drinks that fit a certain search filter.
// Can be either tag or prep time.
// export const getDiscoverDrinks = async (query, max) => {
//     let result = [];
//     let drinksRef = firebase
//         .firestore()
//         .collection('drinks')

//     if (query.filterType === 'strength') {
//         try {
//             const drinksSnapshot = await drinksRef.orderBy('strength').get();
//             let foundQuery = false;

//             for (const doc of drinksSnapshot.docs) {
//                 if (doc.exists) {
//                     let queryMatch = doc.data().strength.value.toLowerCase() === query.filterName.toLowerCase();
//                     if (queryMatch) {
//                         foundQuery = true;
//                         const isPrivate = await drinkIsPrivate(doc.data());
//                         if (!isPrivate) {
//                             result.push(doc.data());
//                         }
//                     } else if (foundQuery && !queryMatch) {
//                         break;
//                     }
//                 }
//             }

//             let nums = randomUniqueNum(result.length, result.length);
//             let randomRes = [];
//             for (let i = 0; i < max; i++) {
//                 randomRes.push(result[nums[i]]);
//             }

//             return randomRes;
//         } catch (err) {
//             console.log('Error getting drinks: ' + err);
//         }
//     } else if (query.filterType === 'prepTime') {
//         try {
//             const drinksSnapshot = await drinksRef.orderBy('prepTime').get();
//             let foundQuery = false;

//             for (const doc of drinksSnapshot.docs) {
//                 if (doc.exists) {
//                     let queryMatch = doc.data().prepTime.value.toLowerCase() === query.filterName.toLowerCase();
//                     if (queryMatch) {
//                         foundQuery = true;
//                         const isPrivate = await drinkIsPrivate(doc.data());
//                         if (!isPrivate) {
//                             result.push(doc.data());
//                         }
//                     } else if (foundQuery && !queryMatch) {
//                         break;
//                     }
//                 }
//             }

//             let nums = randomUniqueNum(result.length, result.length);
//             let randomRes = [];
//             for (let i = 0; i < max; i++) {
//                 randomRes.push(result[nums[i]]);
//             }

//             return randomRes;
//         } catch (err) {
//             console.log('Error getting drinks: ' + err);
//         }
//     }
// }

// Get 'amount' number of randomized queries in random order from 'queries' list
export const getRandomQueries = (queries, amount) => {
    console.log(queries);
    let result = [];
    let nums = randomUniqueNum(queries.length, amount);
    for (let i in nums) {
        result.push(queries[nums[i]]);
    }

    return result;
}

export const getRandomDrinksNoQuery = async (drinks, max) => {
    let nums = randomUniqueNum(drinks.length, drinks.length);
    let result = [];

    for (let i in nums) {
        if (result.length === max) {
            return result;
        }

        if (drinks[nums[i]]) {
            const isPrivate = await drinkIsPrivate(drinks[nums[i]]);
            if (!isPrivate) {
                result.push(drinks[nums[i]]);
            }
        }
    }

    return result;
}

// Generate OUTPUTCOUNT unique numbers from 0 to RANGE-1
function randomUniqueNum(range, outputCount) {
    let arr = []
    for (let i = 0; i < range; i++) {
        arr.push(i)
    }
    let result = [];
    for (let i = 1; i <= outputCount; i++) {
        const random = Math.floor(Math.random() * (range - i));
        result.push(arr[random]);
        arr[random] = arr[range - i];
    }
    return result;
}

// Helper function to decide if the drink or the drink's creator is private
// This is used to decide if the drink should be returned by a query function or not
export const drinkIsPrivate = async (drink) => {
    if (drink.private) {
        return true;
    }

    let authorPrivate;
    await firebase
        .firestore()
        .collection('profiles')
        .doc(drink.authorID)
        .get()
        .then((doc) => {
            if (doc.exists) {
                authorPrivate = doc.data().private;
            }
        })
    return authorPrivate;
}

export const getSpiritsWithQuery = (spirits, query, max) => {
    let nums = randomUniqueNum(spirits.length, spirits.length);

    let result = [];
    for (let i in nums) {
        if (result.length === max) {
            return result;
        }
        const spiritType = spirits[nums[i]].spirit;
        if (spiritType.toLowerCase() === query.name.toLowerCase()) {
            result.push(spirits[nums[i]]);
        }
    }
    return result;
}