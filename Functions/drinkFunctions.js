// Get an array of all drinks that fit a certain search filter. Can be either tag or prep time
export const getDrinksWithQuery = (drinks, query) => {
    let nums = randomUniqueNum(drinks.length, drinks.length);

    let result = [];
    if (query.filterType === 'tag') {
        for (let i in nums) {
            if (result.length === 10) {
                return result;
            }

            if (drinks[nums[i]].tags) {
                for (let j = 0; j < drinks[nums[i]].tags.length; j++) {
                    const tag = drinks[nums[i]].tags[j];
                    if (tag === query.filterName) {
                        result.push(drinks[nums[i]]);
                    }
                }
            }
        }

        return result;
    } else if (query.filterType === 'prepTime') {
        for (let i in nums) {
            if (result.length === 10) {
                return result;
            }
            const prepTime = drinks[nums[i]].prepTime;
            if (prepTime.toLowerCase() === query.filterName.toLowerCase()) {
                result.push(drinks[nums[i]]);
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