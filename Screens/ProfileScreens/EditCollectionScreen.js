import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import GlobalStyles from '../../Styles/GlobalStyles';
import DiscoverStyles from '../../Styles/DiscoverStyles';
import UserStyles from '../../Styles/UserStyles';

// TODO: Implement the delete collection button from the redux-firebase actions
const EditCollectionScreen = ({ route }) => {

    const [name, setName] = useState(route.params.collection.name);

    return (
        <SafeAreaView style={[GlobalStyles.headerSafeArea, UserStyles.collectionContainer]} >
            <View style={[DiscoverStyles.searchHeader, { marginBottom: 16 }]}>
                <Text style={DiscoverStyles.title}>Edit Collection</Text>
            </View>
            <View style={UserStyles.collectionInputContainer}>
                <Text style={UserStyles.collectionText}>Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder='Collection name'
                    placeholderTextColor='#b3b3b3'
                    style={{ fontSize: 16, marginBottom: 16 }}
                />
            </View>
            <View style={[GlobalStyles.line, { marginBottom: 16 }]}></View>
            <View style={UserStyles.collectionInputContainer}>
                <Text style={UserStyles.collectionText}>Manage</Text>
                <TouchableWithoutFeedback onPress={() => console.log('DELETE COLLECTION')}>
                    <Text style={UserStyles.collectionDelete}>Delete Collection</Text>
                </TouchableWithoutFeedback>
                <Text style={UserStyles.collectionSubtitle}>When you delete this collection, the drinks will still be saved in our databases.</Text>
            </View>
        </SafeAreaView>
    )

}

export default EditCollectionScreen;