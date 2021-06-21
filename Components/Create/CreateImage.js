import React, { useEffect } from 'react';
import { Image, View, TouchableWithoutFeedback, Text, Alert } from 'react-native';
import Images from '../../Images/Images';
import * as ImagePicker from 'expo-image-picker';

import CreateStyles from '../../Styles/CreateStyles'
import GlobalStyles from '../../Styles/GlobalStyles'
import Styles from '../../Styles/StyleConstants';

const CreateImage = ({ drinkImage, setDrinkImage }) => {
    // Need permission
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    // Renders the image container with either an empty box or the picture of the drink
    const renderDrinkContainer = () => {
        if (drinkImage === null) {
            return (
                <View style={GlobalStyles.flexCenter}>
                    <Image source={Images.profile.plus} style={CreateStyles.plusImage} />
                    <Text style={[GlobalStyles.paragraph2, { color: Styles.GRAY, width: Styles.width * .3, textAlign: 'center' }]}>
                        Add photo from photo album
                        </Text>
                </View>
            );
        } else {
            return (
                <Image source={{ uri: drinkImage }} style={CreateStyles.drinkImage} />
            )
        }
    }

    // Asks user if they want to take a picture, choose from camera roll, or cancel
    const sendAlert = () => {
        Alert.alert("Upload Image", "Take a picture, it'll last longer", [
            {
                text: 'Take a Picture',
                onPress: () => takeImage(),
            },
            {
                text: 'Choose from Camera Roll',
                onPress: () => pickImage(),
            },
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
            },
        ]);
    };

    // Handle taking picture
    const takeImage = async () => {
        const rollPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (rollPermission.status !== 'granted') {
            alert(
                'You will not be able to take a picture of your drink without camera access. Please allow Camera access in your iOS Application Settings.'
            );
        } else {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: .5,
            });
            if (!result.cancelled) {
                setDrinkImage(result.uri);
            }
        }

    };

    // Handle choose from camera roll
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: .5,
        });

        if (!result.cancelled) {
            setDrinkImage(result.uri);
        }
    };

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => sendAlert()}>
                <View style={CreateStyles.photoContainer}>
                    {renderDrinkContainer()}
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default CreateImage;