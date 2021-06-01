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
// TODO: Add a cancel button in the top navbar
// TODO: Fix the create directions component. Currently, the X button breaks it
// TODO: Search screen does not fill with search results and sometimes returns nothing at all until refresh
// TODO: DetailScreen ingredients component goes too far to the left in width, exceeds borders of componnet
// TODO: When editing a drink from the search component, it does not know what screen to navigate to afterwards and just goes blank
// TODO: Homescreen horizozntal list drink card is not all the same height
// TODO: Some tags are capital first letter, some are all lowercase. Make them consistent.

export default App;