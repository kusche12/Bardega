import React from 'react';

// Application-Wide State Management
import firebaseConfig from './API/fbConfig';
import firebase from './API/FirebaseSetup';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { reduxFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import { createFirestoreInstance } from 'redux-firestore';
import rootReducer from './Store/Reducers/RootReducer';

import Main from './Navigation/Main.js';
import * as SplashScreen from 'expo-splash-screen';

// Create store enhanced with redux reducers and firestore database
const middleware = [
  thunk.withExtraArgument({ getFirebase })
];
const store = createStore(rootReducer,
  compose(
    applyMiddleware(...middleware), reduxFirestore(firebase)
  )
);

const rrfProps = {
  firebase,
  config: firebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

// TODO: 
// 1. Show the Splash Screen while initializing the fonts and firebase database
// 2. Make sure all data is loaded in here before showing the Main component
//        This will allow for the authentication page to not render if the user is already authenticated

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