import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DiscoverScreen from './Screens/BottomTabScreens/DiscoverScreen';
import SearchScreen from './Screens/BottomTabScreens/SearchScreen';
import CreateScreen from './Screens/BottomTabScreens/CreateScreen';
import SpiritScreen from './Screens/BottomTabScreens/SpiritScreen';
import ProfileScreen from './Screens/BottomTabScreens/ProfileScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Discover" component={DiscoverScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Create" component={CreateScreen} />
          <Tab.Screen name="Spirit" component={SpiritScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;