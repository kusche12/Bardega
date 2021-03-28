import React from 'react';

// Application-Wide State Management
import firebaseConfig from './API/FirebaseSetup';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ReactReduxFirebaseProvider, firebaseReducer, getFirebase } from 'react-redux-firebase'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { getFirestore } from 'redux-firestore';
import rootReducer from './Store/Reducers/RootReducer';

import Main from './Main.js';

// Create store with redux reducers and firestore database
const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})));

// Application container wrapped in the React-Redux-Firebase State
const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

export default App;