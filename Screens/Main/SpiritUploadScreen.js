import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, SafeAreaView, TextInput, View, Alert, Platform, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { createSpirit } from '../../Store/Actions/SpiritActions';

import CreateImage from '../../Components/Create/CreateImage';
import CreateOptionPicker from '../../Components/Create/CreateOptionPicker'
import GlobalStyles from '../../Styles/GlobalStyles';
import CreateStyles from '../../Styles/CreateStyles';
import Styles from '../../Styles/StyleConstants';

const SpiritUploadScreen = ({ userID, navigation, spiritError, spiritID, createSpirit }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [drinkName, setDrinkName] = useState('');
    const [drinkDesc, setDrinkDesc] = useState('');
    const [drinkImage, setDrinkImage] = useState(null);
    const [drinkPrice, setDrinkPrice] = useState({ value: 'affordable', label: 'Affordable' });
    const [drinkable, setDrinkable] = useState({ value: 'mixing', label: 'Mixing' },);
    const [available, setAvailable] = useState({ value: 'limited', label: 'Limited' });
    const [spirit, setSpirit] = useState({ value: 'gin', label: 'Gin' });

    useEffect(() => {
        if (userID) {
            setIsLoading(false);
        }
    }, [userID])


    // Update application state if there is a drink error message or
    // Navigate to profile as soon as there is a spiritID in the screen's state
    useEffect(() => {
        if (spiritID && !isLoading) {
            discardChanges();
            navigation.navigate('Profile', { screen: 'ProfileScreen' })
        } else if (spiritError) {
            console.log("THERE WAS AN ERROR IN THE CREATE SCREEN")
        }
    }, [spiritID, spiritError]);

    // Handle the submission of the spirit
    const handleSubmit = async () => {
        if (drinkName.length < 1) {
            return Alert.alert(
                "Hang on!",
                "You must give your spirit a name before submitting.",
                [
                    {
                        text: "Okay",
                        onPress: console.log("Okay pressed")
                    }
                ],
                { cancelable: true }
            );
        } else {
            setIsUploading(true);
            let image = await convertImage();
            await createSpirit({
                authorID: userID,
                drinkDesc, image, drinkName,
                drinkPrice: drinkPrice.label,
                drinkable: drinkable.label,
                available: available.label,
                spirit: spirit.label
            });
        }
        setIsUploading(false);
    }

    // Handler that prepares the drink image to be sent to firestorage
    const convertImage = async () => {
        if (drinkImage === null) {
            return null;
        }
        const response = await fetch(drinkImage);
        const blob = await response.blob();
        return blob;
    }

    // Resets the screen's state to null values and navigates away from the create screen
    const handleCancel = () => {
        return Alert.alert(
            "Discard Changes",
            "Are you sure you want to discard the changes you made to this drink?",
            [
                {
                    text: "Yes, discard changes",
                    onPress: () => { discardChanges(); navigation.goBack() }
                },
                {
                    text: "Cancel",
                    onPress: console.log("cancel pressed"),
                    style: 'cancel'
                },
            ],
            { cancelable: true }
        );
    }

    const discardChanges = () => {
        setDrinkName('')
        setDrinkDesc('')
        setDrinkImage(null);
        setDrinkPrice({ value: 'affordable', label: 'Affordable' });
        setDrinkable({ value: 'mixing', label: 'Mixing' },);
        setAvailable({ value: 'limited', label: 'Limited' });
        setSpirit({ value: 'gin', label: 'Gin' });
    }

    // Give the tags some time to load from firestore
    if (isLoading) {
        return null;
    } else {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                enableAutomaticScroll={(Platform.OS === 'ios')}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <SafeAreaView style={[GlobalStyles.headerSafeArea, CreateStyles.container]}>

                    <Text style={GlobalStyles.titlebold1}>SUBMIT A SPIRIT</Text>

                    <View style={CreateStyles.inputBox}>
                        <Text style={GlobalStyles.titlebold2}>Spirit Name</Text>
                        <TextInput
                            style={[GlobalStyles.paragraph1, { color: Styles.GRAY, width: Styles.width * .9, textAlign: 'center' }]}
                            onChangeText={setDrinkName}
                            value={drinkName}
                            placeholder='Give your spirit a name'
                            multiline={false}
                            placeholderTextColor={Styles.GRAY}
                        />
                    </View>

                    <View style={CreateStyles.inputBox}>
                        <Text style={GlobalStyles.titlebold2}>Description</Text>
                        <TextInput
                            style={[GlobalStyles.paragraph1, { color: Styles.GRAY, width: Styles.width * .9, textAlign: 'center' }]}
                            onChangeText={setDrinkDesc}
                            value={drinkDesc}
                            placeholder='Give your spirit a description'
                            multiline={true}
                            blurOnSubmit={true}
                            placeholderTextColor={Styles.GRAY}
                        />
                    </View>

                    <CreateImage {...{ drinkImage, setDrinkImage }} />

                    <CreateOptionPicker item={drinkPrice} setItem={setDrinkPrice} itemType='PRICE' />

                    <CreateOptionPicker item={drinkable} setItem={setDrinkable} itemType='DRINKABILITY' />

                    <CreateOptionPicker item={available} setItem={setAvailable} itemType='AVAILABILITY' />

                    <CreateOptionPicker item={spirit} setItem={setSpirit} itemType='SPIRIT TYPE' />

                    <TouchableWithoutFeedback disabled={isUploading} onPress={() => handleSubmit()}>
                        <View style={CreateStyles.submitBtn}>
                            {isUploading
                                ? <ActivityIndicator size="small" color='white' />
                                : <Text style={[GlobalStyles.titlebold2, { color: 'white' }]}>Submit Spirit</Text>
                            }
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={() => handleCancel()}>
                        <View style={[CreateStyles.submitBtn, CreateStyles.cancelBtn]}>
                            <Text style={[GlobalStyles.titlebold2, { color: Styles.DARK_PINK }]}>Discard Changes</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    {spiritError &&
                        <Text style={{ color: 'red', textAlign: 'center', width: Styles.width * .8, marginBottom: 20 }}>{spiritError}</Text>
                    }

                </SafeAreaView>
            </KeyboardAwareScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userID: state.firebase.auth.uid,
        spiritError: state.spirit.spiritError,
        spiritID: state.spirit.spiritID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createSpirit: (data) => dispatch(createSpirit(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpiritUploadScreen);