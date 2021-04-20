import React from 'react';
import { Image } from 'react-native';

// For main navigation
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Images from '../Images/Images';
import DiscoverNavigator from './StackNavigators/DiscoverNavigator';
import SearchNavigator from './StackNavigators/SearchNavigator';
import CreateNavigator from '../Navigation/StackNavigators/CreateNavigator';
import SpiritNavigator from '../Navigation/StackNavigators/SpiritNavigator';
import ProfileNavigator from '../Navigation/StackNavigators/ProfileNavigator';
import GlobalStyles from '../Styles/GlobalStyles';

const LIGHTPINK = '#F7D2CF';

const Tab = createBottomTabNavigator();

const MainNavigator = ({ header }) => {
    const getTabBarVisibility = (route) => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === 'CommentsScreen') {
            return false;
        }
        return true;
    }

    return (
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
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return <Image source={Images.bottomTab.discover} style={GlobalStyles.tabBarIcon} />
                        } else {
                            return <Image source={Images.bottomTab.discoverUnfocused} style={GlobalStyles.tabBarIcon} />
                        }
                    },
                })}
            />
            <Tab.Screen
                name="Search"
                component={SearchNavigator}
                initialParams={{ header: header }}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return <Image source={Images.bottomTab.search} style={GlobalStyles.tabBarIcon} />
                        } else {
                            return <Image source={Images.bottomTab.searchUnfocused} style={GlobalStyles.tabBarIcon} />
                        }
                    },
                })}
            />
            <Tab.Screen
                name="Create"
                component={CreateNavigator}
                initialParams={{ header: header }}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return <Image source={Images.bottomTab.create} style={GlobalStyles.tabBarIconMD} />
                        } else {
                            return <Image source={Images.bottomTab.createUnfocused} style={GlobalStyles.tabBarIconMD} />
                        }
                    },
                }}
            />
            <Tab.Screen
                name="Spirit"
                component={SpiritNavigator}
                initialParams={{ header: header }}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return <Image source={Images.bottomTab.spirit} style={GlobalStyles.tabBarIconMD} />
                        } else {
                            return <Image source={Images.bottomTab.spiritUnfocused} style={GlobalStyles.tabBarIconMD} />
                        }
                    },
                })}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileNavigator}
                initialParams={{ header: header }}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarIcon: ({ focused }) => {
                        if (focused) {
                            return <Image source={Images.bottomTab.profile} style={GlobalStyles.tabBarIcon} />
                        } else {
                            return <Image source={Images.bottomTab.profileUnfocused} style={GlobalStyles.tabBarIcon} />
                        }
                    },
                })}
            />
        </Tab.Navigator>
    )
}

export default MainNavigator;