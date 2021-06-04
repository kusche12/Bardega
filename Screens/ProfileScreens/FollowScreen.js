import React, { useState, useEffect } from 'react';
import { FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Image } from 'react-native';
import Loading from '../../Components/Main/Loading';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants';

const FollowScreen = ({ route, navigation, profiles, allFollowers, allFollowing, userID }) => {
    const { name } = route.params;

    const [userProfiles, setUserProfiles] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Wait for userData to be fully loaded into the screen
    useEffect(() => {
        if (allFollowers && allFollowing && userID) {
            loadData();
        }
    }, [allFollowers, allFollowing, userID])

    const loadData = async () => {
        let res = [];
        if (name === 'Following') {
            for (let i = 0; i < allFollowing.length; i++) {
                if (allFollowing[i].id !== 'default') {
                    const profile = await profiles[allFollowing[i].id];
                    cacheImages(profile.imageURL, profile.id);
                    res.push(profile)
                }
            }
        } else {
            for (let i = 0; i < allFollowers.length; i++) {
                if (allFollowers[i].id !== 'default') {
                    const profile = await profiles[allFollowers[i].id];
                    cacheImages(profile.imageURL, profile.id);
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
        let ownProfile = item.id === userID;
        return (
            <TouchableWithoutFeedback onPress={() => navigation.push('ProfileScreen', { user: item, ownProfile: ownProfile })}>
                <View style={UserStyles.followRow}>
                    <Image source={{ uri: getCachedImage(item.id) || item.imageURL }} style={UserStyles.followImage} />
                    <View style={{ marginLeft: 8 }}>
                        <Text style={GlobalStyles.titlebold2}>{item.userName}</Text>
                        <Text style={[GlobalStyles.title3, { color: Styles.GRAY }]}>{item.fName} {item.lName}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    if (isLoading) {
        return null;
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

const mapStateToProps = (state, ownProps) => {
    const profiles = state.firestore.data.profiles;
    let userID = state.firebase.auth.uid;
    return {
        profiles: profiles,
        allFollowers: state.firestore.ordered['allFollowers' + ownProps.route.params.user.profileFollowID],
        allFollowing: state.firestore.ordered['allFollowing' + ownProps.route.params.user.profileFollowID],
        userID: userID
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => [
        {
            collection: "profileFollowers",
            doc: props.route.params.user.profileFollowID,
            storeAs: 'allFollowers' + props.route.params.user.profileFollowID,
            subcollections: [{
                collection: "followerUsers"
            }
            ]
        },
        {
            collection: "profileFollowing",
            doc: props.route.params.user.profileFollowID,
            storeAs: 'allFollowing' + props.route.params.user.profileFollowID,
            subcollections: [{
                collection: "followingUsers"
            }
            ]
        },

    ])
)(FollowScreen);