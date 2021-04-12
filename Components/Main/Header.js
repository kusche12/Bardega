import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, View, Alert, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DrinkDetailScreen from '../../Screens/DetailScreens/DrinkDetailScreen';
import FollowScreen from '../../Screens/DetailScreens/FollowScreen';
import FavoritesScreen from '../../Screens/DetailScreens/FavoritesScreen';
import DrinkListScreen from '../../Screens/DetailScreens/DrinkListScreen';
import EditCollectionScreen from '../../Screens/DetailScreens/EditCollectionScreen';
import { Entypo } from '@expo/vector-icons';
import GlobalStyles from '../../Styles/GlobalStyles';

const Stack = createStackNavigator();
const { width } = Dimensions.get('window');
const LIGHTPINK = '#F7D2CF';

// Renders the top header for each main screen.
// This header includes all of the tab bar screens AND 
// the detail screens which can be accessed from any other screen
const Header = ({ route, component, name, navigation }) => {

    return (
        <Stack.Navigator
            headerMode='screen'
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
                options={({ route, navigation }) => ({

                    headerTitle: () => (
                        <Image
                            style={{ height: 150 }}
                            source={require('./bardega_logo.png')}
                            resizeMode='contain'
                        />
                    ),
                    headerRight: () => (
                        <View style={GlobalStyles.headerWithButtons} >
                            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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

                })}
            />
            <Stack.Screen
                name='FollowScreen'
                component={FollowScreen}
                options={({ route, navigation }) => ({

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
                            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
                })}
            />
            <Stack.Screen
                name='FavoritesScreen'
                component={FavoritesScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <Image
                            style={{ height: 150 }}
                            source={require('./bardega_logo.png')}
                            resizeMode='contain'
                        />
                    ),
                    headerRight: () => (
                        <View style={GlobalStyles.headerWithButtons} >
                            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
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
                })}
            />
            <Stack.Screen
                name='DrinkListScreen'
                component={DrinkListScreen}
                //initialParams={route, navigation}
                options={({ route, navigation }) => ({

                    headerTitle: () => (
                        <Image
                            style={{ height: 150 }}
                            source={require('./bardega_logo.png')}
                            resizeMode='contain'
                        />
                    ),
                    headerRight: () => {
                        // TODO: Only render this if it is the drinkListScreen from favorites route
                        const handleEditCollection = () => {
                            return Alert.alert(
                                "Collection Options",
                                null,
                                [
                                    {
                                        text: "Delete Collection",
                                        onPress: () => handleDeleteCollection(),
                                        style: "destructive"
                                    },
                                    {
                                        text: "Edit Collection",
                                        onPress: () => navigation.navigate('EditCollectionScreen', { collection: route.params.collection }),
                                    },
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                    },
                                ],
                                { cancelable: true }
                            );
                        }

                        // TODO: Connect the Redux-firebase with a delete collection action
                        const handleDeleteCollection = () => {
                            return Alert.alert(
                                "Delete Collection?",
                                "When you delete this collection, the drinks will still be saved.",
                                [
                                    {
                                        text: "Delete",
                                        onPress: () => console.log('DELETE COLLECTION'),
                                        style: "destructive"
                                    },
                                    {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                    },
                                ],
                                { cancelable: true }
                            );
                        }

                        return (
                            <View style={GlobalStyles.headerWithButtons} >
                                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                                    <Image
                                        style={{ height: 20, width: 20 }}
                                        source={require('./back_button.png')}
                                        resizeMode='contain'
                                    />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => handleEditCollection()}>
                                    <Entypo name="dots-three-vertical" size={20} color="black" />
                                </TouchableWithoutFeedback>
                            </View>
                        )
                    },
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: LIGHTPINK
                })}
            />
            <Stack.Screen
                name='EditCollectionScreen'
                component={EditCollectionScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => (
                        <Image
                            style={{ height: 150 }}
                            source={require('./bardega_logo.png')}
                            resizeMode='contain'
                        />
                    ),
                    headerRight: () => {

                        // TODO: Save edits to DB
                        const handleDoneEditing = () => {

                            navigation.goBack();
                        }

                        return (
                            <View style={GlobalStyles.headerWithButtons} >
                                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                                    <Text>Cancel</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => handleDoneEditing()}>
                                    <Text>Done</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        )
                    },
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: LIGHTPINK
                })}
            />
        </Stack.Navigator>
    );
}

export default Header;