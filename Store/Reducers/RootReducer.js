import authReducer from './AuthReducer';
import drinkReducer from './DrinkReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    drink: drinkReducer
});

export default rootReducer;