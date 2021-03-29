// // Get an array of all drinks that fit a certain search filter
// export const getDrinksWithFilter = (drinks, filterName, filterType) => {
//     let result = [];
//     if (filterType === 'tag') {
//         for (let i = 0; i < drinks.length; i++) {
//             for (let j = 0; j < drinks[i].tags.length; j++) {
//                 const tag = drinks[i].tags[j];
//                 if (tag === filterName) {
//                     drinks.push(drinks[i]);
//                     break;
//                 }
//             }
//         }
//         return result;
//     }
//     return null;
// }

// Get 'amount' number of randomized queries in random order from 'queries' list
export const getRandomQueries = (queries, amount) => {
    let result = [];
    let nums = Array.from({ length: queries }, (v, k) => k + 1);
    let i = queries.length;
    let j = 0;

    while (amount--) {
        j = Math.floor(Math.random() * (i+1));
        result.push(queries[j]);
        nums.splice(j,1);
    }

    return result;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}