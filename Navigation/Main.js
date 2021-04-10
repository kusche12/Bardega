import React from 'react';
import { Image } from 'react-native';

// Navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DiscoverScreen from '../Screens/BottomTabScreens/DiscoverScreen';
import SearchScreen from '../Screens/BottomTabScreens/SearchScreen';
import CreateScreen from '../Screens/BottomTabScreens/CreateScreen';
import SpiritScreen from '../Screens/BottomTabScreens/SpiritScreen';
import ProfileScreen from '../Screens/BottomTabScreens/ProfileScreen';
import GlobalStyles from '../Styles/GlobalStyles';

const LIGHTPINK = '#F7D2CF';

const Tab = createBottomTabNavigator();

// Application Navigator
const Main = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Discover' // TODO: Change back to Discover after editing
                tabBarOptions={{
                    activeBackgroundColor: LIGHTPINK,
                    inactiveBackgroundColor: LIGHTPINK,
                    style: {
                        backgroundColor: LIGHTPINK,
                    },
                    showLabel: false,
                }}
            >
                <Tab.Screen
                    name="Discover"
                    component={DiscoverScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            if (focused) {
                                return <Image source={require('./discover.png')} style={GlobalStyles.tabBarIcon} />
                            } else {
                                return <Image source={require('./discoverUnfocused.png')} style={GlobalStyles.tabBarIcon} />
                            }
                        },
                    }}
                />
                <Tab.Screen
                    name="Search"
                    component={SearchScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            if (focused) {
                                return <Image source={require('./search.png')} style={GlobalStyles.tabBarIcon} />
                            } else {
                                return <Image source={require('./searchUnfocused.png')} style={GlobalStyles.tabBarIcon} />
                            }
                        },
                    }}
                />
                <Tab.Screen
                    name="Create"
                    component={CreateScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            if (focused) {
                                return <Image source={require('./create.png')} style={GlobalStyles.tabBarIconMD} />
                            } else {
                                return <Image source={require('./createUnfocused.png')} style={GlobalStyles.tabBarIconMD} />
                            }
                        },
                    }}
                />
                <Tab.Screen
                    name="Spirit"
                    component={SpiritScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            if (focused) {
                                return <Image source={require('./spirit.png')} style={GlobalStyles.tabBarIconMD} />
                            } else {
                                return <Image source={require('./spiritUnfocused.png')} style={GlobalStyles.tabBarIconMD} />
                            }
                        },
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            if (focused) {
                                return <Image source={require('./profile.png')} style={GlobalStyles.tabBarIcon} />
                            } else {
                                return <Image source={require('./profileUnfocused.png')} style={GlobalStyles.tabBarIcon} />
                            }
                        },
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Main;