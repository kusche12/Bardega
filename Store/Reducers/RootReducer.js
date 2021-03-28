import authReducer from './AuthReducer';
import drinkReducer from './DrinkReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
    auth: authReducer,
    drink: drinkReducer,
    firestore: firestoreReducer
});

export default rootReducer;