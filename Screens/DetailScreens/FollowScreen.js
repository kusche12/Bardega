import React, { useState, useEffect } from 'react';
import { FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Image, Dimensions } from 'react-native';
import Loading from '../../Components/Main/Loading';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import CreateStyles from '../../Styles/CreateStyles';

const width = Dimensions.get('screen').width;
const Stack = createStackNavigator();

// TODO: If the currently authed user does not follow one of the users on the list
//      Render a "follow" button (like on Instagram)
const FollowScreen = ({ route, navigation, userData }) => {
    const { users, name } = route.params;

    const [userProfiles, setUserProfiles] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Wait for userData to be fully loaded into the screen
    useEffect(() => {
        if (userData) {
            loadData();
        }
    }, [])

    const loadData = async () => {
        let res = [];
        for (let i = 0; i < users.length; i++) {
            const profile = await userData[users[i].id];
            res.push(profile)
        }
        setUserProfiles(res);
        setIsLoading(false);
    }

    // Render the word Follower when there is only 1
    const getText = () => {
        let text = name;
        if (name === 'Followers' && users.length === 1) {
            text = 'Follower';
        }
        return text;
    }

    const renderUser = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile', { user: item })}>
                <View style={UserStyles.followRow}>
                    <Image source={{ uri: item.imageURL }} style={UserStyles.followImage} />
                    <View style={{ marginLeft: 8 }}>
                        <Text style={{ fontWeight: '500', fontSize: 16 }}>{item.userName}</Text>
                        <Text style={{ fontSize: 14, color: '#a1a1a1' }}>{item.fName} {item.lName}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    if (isLoading) {
        return <Loading />
    } else {
        return (
            <SafeAreaView style={[GlobalStyles.headerSafeArea, UserStyles.container]} >
                <View style={UserStyles.followerHeader}>
                    <Text style={[UserStyles.title2]}>{users.length} {getText()}</Text>
                    <View style={[CreateStyles.ingrLine, { width: width * .9, alignSelf: 'center' }]}></View>
                </View>
                <FlatList
                    data={userProfiles}
                    keyExtractor={item => item.id}
                    renderItem={renderUser}
                />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    const profiles = state.firestore.data.profiles;
    return {
        userData: profiles
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => ['profiles'])
)(FollowScreen);