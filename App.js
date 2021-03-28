import React from 'react';

// Application-Wide State Management
import firebaseConfig from './API/FirebaseSetup';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ReactReduxFirebaseProvider, getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import rootReducer from './Store/Reducers/RootReducer';

import Main from './Main.js';

// Create store enhanced with redux reducers and firestore database
const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig)
  )
);

// Application container wrapped in the React-Redux-Firebase State
const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

export default App;