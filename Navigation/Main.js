import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

// For image caching
import { cacheImages } from '../Functions/cacheFunctions';
import { Asset } from 'expo-asset';
import Loading from '../Components/Main/Loading';
import * as FileSystem from 'expo-file-system';

// For navigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DiscoverNavigator from './StackNavigators/DiscoverNavigator';
import SearchNavigator from './StackNavigators/SearchNavigator';
import CreateNavigator from '../Navigation/StackNavigators/CreateNavigator';
import SpiritNavigator from '../Navigation/StackNavigators/SpiritNavigator';
import ProfileNavigator from '../Navigation/StackNavigators/ProfileNavigator';
import GlobalStyles from '../Styles/GlobalStyles';

const LIGHTPINK = '#F7D2CF';

const Tab = createBottomTabNavigator();

// Application Navigator
const Main = () => {

    // Cache the local header image file on the user's device to speed up the access of the image
    const [header, setHeader] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (header === null) {
            loadData();
        }
    }, [])
    const loadData = async () => {
        const imageURI = Asset.fromModule(require('./bardega_logo.png')).uri;
        await cacheImages(imageURI, 1);
        setHeader(FileSystem.documentDirectory + '1.jpg');
        setIsLoading(false);
    }

    // TODO: Implement this on every stack that has a comment screen
    // https://www.youtube.com/watch?v=bGGeD5RkdzQ
    // Find the route name, if it is "CommentsScreen", then do not render tab bar
    const getTabBarVisibility = (route) => {
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : '';

        if (routeName === 'CommentsScreen') {
            return false;
        }
        return true;
    }

    if (isLoading) {
        return null
    } else {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName='Discover'
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
                        component={DiscoverNavigator}
                        initialParams={{ header: header }}
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
                        component={SearchNavigator}
                        initialParams={{ header: header }}
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
                        component={CreateNavigator}
                        initialParams={{ header: header }}
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
                        component={SpiritNavigator}
                        initialParams={{ header: header }}
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
                        component={ProfileNavigator}
                        initialParams={{ header: header }}
                        options={({ route }) => ({
                            tabBarVisible: getTabBarVisibility(route),
                            tabBarIcon: ({ focused }) => {
                                if (focused) {
                                    return <Image source={require('./profile.png')} style={GlobalStyles.tabBarIcon} />
                                } else {
                                    return <Image source={require('./profileUnfocused.png')} style={GlobalStyles.tabBarIcon} />
                                }
                            },
                        })}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}

export default Main;