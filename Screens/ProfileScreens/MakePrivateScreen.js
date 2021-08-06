import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Switch, Image, Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import Images from '../../Images/Images';
import { updatePrivacy, updateLikedDrinkPrivacy } from '../../Store/Actions/ProfileActions';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const MakePrivateScreen = ({ userID, error, user, updatePrivacy, updateLikedDrinkPrivacy }) => {

    const [isPrivate, setIsPrivate] = useState(false);
    const [isPrivateDrink, setIsPrivateDrink] = useState(false);

    useEffect(() => {
        if (user) {
            setIsPrivate(user.private);
            setIsPrivateDrink(user.likedDrinksPrivate)
        }
    }, [user]);

    const handleChange = async () => {
        if (isPrivate) {
            return Alert.alert(
                "Are you sure?",
                "Every user on this app will have access to your account profile and drinks.",
                [
                    {
                        text: "Make Account Public",
                        onPress: () => confirm()
                    },
                    {
                        text: "Cancel",
                        onPress: console.log(false),
                        style: "cancel",
                    }
                ],
                { cancelable: true }
            );
        } else {
            return Alert.alert(
                "Are you sure?",
                "Only your followers will be allowed to view your profile and drinks.",
                [
                    {
                        text: "Make Account Private",
                        onPress: () => confirm()
                    },
                    {
                        text: "Cancel",
                        onPress: console.log(false),
                        style: "cancel",
                    }
                ],
                { cancelable: true }
            );
        }


    }

    const confirm = async () => {
        await updatePrivacy({ id: userID, privacy: !isPrivate });
    }

    const handleChangeDrink = async () => {
        if (isPrivateDrink) {
            return Alert.alert(
                "Are you sure?",
                "All the drinks that you like will now be publicly available to other users.",
                [
                    {
                        text: "Make Liked Drinks Public",
                        onPress: () => updateLikedDrinkPrivacy({ id: userID, privacy: !isPrivateDrink })
                    },
                    {
                        text: "Cancel",
                        onPress: console.log(false),
                        style: "cancel",
                    }
                ],
                { cancelable: true }
            );
        } else {
            return Alert.alert(
                "Are you sure?",
                "All the drinks that you like will now be private to other users.",
                [
                    {
                        text: "Make Liked Drinks Private",
                        onPress: () => updateLikedDrinkPrivacy({ id: userID, privacy: !isPrivateDrink })
                    },
                    {
                        text: "Cancel",
                        onPress: console.log(false),
                        style: "cancel",
                    }
                ],
                { cancelable: true }
            );
        }
    }


    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'flex-start' }}>
                <Text style={GlobalStyles.paragraphbold2}>Account Privacy</Text>
            </View>
            <View style={[GlobalStyles.line, { backgroundColor: Styles.LIGHT_GRAY, marginBottom: 16 }]}></View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'space-between', marginBottom: 16 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={Images.settings.lock} style={{ width: Platform.isPad ? 30 : 20, height: Platform.isPad ? 30 : 20, resizeMode: 'contain', marginRight: 8 }} />
                    <Text style={GlobalStyles.paragraph1}>Private Account</Text>
                </View>
                <Switch
                    value={isPrivate}
                    onValueChange={handleChange}
                />
            </View>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={Images.profile.heart} style={{ width: Platform.isPad ? 30 : 20, height: Platform.isPad ? 30 : 20, resizeMode: 'contain', marginRight: 8 }} />
                    <Text style={GlobalStyles.paragraph1}>Private Liked Drinks</Text>
                </View>
                <Switch
                    value={isPrivateDrink}
                    onValueChange={handleChangeDrink}
                />
            </View>
            {error && <Text style={[GlobalStyles.paragraphError2, { textAlign: 'center' }]}>{error}</Text>}
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    const profiles = state.firestore.data.profiles;
    const profile = profiles ? profiles[state.firebase.auth.uid] : null;
    return {
        userID: state.firebase.auth.uid,
        error: state.profile.profileError,
        user: profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePrivacy: (data) => dispatch(updatePrivacy(data)),
        updateLikedDrinkPrivacy: (data) => dispatch(updateLikedDrinkPrivacy(data)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MakePrivateScreen);
