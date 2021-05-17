import React from 'react';
import { View, FlatList, Text } from 'react-native';
import RenderDrink from './RenderDrink';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const renderList = ({ item, index, navigation, ownProfile, user }) => {
    if (index === 0) {
        return (
            <View style={{ width: Styles.width }}>
                <FlatList
                    data={item}
                    renderItem={(item) => <RenderDrink navigation={navigation} object={item} />}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    scrollEnabled={false}
                    horizontal={false}
                />
            </View>
        )
    } else {
        if (ownProfile || !user.likedDrinksPrivate) {
            return (
                <View style={{ width: Styles.width }}>
                    <FlatList
                        data={item}
                        renderItem={(item) => <RenderDrink navigation={navigation} object={item} />}
                        keyExtractor={item => item.id}
                        numColumns={3}
                        scrollEnabled={false}
                        horizontal={false}
                    />
                </View>
            )
        } else {
            return (
                <View style={{ width: Styles.width, flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={[GlobalStyles.paragraphbold2, { marginTop: 48, marginBottom: 8 }]}>The user's liked drinks are private</Text>
                    <Text style={[GlobalStyles.paragraph3, { color: Styles.GRAY }]}>Drinks liked by {user.userName} are currently hidden</Text>
                </View>
            )
        }
    }
}

export default renderList;