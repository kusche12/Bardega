// Get an array of all drinks that fit a certain search filter. Can be either tag or prep time
// TODO: Get the 10 drinks for the array at random locations around the drinks list (not just the first 10 found)
export const getDrinksWithQuery = (drinks, query) => {
    let result = [];
    if (query.filterType === 'tag') {
        for (let i = 0; i < drinks.length; i++) {
            if (result.length === 10) {
                return result;
            }

            if (drinks[i].tags) {
                for (let j = 0; j < drinks[i].tags.length; j++) {
                    if (drinks[i].tags) {
                        const tag = drinks[i].tags[j];
                        if (drinks[i].tags && tag === query.filterName) {
                            result.push(drinks[i]);
                        }
                    }
                }
            }
        }
        return result;
    } else if (query.filterType === 'prepTime') {
        for (let i = 0; i < drinks.length; i++) {
            if (result.length === 10) {
                return result;
            }
            const prepTime = drinks[i].prepTime;
            if (prepTime.toLowerCase() === query.filterName.toLowerCase()) {
                result.push(drinks[i]);
            }
        }
        return result;
    }
    return null;
}

// Get 'amount' number of randomized queries in random order from 'queries' list
export const getRandomQueries = (queries, amount) => {
    let result = [];
    let nums = randomUniqueNum(queries.length, amount);
    for (let i in nums) {
        result.push(queries[nums[i]]);
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