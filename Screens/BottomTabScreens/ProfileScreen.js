import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ProfileDetail from '../DetailScreens/ProfileDetail'

const Stack = createStackNavigator();
const windowWidth = Dimensions.get('window').width;

const ProfileScreen = ({ route }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Discover"
                component={ProfileDetail}
                initialParams={route.params}
                options={{ 
                    headerTitle: () => (
                        <Image
                            style={{ height: 150 }}
                            source={require('./bardega_logo.png')}
                            resizeMode='contain'
                        />
                    ),
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                    headerRight: () => (
                        <TouchableOpacity onPress={() => console.log('nav to inbox')}>
                            <Feather name="inbox" size={24} color="black" />
                        </TouchableOpacity>
                    )
                }}
            />
        </Stack.Navigator>
    );
}

export default ProfileScreen;