const initState = {
  drinkError: null,
  drinkID: null
};

const drinkReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_DRINK':
      console.log('created drink reducer');
      console.log('action id: ' + action.id);
      return { ...state, drinkError: null, drinkID: action.id };
    case 'CREATE_DRINK_ERROR':
      console.log('create drink error reducer: ', action.err.message);
      return { ...state, drinkError: action.err.message, drinkID: null };
    default:
      return state;
  }
}

export default drinkReducer;