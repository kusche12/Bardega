import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableWithoutFeedback, Image, Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import { getCachedImage, cacheImages } from '../../Functions/cacheFunctions';
import { updateProfile, updateImage, deleteProfileImage } from '../../Store/Actions/ProfileActions';
import ProfileInput from '../../Components/Profile/ProfileInput';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';
import UserStyles from '../../Styles/UserStyles';
// getCachedImage(userID)
const EditProfileScreen = ({ user, navigation, userID, updateProfile, error, updateImage, deleteProfileImage }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState(null);
    const [bio, setBio] = useState('');

    // Get all user data on screen startup
    useEffect(() => {
        if (user) {
            setFName(user.fName);
            setLName(user.lName);
            setUserName(user.userName);
            setBio(user.bio);
            setImage(user.imageURL)
            navigation.setParams({
                action: updateProfile,
                data: {
                    id: userID,
                    fName: fName,
                    lName: lName,
                    userName: userName
                }
            });
            setIsLoading(false);
        }
    }, [user]);

    // Every time fName, lName, or userName changes, update the navigation state
    useEffect(() => {
        navigation.setParams({
            data: {
                id: userID,
                fName: fName,
                lName: lName,
                userName: userName,
                imageURL: image
            }
        });
    }, [fName, lName, userName]);

    // Every time image changes, update cache
    useEffect(() => {
        setImage(getCachedImage(userID));
    }, [userID]);

    // Asks user if they want to take a picture, choose from camera roll, or cancel
    const sendAlert = () => {
        Alert.alert("Upload Image", "Change your profile photo", [
            {
                text: 'Take a Picture',
                onPress: () => takeImage(),
            },
            {
                text: 'Choose from Camera Roll',
                onPress: () => pickImage(),
            },
            {
                text: 'Remove Profile Photo',
                onPress: () => removeProfilePhoto(),
                style: "destructive"
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
                "You will not be able to take a picture of your drink without camera access. Please allow Camera access in your phone's Application Settings."
            );
        } else {
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: .5,
            });
            if (!result.cancelled) {
                cacheImages(result.uri, userID);
                updateImage({ id: userID, image: result.uri });
                setImage(result.uri);
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
            cacheImages(result.uri, userID);
            updateImage({ id: userID, image: result.uri });
            setImage(result.uri);
        }
    };

    // Handle reverting photo to the default image
    const removeProfilePhoto = () => {
        Alert.alert("Are you sure?", "Once you delete your profile photo, there will be no way to recover it.", [
            {
                text: 'Remove Profile Photo',
                onPress: () => deleteProfileImage({ id: userID }),
            },
            {
                text: 'Cancel',
                onPress: () => console.log('cancelled'),
            }
        ]);
    }

    if (isLoading) {
        return <Spinner visible={isLoading} />
    } else {
        return (
            <SafeAreaView style={[GlobalStyles.headerSafeArea, { alignItems: 'center' }]}>
                <View style={{ marginBottom: 20, alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={() => sendAlert()}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={UserStyles.settingsProfileImage}>
                                <Image source={{ uri: image }} style={UserStyles.profileImage} />
                            </View>
                            <Text style={[GlobalStyles.paragraphbold2, { color: Styles.DARK_PINK, marginTop: 12 }]}>Change Profile Photo</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <ProfileInput name={"First Name"} value={fName} setValue={setFName} />
                    <ProfileInput name={"Last Name"} value={lName} setValue={setLName} />
                    <ProfileInput name={"Username"} value={userName} setValue={setUserName} />
                    <ProfileInput name={"Bio"} value={bio} setValue={setBio} navigation={navigation} />
                </View>
                { error &&
                    <Text style={[GlobalStyles.paragraphError2, { marginTop: 8 }]}>{error}</Text>
                }
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    const profiles = state.firestore.data.profiles;
    const profile = profiles ? profiles[state.firebase.auth.uid] : null;
    return {
        user: profile,
        userID: state.firebase.auth.uid,
        error: state.profile.profileError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (data) => dispatch(updateProfile(data)),
        updateImage: (data) => dispatch(updateImage(data)),
        deleteProfileImage: (data) => dispatch(deleteProfileImage(data)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);