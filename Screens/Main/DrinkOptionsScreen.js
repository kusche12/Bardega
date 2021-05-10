import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Switch, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import Images from '../../Images/Images';
import { updateDrinkPrivacy, updateDrinkCommentAllowed } from '../../Store/Actions/DrinkActions';
import GlobalStyles from '../../Styles/GlobalStyles';
import Styles from '../../Styles/StyleConstants';

const DrinkOptionsScreen = ({ error, drink, updateDrinkPrivacy, updateDrinkCommentAllowed }) => {

    const [isPrivate, setIsPrivate] = useState(false);
    const [isCommentAllowed, setIsCommentAllowed] = useState(false);

    useEffect(() => {
        if (drink) {
            setIsPrivate(drink.private);
            setIsCommentAllowed(drink.commentsAllowed)
        }
    }, [drink]);

    const handleChange = async () => {
        if (isPrivate) {
            return Alert.alert(
                "Are you sure?",
                "Every user on this app will have access to view this drink.",
                [
                    {
                        text: "Make Drink Public",
                        onPress: () => confirmPrivacy()
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
                "No one on this app will have access to view or interact with this drink.",
                [
                    {
                        text: "Make Drink Private",
                        onPress: () => confirmPrivacy()
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

    const handleChangeComments = async () => {
        if (isCommentAllowed) {
            return Alert.alert(
                "Are you sure?",
                "No users will be able to comment on this drink and all current comments will be hidden from this drink.",
                [
                    {
                        text: "Turn off Comments",
                        onPress: () => updateDrinkCommentAllowed({ id: drink.id, commentsAllowed: !isCommentAllowed })
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
                "Every user will have the ability to comment on this drink.",
                [
                    {
                        text: "Turn on Comments",
                        onPress: () => updateDrinkCommentAllowed({ id: drink.id, commentsAllowed: !isCommentAllowed })
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

    const confirmPrivacy = async () => {
        await updateDrinkPrivacy({ id: drink.id, privacy: !isPrivate });
    }

    return (
        <SafeAreaView style={GlobalStyles.headerSafeArea}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'flex-start' }}>
                <Text style={GlobalStyles.paragraphbold2}>Drink Options</Text>
            </View>

            <View style={[GlobalStyles.line, { backgroundColor: Styles.LIGHT_GRAY, marginBottom: 16 }]}></View>

            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'space-between', marginBottom: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={Images.settings.lock} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 8 }} />
                    <Text style={GlobalStyles.paragraph1}>Private Drink</Text>
                </View>
                <Switch
                    value={isPrivate}
                    onValueChange={handleChange}
                />
            </View>

            <View style={{ flexDirection: 'row', paddingHorizontal: 8, justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={Images.settings.fullComment} style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 8 }} />
                    <Text style={GlobalStyles.paragraph1}>Comments Allowed</Text>
                </View>
                <Switch
                    value={isCommentAllowed}
                    onValueChange={handleChangeComments}
                />

            </View>

            { error && <Text style={[GlobalStyles.paragraphError2, { textAlign: 'center' }]}>{error}</Text>}
        </SafeAreaView>
    )
}

const mapStateToProps = (state, ownProps) => {
    const profiles = state.firestore.data.profiles;
    const profile = profiles ? profiles[state.firebase.auth.uid] : null;

    const id = ownProps.route.params.drinkID;
    const drinks = state.firestore.data.drinks;
    const drink = drinks ? drinks[id] : null;

    return {
        userID: state.firebase.auth.uid,
        error: state.profile.profileError,
        user: profile,
        drink: drink
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateDrinkPrivacy: (data) => dispatch(updateDrinkPrivacy(data)),
        updateDrinkCommentAllowed: (data) => dispatch(updateDrinkCommentAllowed(data)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DrinkOptionsScreen);
