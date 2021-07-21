import authReducer from './AuthReducer';
import drinkReducer from './DrinkReducer';
import commentReducer from './CommentReducer'
import notificationReducer from './NotificationReducer';
import spiritReducer from './SpiritReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import profileReducer from './ProfileReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    drink: drinkReducer,
    comment: commentReducer,
    profile: profileReducer,
    notification: notificationReducer,
    spirit: spiritReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;