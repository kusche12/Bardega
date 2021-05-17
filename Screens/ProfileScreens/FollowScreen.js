import React, { useState, useEffect } from 'react';
import { FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Image } from 'react-native';
import Loading from '../../Components/Main/Loading';
import { followUser, unfollowUser } from '../../Store/Actions/ProfileActions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants';

// TODO: If the currently authed user does not follow one of the users on the list
//      Render a "follow" button (like on Instagram)
const FollowScreen = ({ route, navigation, profiles, allFollowers, allFollowing }) => {
    const { name } = route.params;

    const [userProfiles, setUserProfiles] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Wait for userData to be fully loaded into the screen
    useEffect(() => {
        if (allFollowers, allFollowing) {
            loadData();
        }
    }, [allFollowers, allFollowing])

    const loadData = async () => {
        let res = [];
        // console.log(name);
        if (name === 'Following') {
            for (let i = 0; i < allFollowing.length; i++) {
                if (allFollowing[i].id !== 'default') {
                    const profile = await profiles[allFollowing[i].id];
                    res.push(profile)
                }
            }
        } else {
            for (let i = 0; i < allFollowers.length; i++) {
                if (allFollowers[i].id !== 'default') {
                    const profile = await profiles[allFollowers[i].id];
                    res.push(profile)
                }
            }
        }

        setUserProfiles(res);
        setIsLoading(false);
    }

    // Render the word Follower when there is only 1
    const getText = () => {
        if (name === "Following") {
            return `${route.params.user.numFollowing} Following`
        } else {
            if (route.params.user.numFollowers === 1) {
                return '1 Follower';
            } else {
                return `${route.params.user.numFollowers} Followers`
            }
        }
    }

    const renderUser = ({ item }) => {
        return (
            <TouchableWithoutFeedback onPress={() => navigation.navigate('ProfileScreen', { user: item, ownProfile: false })}>
                <View style={UserStyles.followRow}>
                    <Image source={{ uri: item.imageURL }} style={UserStyles.followImage} />
                    <View style={{ marginLeft: 8 }}>
                        <Text style={GlobalStyles.titlebold2}>{item.userName}</Text>
                        <Text style={[GlobalStyles.title3, { color: Styles.GRAY }]}>{item.fName} {item.lName}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    if (isLoading) {
        return <Loading />
    } else {
        return (
            <SafeAreaView style={GlobalStyles.headerSafeArea}>
                <View style={UserStyles.followerHeader}>
                    <Text style={GlobalStyles.titlebold2}>{getText()}</Text>
                    <View style={[GlobalStyles.line, { width: Styles.width * .9, alignSelf: 'center' }]}></View>
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
        profiles: profiles,
        allFollowers: state.firestore.ordered['allFollowers'],
        allFollowing: state.firestore.ordered['allFollowing'],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        followUser: (data) => dispatch(followUser(data)),
        unfollowUser: (data) => dispatch(unfollowUser(data))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        {
            collection: "profileFollowers",
            doc: props.route.params.user.profileFollowID,
            storeAs: 'allFollowers',
            subcollections: [{
                collection: "followerUsers"
            }
            ]
        },
        {
            collection: "profileFollowing",
            doc: props.route.params.user.profileFollowID,
            storeAs: 'allFollowing',
            subcollections: [{
                collection: "followingUsers"
            }
            ]
        },

    ])
)(FollowScreen);