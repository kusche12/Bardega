import * as React from 'react';
import { TouchableOpacity, Text, SafeAreaView, View, TouchableWithoutFeedback, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';

// TODO: Render the profile info for the currently authed user
const ProfileDetail = ({ route, drinks, user }) => {
    //console.log(user);

    // TODO: Implement the rule below
    // If currently authed user, then render edit profile and favorite routes
    // If any other user, then render follow/unfollow component
    const renderInfoButtons = () => {
        return (
            <View style={UserStyles.buttonRow}>
                <TouchableWithoutFeedback>
                    <View style={[UserStyles.button, { marginRight: 4 }]}>
                        <Text style={UserStyles.subtitle}>Edit Profile</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View style={[UserStyles.button, UserStyles.buttonFavorites]}>
                        <Image source={require('./heart.png')} style={UserStyles.heartImg} />
                        <Text style={UserStyles.subtitle}>Favorites</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    // Renders either the recipes, followers, or following stat box given parameter type
    const renderStatBox = (num, type) => {
        return (
            <TouchableWithoutFeedback>
                <View style={UserStyles.statBox}>
                    <Text style={UserStyles.title}>{num}</Text>
                    <Text style={UserStyles.subtitle}>{type}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid={true}
            enableAutomaticScroll={(Platform.OS === 'ios')}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <SafeAreaView style={[GlobalStyles.headerSafeArea, UserStyles.container]} >

                <View style={UserStyles.infoContainer}>
                    <View style={UserStyles.infoRow}>
                        <Image source={{ uri: user.imageURL }} style={UserStyles.profileImage} />
                        <View style={UserStyles.infoTextContainer}>
                            <Text style={UserStyles.title}>{user.userName}</Text>
                            <Text style={[UserStyles.subtitle, { marginBottom: 8 }]}>{user.fName} {user.lName}</Text>
                            {renderInfoButtons()}
                        </View>
                    </View>
                </View>

                <View style={UserStyles.infoContainer}>
                    <Text style={UserStyles.subtitle}>{user.bio}</Text>
                </View>

                <View style={[UserStyles.infoContainer, { flexDirection: 'row' }]}>
                    {renderStatBox(user.drinks.length, 'Recipes')}
                </View>

            </SafeAreaView>
        </KeyboardAwareScrollView>
    );
}

const mapStateToProps = (state) => {
    const profiles = state.firestore.data.profiles;
    const profile = profiles ? profiles['culture-admin'] : null;

    return {
        drinks: state.firestore.data.drinks,
        user: profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['drinks', 'profiles'])
)(ProfileDetail);