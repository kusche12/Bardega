import authReducer from './AuthReducer';
import drinkReducer from './DrinkReducer';
import commentReducer from './CommentReducer'
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    drink: drinkReducer,
    comment: commentReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;