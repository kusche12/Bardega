const initState = {
  spiritError: null,
  spiritID: null
};

const spiritReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_SPIRIT':
      console.log('create spirit reducer');
      return { ...state, spiritError: null, spiritID: action.id };
    case 'CREATE_SPIRIT_ERROR':
      console.log('create spirit error reducer: ', action.err.message);
      return { ...state, spiritError: action.err.message, spiritID: null };
    case 'DELETE_SPIRIT':
      console.log('create spirit reducer');
      return { ...state, spiritError: null, spiritID: action.id };
    case 'DELETE_SPIRIT_ERROR':
      console.log('delete spirit error reducer: ', action.err.message);
      return { ...state, spiritError: action.err.message, spiritID: null };
    default:
      return state;
  }
}

export default spiritReducer;