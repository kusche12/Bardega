import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, TouchableWithoutFeedback, Dimensions, View } from 'react-native';
import DrinkDetailScreen from '../../Screens/Main/DrinkDetailScreen';
import SpiritScreen from '../../Screens/Main/SpiritScreen';
import GlobalStyles from '../../Styles/GlobalStyles';

const Stack = createStackNavigator();
const { width } = Dimensions.get('window');
const LIGHTPINK = '#F7D2CF';

const SpiritNavigator = ({ route, navigation }) => {
    return (
        <Stack.Navigator
            headerMode='screen'
            screenOptions={{
                headerStyle: { elevation: 0 },
                cardStyle: { backgroundColor: '#FFFFFF' },
            }}>
            <Stack.Screen
                name='SpiritScreen'
                component={SpiritScreen}
                initialParams={route.params, navigation}
                options={() => ({
                    headerTitle: () => (
                        <Image
                            style={{ width: width, height: 150 }}
                            source={require('./bardega_logo.png')}
                            resizeMode='cover'
                        />
                    ),
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerTitleAlign: 'center',
                })}
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
        </Stack.Navigator>
    );
}

export default SpiritNavigator;