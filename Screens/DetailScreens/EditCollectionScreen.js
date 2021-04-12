import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import UserStyles from '../../Styles/UserStyles';

const EditCollectionScreen = ({ route }) => {

    const [name, setName] = useState(route.params.collection.name);
    // useEffect(() => {
    //     if (route.params.collection) {
    //         setName(route.params.collection.name);
    //     }
    // }, []);

    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea} >
            <View style={DiscoverStyles.searchHeader}>
                <Text style={DiscoverStyles.title}>Edit Collection</Text>
            </View>
            <View style={UserStyles.collectionContainer}>
                <Text>Name</Text>
                <TextInput
                    value={name}
                    onChange={(text) => setName(text)}
                />
            </View>
        </SafeAreaView>
    )

}

export default EditCollectionScreen;