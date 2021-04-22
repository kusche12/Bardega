import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableWithoutFeedback, View, Alert, Text } from 'react-native';

import DrinkDetailScreen from '../../Screens/Main/DrinkDetailScreen';
import FollowScreen from '../../Screens/ProfileScreens/FollowScreen';
import FavoritesScreen from '../../Screens/ProfileScreens/FavoritesScreen';
import EditCollectionScreen from '../../Screens/ProfileScreens/EditCollectionScreen';
import SettingsScreen from '../../Screens/ProfileScreens/SettingsScreen';
import DrinkListScreen from '../../Screens/Main/DrinkListScreen';
import CreateScreen from '../../Screens/Main/CreateScreen';

import { Entypo } from '@expo/vector-icons';
import Images from '../../Images/Images'
import ProfileScreen from '../../Screens/Main/ProfileScreen';
import CommentsScreen from '../../Screens/Main/CommentsScreen';

import MainHeader from '../../Components/TopNavbar/MainHeader';
import GoBackHeader from '../../Components/TopNavbar/GoBackHeader';

import GlobalStyles from '../../Styles/GlobalStyles';

const Stack = createStackNavigator();
const LIGHTPINK = '#F7D2CF';

const ProfileNavigator = ({ route, navigation }) => {
    const { header } = route.params;

    return (
        <Stack.Navigator
            headerMode='screen'
            screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}>
            <Stack.Screen
                name='ProfileScreen'
                component={ProfileScreen}
                initialParams={route.params, navigation}
                options={() => ({
                    headerTitle: () => <MainHeader header={header} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                })}
            />
            <Stack.Screen
                name='DrinkDetailScreen'
                component={DrinkDetailScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader header={header} />,
                    headerRight: () => <GoBackHeader navigation={navigation} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: LIGHTPINK

                })}
            />
            <Stack.Screen
                name='CommentsScreen'
                component={CommentsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader header={header} />,
                    headerRight: () => <GoBackHeader navigation={navigation} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: LIGHTPINK
                })}
            />
            <Stack.Screen
                name='CreateScreen'
                component={CreateScreen}
                initialParams={route.params, navigation}
                options={() => ({
                    headerTitle: () => <MainHeader header={header} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                })}
            />
            <Stack.Screen
                name='FollowScreen'
                component={FollowScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader header={header} />,
                    headerRight: () => <GoBackHeader navigation={navigation} />,
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
                    headerTitle: () => <MainHeader header={header} />,
                    headerRight: () => <GoBackHeader navigation={navigation} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: LIGHTPINK
                })}
            />
            <Stack.Screen
                name='DrinkListScreen'
                component={DrinkListScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader header={header} />,
                    headerRight: () => {
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
                                        source={Images.topNav.backButton}
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
                    headerTitle: () => <MainHeader header={header} />,
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
            <Stack.Screen
                name='SettingsScreen'
                component={SettingsScreen}
                options={({ route, navigation }) => ({
                    headerTitle: () => <MainHeader header={header} />,
                    headerRight: () => <GoBackHeader navigation={navigation} />,
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTintColor: LIGHTPINK
                })}
            />
        </Stack.Navigator>
    );
}

export default ProfileNavigator;