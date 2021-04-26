const initState = {
  commentError: null,
  newCommentID: null
};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_COMMENT':
      console.log('create comment reducer');
      return { ...state, commentError: null, newCommentID: action.id };
    case 'CREATE_COMMENT_ERROR':
      console.log('create comment error reducer: ', action.err.message);
      return { ...state, commentError: action.err.message };
    default:
      return state;
  }
}

export default commentReducer;