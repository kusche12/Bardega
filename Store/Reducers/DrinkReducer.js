const initState = {
  drinkError: null,
};

const drinkReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_DRINK':
      console.log('created drink');
      return { ...state, drinkError: null };
    case 'CREATE_DRINK_ERROR':
      console.log('create drink error: ', action.err);
      return { ...state, drinkError: action.err.message };
    case 'IMAGE_SUCCESS':
      console.log("DRINK REDUCER: IMAGE UPLOAD SUCCESSFUL")
      return state;
    case 'IMAGE_ERROR':
      console.log("DRINK REDUCER: IMAGE UPLOAD ERROR")
      return { ...state, drinkError: action.err.message };
    default:
      return state;
  }
}

export default drinkReducer;