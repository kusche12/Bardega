import React, { useState, useEffect } from 'react';
import { FlatList, Platform, View } from 'react-native';
import Styles from '../../Styles/StyleConstants';
import RenderDrink from './RenderDrink';

const PaginatedFlatList = ({ data, index, navigation }) => {
    const [currIndex, setCurrIndex] = useState(0);
    const [renderItems, setRenderItems] = useState([]);
    console.log(data[0].name)

    useEffect(() => {
        getData();
    }, [index]);

    const getData = () => {
        let currItems = [...renderItems];
        let newItems = [];
        let i = currIndex;

        while (i < data.length && i < index) {
            newItems.push(data[i]);
            i++;
        }

        setCurrIndex(i);
        setRenderItems(currItems.concat(newItems));
    }

    return (
        <View style={{ width: Styles.width }}>
            <FlatList
                data={renderItems}
                extraData={renderItems}
                renderItem={(item) => <RenderDrink navigation={navigation} object={item} />}
                keyExtractor={item => item.id}
                numColumns={Platform.isPad ? 4 : 3}
                horizontal={false}
                scrollEnabled={false}
            />
        </View>
    )
}

export default PaginatedFlatList;