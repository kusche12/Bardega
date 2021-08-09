import React, { useState, useEffect } from 'react';
import { FlatList, Platform, View } from 'react-native';
import Styles from '../../Styles/StyleConstants';
import RenderDrink from './RenderDrink';

const PaginatedFlatList = ({ data, navigation }) => {

    if (data) {
        return (
            <View style={{ width: Styles.width }}>
                <FlatList
                    data={data}
                    extraData={data}
                    renderItem={(item) => <RenderDrink navigation={navigation} object={item} />}
                    keyExtractor={item => item.id}
                    numColumns={Platform.isPad ? 4 : 3}
                    horizontal={false}
                    scrollEnabled={false}
                />
            </View>
        )
    }

}

export default PaginatedFlatList;