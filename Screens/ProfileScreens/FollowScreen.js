import React, { useState, useEffect } from 'react';
import { FlatList, Text, SafeAreaView, View, TouchableWithoutFeedback, Image, ActivityIndicator } from 'react-native';
import { cacheImages, getCachedImage } from '../../Functions/cacheFunctions';
import { navigateToProfile } from '../../Functions/miscFunctions';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
// import firebase from '../../API/FirebaseSetup'
import GlobalStyles from '../../Styles/GlobalStyles';
import UserStyles from '../../Styles/UserStyles';
import Styles from '../../Styles/StyleConstants';

const LIMIT = 10;

const FollowScreen = ({ route, navigation, profiles, allFollowers, allFollowing, userID }) => {
    const { name } = route.params;

    const [userProfiles, setUserProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastIndex, setLastIndex] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(null);
    // const [users, setUsers] = useState([]);

    // Wait for userData to be fully loaded into the screen
    useEffect(() => {
        if (allFollowers && allFollowing && userID) {
            retrieveData();
        }
        // async function fetchData() {
        //     if (userID) {
        //         if (name == "Followers") {
        //             let db = firebase.firestore();
        //             db
        //                 .collection('profileFollowers')
        //                 .doc(profiles[userID].profileFollowID)
        //                 .collection('followerUsers')
        //                 .get()
        //                 .then(querySnapshot => {
        //                     let followUsers = querySnapshot.docs.map(doc => doc.data());
        //                     setUsers(followUsers);
        //                 }).catch((err) => {
        //                     console.log(err)
        //                 })
        //         }
        //     }
        // }
        // fetchData();

    }, [userID])

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
            <TouchableWithoutFeedback onPress={() => {
                navigateToProfile(navigation, item, userID)
            }
            }>
                <View style={UserStyles.followRow}>
                    <Image source={{ uri: getCachedImage(item.id) || item.imageURL }} style={UserStyles.followImage} />
                    <View>
                        <Text style={GlobalStyles.titlebold2}>{item.userName}</Text>
                        <Text style={[GlobalStyles.title3, { color: Styles.GRAY }]}>{item.fName} {item.lName}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const retrieveData = async () => {
        console.log('getting data')
        let currItems = [];
        let currIndex = lastIndex;
        let allItems = [...userProfiles];
        setIsRefreshing(true);

        if (name === 'Following') {
            while (currIndex < allFollowing.length && currItems.length < LIMIT) {
                if (allFollowing[currIndex].id !== 'default') {
                    const profile = await profiles[allFollowing[currIndex].id];
                    cacheImages(profile.imageURL, profile.id);
                    currItems.push(profile);
                }
                currIndex++;
            }
        } else {
            while (currIndex < allFollowers.length && currItems.length < LIMIT) {
                if (allFollowers[currIndex].id !== 'default') {
                    const profile = await profiles[allFollowers[currIndex].id];
                    cacheImages(profile.imageURL, profile.id);
                    currItems.push(profile)
                }
                currIndex++;
            }
        }

        setUserProfiles(allItems.concat(currItems));
        setLastIndex(currIndex);
        setIsLoading(false);
        setIsRefreshing(false);
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
                    onEndReached={retrieveData}
                    onEndReachedThreshold={.1}
                    refreshing={isRefreshing}
                    ListFooterComponent={isRefreshing &&
                        <View style={{ marginTop: 20 }} >
                            <ActivityIndicator color={Styles.DARK_PINK} />
                        </View>
                    }
                    contentContainerStyle={{ paddingBottom: 30 }}
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