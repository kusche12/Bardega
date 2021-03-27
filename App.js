import React from 'react';

// Application-Wide State Management
import firebaseConfig from './API/FirebaseSetup';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'

import Main from './Main.js';

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
}

// Initialize firebase instance
try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {}

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
}

// Application container wrapped in the React-Redux-Firebase State
const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Main />
        </ReactReduxFirebaseProvider>
      </Provider>
  )
}

export default App;