import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
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

// Load app fonts and display splash screen until ready
import * as Font from 'expo-font';
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

// Application container wrapped in the React-Redux-Firebase State
const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Raisonne: require('./assets/fonts/DMSans-Regular.ttf'),
          RaisonneMedium: require('./assets/fonts/DMSans-Medium.ttf'),
          SourceSerifRegular: require('./assets/fonts/SourceSerifPro-Regular.ttf'),
          SourceSerifItalic: require('./assets/fonts/SourceSerifPro-Italic.ttf'),
          SourceSerifSemiBold: require('./assets/fonts/SourceSerifPro-SemiBold.ttf'),
          SourceSerifBold: require('./assets/fonts/SourceSerifPro-Bold.ttf'),
        });
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1 }}
      onLayout={onLayoutRootView}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Main />
        </ReactReduxFirebaseProvider>
      </Provider>
    </View>
  )
}

export default App;