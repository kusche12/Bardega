export const createDrink = (drink) => {
    return (dispatch, getState) => {
        dispatch({ type: 'CREATE_DRINK', drink })
    }
};