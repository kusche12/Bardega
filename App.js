import React from 'react';

// Application-Wide State Management
import firebaseConfig from './API/fbConfig';
import firebase from './API/FirebaseSetup';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { createFirestoreInstance } from 'redux-firestore';
import rootReducer from './Store/Reducers/RootReducer';

import Main from './Navigation/Main.js';

// TODO: Make sure that images are rendered before transitioning to the next screen.
//       It's not a good look seeing an empty white space before the image loads in every time

// Create store enhanced with redux reducers and firestore database
const store = createStore(rootReducer, applyMiddleware(thunk));

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

export default App;