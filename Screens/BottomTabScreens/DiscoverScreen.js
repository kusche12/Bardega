import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Dimensions, Image } from 'react-native';
import DiscoverDetail from '../DetailScreens/DiscoverDetail'

const Stack = createStackNavigator();

const DiscoverScreen = ({ route }) => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Discover"
                component={DiscoverDetail}
                initialParams={route.params}
                options={{ 
                    headerTitle: props => (
                        <Image
                            style={{ height: 150 }}
                            source={require('./bardega_logo.png')}
                            resizeMode='contain'
                        />
                    ),
                    headerTitleStyle: { flex: 1, textAlign: 'center' },
                }}
            />
        </Stack.Navigator>
    );
}

export default DiscoverScreen;