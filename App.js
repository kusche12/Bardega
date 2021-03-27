import React from 'react';

// Application-Wide State Management
import firebaseConfig from './API/FirebaseSetup';
import firebase from 'firebase/app';
import 'firebase/auth';
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose } from 'redux'

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DiscoverScreen from './Screens/BottomTabScreens/DiscoverScreen';
import SearchScreen from './Screens/BottomTabScreens/SearchScreen';
import CreateScreen from './Screens/BottomTabScreens/CreateScreen';
import SpiritScreen from './Screens/BottomTabScreens/SpiritScreen';
import ProfileScreen from './Screens/BottomTabScreens/ProfileScreen';

const Tab = createBottomTabNavigator();

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
}

console.log(firebaseConfig)

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

const App = () => {

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="Discover" component={DiscoverScreen} />
              <Tab.Screen name="Search" component={SearchScreen} />
              <Tab.Screen name="Create" component={CreateScreen} />
              <Tab.Screen name="Spirit" component={SpiritScreen} />
              <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
        </ReactReduxFirebaseProvider>
      </Provider>
  )
}

export default App;