const initState = {
  drinkError: null,
  drinkID: null
};

const drinkReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_DRINK':
      console.log('created drink reducer');
      return { ...state, drinkError: null, drinkID: action.id };
    case 'CREATE_DRINK_ERROR':
      console.log('create drink error reducer: ', action.err.message);
      return { ...state, drinkError: action.err.message, drinkID: null };
    case 'UPDATE_DRINK':
      console.log('update drink reducer');
      return { ...state, drinkError: null, drinkID: action.id };
    case 'UPDATE_DRINK_ERROR':
      console.log('update drink error reducer: ', action.err.message);
      return { ...state, drinkError: action.err.message, drinkID: null };
    case 'CLEAR_DRINK_STATE':
      console.log('clear drink reducer: ');
      return { drinkError: null, drinkID: null };
    case 'DELETE_DRINK':
      console.log('delete drink reducer');
      return { drinkError: null, drinkID: null };
    case 'DELETE_DRINK_ERROR':
      console.log('delete drink error reducer: ', action.err.message);
      return { ...state, drinkError: action.err.message, drinkID: null };
    case 'LIKE_DRINK':
      console.log('like drink reducer');
      return { ...state, drinkError: null };
    case 'LIKE_DRINK_ERROR':
      console.log('like drink error reducer: ', action.err.message);
      return { ...state, drinkError: action.err.message };
    default:
      return state;
  }
}

export default drinkReducer;