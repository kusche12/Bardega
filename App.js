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

// BUGS FOUND WHILE ADDING DRINK IMAGES:
// TODO: Search screen does not fill with search results and sometimes returns nothing at all until refresh

export default App;