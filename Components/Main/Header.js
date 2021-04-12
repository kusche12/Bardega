import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DrinkDetailScreen from '../../Screens/DetailScreens/DrinkDetailScreen';
import FollowScreen from '../../Screens/DetailScreens/FollowScreen';
import FavoritesScreen from '../../Screens/DetailScreens/FavoritesScreen';
import DrinkListScreen from '../../Screens/DetailScreens/DrinkListScreen';
import GlobalStyles from '../../Styles/GlobalStyles';

const Stack = createStackNavigator();
const { width } = Dimensions.get('window');
const LIGHTPINK = '#F7D2CF';

// Renders the top header for each main screen.
// This header includes all of the tab bar screens AND 
// the drink detail screen which can be accessed from any other screen
const Header = ({ route, component, name, navigation }) => {
    return (
        <Stack.Navigator
            headerMode='screen' // SUPER IMPORTANT. This fixed screen transition glitch
            screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}>
            <Stack.Screen
                name={name}
                component={component}
                initialParams={route.params, navigation}
                options={{
                    headerTitle: props => (
                        <Image
                            style={{ width: width, height: 150 }}
                            source={require('./bardega_logo.png')}
                            resizeMode='cover'
                        />
                    ),
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerRight: () => {
                        if (name === 'Profile') {
                            return (
                                <TouchableOpacity onPress={() => console.log('nav to inbox')}>
                                    <Feather name="inbox" size={24} color="black" />
                                </TouchableOpacity>
                            )
                        }
                        return;
                    }
                }}
            />
            <Stack.Screen
                name='DrinkDetailScreen'
                component={DrinkDetailScreen}
                initialParams={route, navigation}
                options={
                    {
                        headerTitle: () => (
                            <Image
                                style={{ height: 150 }}
                                source={require('./bardega_logo.png')}
                                resizeMode='contain'
                            />
                        ),
                        headerRight: () => (
                            <View style={GlobalStyles.headerWithButtons} >
                                {/* The below code allows the user to goBack to the previous screen in its stack navigator */}
                                <TouchableWithoutFeedback onPress={() => navigation.navigate(name, { screen: name })}>
                                    <Image
                                        style={{ height: 20, width: 20 }}
                                        source={require('./back_button.png')}
                                        resizeMode='contain'
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        ),
                        headerTitleStyle: { flex: 1, textAlign: 'center' },
                        headerTitleAlign: 'center',
                        headerBackTitleVisible: false,
                        headerTintColor: LIGHTPINK
                    }
                }
            />
            <Stack.Screen
                name='FollowScreen'
                component={FollowScreen}
                initialParams={route, navigation}
                options={
                    {
                        headerTitle: () => (
                            <Image
                                style={{ height: 150 }}
                                source={require('./bardega_logo.png')}
                                resizeMode='contain'
                            />
                        ),
                        headerRight: () => (
                            <View style={GlobalStyles.headerWithButtons} >
                                {/* The below code allows the user to goBack to the previous screen in its stack navigator */}
                                <TouchableWithoutFeedback onPress={() => navigation.navigate(name, { screen: name })}>
                                    <Image
                                        style={{ height: 20, width: 20 }}
                                        source={require('./back_button.png')}
                                        resizeMode='contain'
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        ),
                        headerTitleStyle: { flex: 1, textAlign: 'center' },
                        headerTitleAlign: 'center',
                        headerBackTitleVisible: false,
                        headerTintColor: LIGHTPINK
                    }
                }
            />
            <Stack.Screen
                name='FavoritesScreen'
                component={FavoritesScreen}
                initialParams={route, navigation}
                options={
                    {
                        headerTitle: () => (
                            <Image
                                style={{ height: 150 }}
                                source={require('./bardega_logo.png')}
                                resizeMode='contain'
                            />
                        ),
                        headerRight: () => (
                            <View style={GlobalStyles.headerWithButtons} >
                                <TouchableWithoutFeedback onPress={() => navigation.navigate(name, { screen: name })}>
                                    <Image
                                        style={{ height: 20, width: 20 }}
                                        source={require('./back_button.png')}
                                        resizeMode='contain'
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        ),
                        headerTitleStyle: { flex: 1, textAlign: 'center' },
                        headerTitleAlign: 'center',
                        headerBackTitleVisible: false,
                        headerTintColor: LIGHTPINK
                    }
                }
            />
            <Stack.Screen
                name='DrinkListScreen'
                component={DrinkListScreen}
                initialParams={route, navigation}
                options={
                    {
                        headerTitle: () => (
                            <Image
                                style={{ height: 150 }}
                                source={require('./bardega_logo.png')}
                                resizeMode='contain'
                            />
                        ),
                        headerRight: () => (
                            <View style={GlobalStyles.headerWithButtons} >
                                <TouchableWithoutFeedback onPress={() => navigation.navigate(name, { screen: name })}>
                                    <Image
                                        style={{ height: 20, width: 20 }}
                                        source={require('./back_button.png')}
                                        resizeMode='contain'
                                    />
                                </TouchableWithoutFeedback>
                            </View>
                        ),
                        headerTitleStyle: { flex: 1, textAlign: 'center' },
                        headerTitleAlign: 'center',
                        headerBackTitleVisible: false,
                        headerTintColor: LIGHTPINK
                    }
                }
            />
        </Stack.Navigator>
    );
}

export default Header;