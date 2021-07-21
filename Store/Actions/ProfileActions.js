import { deleteDrink, unLikeDrink } from './DrinkActions';

// UPDATE: Profile Bio
// Called while editing the Biography of the user's profile
export const updateBio = (data) => {
    console.log('Update Bio Action');
    const { bio, id } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            if (bio.length > 150) {
                dispatch({ type: 'UPDATE_BIO_ERROR', err: { message: 'Bio must be shorter than 150 characters.' } });
                return false;
            }
            // Update bio in the user's profile
            await firestore.collection('profiles').doc(id).update({ bio: bio })

            dispatch({ type: 'UPDATE_BIO', id });
            return true;
        } catch (err) {
            dispatch({ type: 'UPDATE_BIO_ERROR', err });
            return false;
        }
    }
};

// UPDATE: Profile F name, L name, Username
// Called while editing the user's profile
// Checks if the username is already taken before updating
export const updateProfile = (data) => {
    console.log('Update Profile Action');
    const { fName, lName, id, userName } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        const username = userName.trim();
        var ref = firestore.collection("profiles");

        // Ensure  proper username rules
        if (username.length < 1) {
            dispatch({ type: 'UPDATE_PROFILE_ERROR', err: { message: 'Your username must be at least 1 character long' } });
            return;
        }

        if (username.length > 30) {
            dispatch({ type: 'UPDATE_PROFILE_ERROR', err: { message: 'Your username must be 30 characters or less' } });
            return;
        }

        if (username.includes(' ')) {
            dispatch({ type: 'UPDATE_PROFILE_ERROR', err: { message: 'Your username must not include any spaces' } });
            return;
        }


        // Check if username already exists
        // Create a query against the collection.
        // This returns all the users with the username provided by the input
        const allProfiles = await ref.get();
        for (const profile of allProfiles.docs) {
            if (profile.id !== id && profile.data().userName === username) {
                dispatch({ type: 'UPDATE_PROFILE_ERROR', err: { message: 'There already exists a user with that username.' } });
                return false;
            }
        }

        try {
            await firestore
                .collection('profiles')
                .doc(id)
                .update({
                    userName: username,
                    fName: fName.trim(),
                    lName: lName.trim()
                })
            dispatch({ type: 'UPDATE_PROFILE' });
            return true;
        } catch (err) {
            dispatch({ type: 'UPDATE_PROFILE_ERROR', err });
            return false;
        }
    }
}

// UPDATE: Profile Photo
// Called while editing the Image of the user's profile
// Connects to the Fire Storage to upload the photo
// Gets a reference URL and submits that for the User's Profile imageURL
export const updateImage = (data) => {
    console.log('Update Image Action');
    const { image, id } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            // Connect to the storage and upload image
            const storage = firebase.storage();
            const storageRef = storage.ref();
            const fileRef = storageRef.child('images/profiles/' + id);
            // Set the default ImageURL for profile
            let fileURL = 'https://firebasestorage.googleapis.com/v0/b/culture-bardega.appspot.com/o/images%2Fprofiles%2Fdefault.png?alt=media&token=499f5767-a5fc-494e-8bcf-6cf6fefeed75';
            if (image !== null) {
                const imageObject = await convertImage(image);
                await fileRef.put(imageObject)
                fileURL = await fileRef.getDownloadURL();
            }

            // Add drink to the drinks collection
            await firestore.collection('profiles').doc(id).update({
                imageURL: fileURL
            })

            dispatch({ type: 'UPDATE_PROFILE_IMAGE' })
        } catch (err) {
            dispatch({ type: 'UPDATE_PROFILE_IMAGE_ERROR', err });
        }
    }
};

// DELETE: Profile Photo
// Removes the user's profile picture from the Firebase Storage
// Resets their imageURL to the default imageURL
export const deleteProfileImage = (data) => {
    console.log('Delete Image Action');
    const { id } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            // Connect to the storage and upload image
            const storage = firebase.storage();
            const storageRef = storage.ref();
            const fileRef = storageRef.child('images/profiles/' + id);

            await fileRef.getDownloadURL().then((resp) => {
                fileRef.delete();
            }).catch((err) => {
                console.log('image does not exist')
            })

            // Set the default ImageURL for profile
            const fileURL = 'https://firebasestorage.googleapis.com/v0/b/culture-bardega.appspot.com/o/images%2Fprofiles%2Fdefault.png?alt=media&token=499f5767-a5fc-494e-8bcf-6cf6fefeed75';
            await firestore.collection('profiles').doc(id).update({
                imageURL: fileURL
            })

            dispatch({ type: 'UPDATE_PROFILE_IMAGE' })
        } catch (err) {
            dispatch({ type: 'UPDATE_PROFILE_IMAGE_ERROR', err });
        }
    }
};

// UPDATE: Profile Privacy Preferences
export const updatePrivacy = (data) => {
    console.log('Update Profile Privacy Action');
    const { id, privacy } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            await firestore
                .collection('profiles')
                .doc(id)
                .update({
                    private: privacy,
                })
            dispatch({ type: 'UPDATE_PROFILE' });
            return true;
        } catch (err) {
            console.log(err);
            dispatch({ type: 'UPDATE_PROFILE_ERROR', err: { message: "There was an error updating your privacy" } });
            return false;
        }
    }
}

// UPDATE: Profile Privacy Preferences
export const updateLikedDrinkPrivacy = (data) => {
    console.log('Update Profile Privacy Action');
    const { id, privacy } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            await firestore
                .collection('profiles')
                .doc(id)
                .update({
                    likedDrinksPrivate: privacy,
                })
            dispatch({ type: 'UPDATE_PROFILE' });
            return true;
        } catch (err) {
            console.log(err);
            dispatch({ type: 'UPDATE_PROFILE_ERROR', err: { message: "There was an error updating your privacy" } });
            return false;
        }
    }
}

// UPDATE: Profile Notifications Preferences
export const updateNotifications = (data) => {
    console.log('Update Notifications Privacy Action');
    const { id, notifications } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            await firestore
                .collection('profiles')
                .doc(id)
                .update({
                    receiveNotifications: notifications,
                })
            dispatch({ type: 'UPDATE_PROFILE' });
            return true;
        } catch (err) {
            console.log(err);
            dispatch({ type: 'UPDATE_PROFILE_ERROR', err: { message: "There was an error updating your privacy" } });
            return false;
        }
    }
}

// UPDATE: Profile lastCheckedNotifs field
// Called everytime the user opens up their notifications page and sets
// this field to that specific timestamp
export const updateNotificationChecked = (data) => {
    console.log('Update Notifications Checked Action');
    const { id } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        const date = new Date();
        date.setTime(date.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
        try {
            await firestore
                .collection('profiles')
                .doc(id)
                .update({
                    lastCheckedNotifs: date.toISOString(),
                })
            dispatch({ type: 'UPDATE_PROFILE' });
            return true;
        } catch (err) {
            console.log(err);
            dispatch({ type: 'UPDATE_PROFILE_ERROR', err: { message: "There was an error updating your privacy" } });
            return false;
        }
    }
}

// UPDATE: Profile isMember field
// Called everytime the application opens up and their is a discrepency between the user's
// isMember field and their actual membership with Bardega. If the two are different, then this function is called.
// This is called within the MainNavigator.js
export const updateIsMember = (data) => {
    console.log('Update Is Member Action');
    const { id, memberRole } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            await firestore
                .collection('profiles')
                .doc(id)
                .update({
                    isMember: memberRole,
                })
            dispatch({ type: 'UPDATE_PROFILE' });
            return true;
        } catch (err) {
            console.log(err);
            dispatch({ type: 'UPDATE_PROFILE_ERROR', err: { message: "There was an error updating your privacy" } });
            return false;
        }
    }
}

// DELETE: 
// Remove ALL of the user's created drinks
// Remove the user's account from ALL of the drinks that he/she liked
// Remove the user's account from All of the user's that he/she followed
// Remove the user's account from All of the user's that follow him/her
// Remove the user's profile image (if they had one)
// Remove the user's notifications collection
// Delete the profile from profiles collection
// Remove the user's account from the Firebase Auth
export const deleteAccount = (user) => {
    console.log('Delete Profile and Account Action');
    const { id, drinks, likedDrinks, profileFollowID, notificationsID } = user;

    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();
        try {
            // Connect to the storage and delete profile image
            const storage = firebase.storage();
            const storageRef = storage.ref();
            const fileRef = storageRef.child('images/profiles/' + id);
            await fileRef.getDownloadURL().then((resp) => {
                fileRef.delete()
            }).catch((err) => {
                console.log('image does not exist')
            });

            // Delete all user's created drinks
            for (let i = 0; i < drinks.length; i++) {
                firestore
                    .collection('drinks')
                    .doc(drinks[i].id)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            dispatch(deleteDrink(doc.data()));
                        }
                    })
            }

            // Remove user from all the drinks they liked
            for (let j = 0; j < likedDrinks.length; j++) {
                firestore
                    .collection('drinks')
                    .doc(likedDrinks[j].id)
                    .get()
                    .then((doc) => {
                        if (doc.exists) {
                            dispatch(unLikeDrink({ drink: doc.data(), userID: id }))
                        }
                    })
            }

            // Remove user from all the profiles they followed
            firestore
                .collection('profileFollowing')
                .doc(profileFollowID)
                .collection('followingUsers')
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        let userBID = doc.data()[1];
                        if (userBID) {
                            firestore.collection('profiles').doc(userBID).get().then((doc) => {
                                let userB = doc.data();
                                dispatch(unfollowUser({ userA: user, userB: userB }));
                            })
                        }
                    });
                });
            // Delete the profileFollowing collection
            await firestore
                .collection('profileFollowing')
                .doc(profileFollowID)
                .delete();

            // Remove user from all the profiles that follow them
            firestore
                .collection('profileFollowers')
                .doc(profileFollowID)
                .collection('followerUsers')
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        let userBID = doc.data()[1];
                        if (userBID) {
                            firestore.collection('profiles').doc(userBID).get().then((doc) => {
                                let userB = doc.data();
                                dispatch(unfollowUser({ userA: userB, userB: user }));
                            })
                        }
                    });
                });
            // Delete the profileFollowing collection
            await firestore
                .collection('profileFollowers')
                .doc(profileFollowID)
                .delete();

            // Delete notifications collection
            if (notificationsID) {
                await firestore
                    .collection('notifications')
                    .doc(notificationsID)
                    .delete();
            }

            // Delete the profile from profiles collection
            await firestore
                .collection('profiles')
                .doc(id)
                .delete();

            // Delete user from firebase auth
            var user = firebase.auth().currentUser;
            user.delete().then(function () {
                console.log('User deleted from firebase auth')
            }).catch(function (error) {
                console.log('error: Could not delete user');
                console.log(error)
            });

            dispatch({ type: 'DELETE_PROFILE' });
            return true;
        } catch (err) {
            console.log(err);
            dispatch({ type: 'DELETE_PROFILE_ERROR', err: { message: "There was an error deleting your account" } });
            return false;
        }
    }
}

// UPDATE: Follow Profile Object
// Updates the authed user's numFollowing field by +1 and adds the other user into the followingUsers
// within the profileFollowing collection
// Updates the other user's numFollowers field by +1 and adds the authed user into the followerUsers
// within the profileFollowers collection
export const followUser = (data) => {
    console.log('Follow User Action');
    const { userA, userB } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            // Add user A to userB's profileFollowers collection
            await firestore
                .collection('profileFollowers')
                .doc(userB.profileFollowID)
                .collection('followerUsers')
                .doc(userA.id)
                .set({ 1: userA.id })

            // Update userB's numFollowers field by 1
            await firestore
                .collection('profiles')
                .doc(userB.id)
                .update({ numFollowers: firebase.firestore.FieldValue.increment(1) })

            // Add user B to userA's profileFollowing collection
            await firestore
                .collection('profileFollowing')
                .doc(userA.profileFollowID)
                .collection('followingUsers')
                .doc(userB.id)
                .set({ 1: userB.id })

            // Update userA's numFollowing field by 1
            await firestore
                .collection('profiles')
                .doc(userA.id)
                .update({ numFollowing: firebase.firestore.FieldValue.increment(1) })

            dispatch({ type: 'FOLLOW_USER' })
        } catch (err) {
            dispatch({ type: 'FOLLOW_USER_ERROR', err });
        }
    }
};

// UPDATE: Follow Profile Object
// Updates the UserA's numFollowing field by -1 and deletes UserB from the followingUsers
// within the profileFollowing collection
// Updates UserB's numFollowers field by -1 and deletes UserA from the followerUsers
// within the profileFollowers collection
export const unfollowUser = (data) => {
    console.log('Unfollow User Action');
    const { userA, userB } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            // Remove userA from userB's profileFollowers collection
            await firestore
                .collection('profileFollowers')
                .doc(userB.profileFollowID)
                .collection('followerUsers')
                .doc(userA.id)
                .delete()

            // Update userB's numFollowers field by -1
            await firestore
                .collection('profiles')
                .doc(userB.id)
                .update({ numFollowers: firebase.firestore.FieldValue.increment(-1) })

            // Remove userB from userA's profileFollowing collection
            await firestore
                .collection('profileFollowing')
                .doc(userA.profileFollowID)
                .collection('followingUsers')
                .doc(userB.id)
                .delete()

            // Update userA's numFollowing field by -1
            await firestore
                .collection('profiles')
                .doc(userA.id)
                .update({ numFollowing: firebase.firestore.FieldValue.increment(-1) })

            dispatch({ type: 'FOLLOW_USER' })
        } catch (err) {
            dispatch({ type: 'FOLLOW_USER_ERROR', err });
        }
    }
};

// Handler that prepares the drink image to be sent to firestorage
const convertImage = async (image) => {
    if (image === null) {
        return null;
    }
    const response = await fetch(image);
    const blob = await response.blob();
    return blob;
}


// UPDATE: Follow Profile Object
// Adds userA into userB's profileRequests collection when userB is a privated account
export const requestFollow = (data) => {
    console.log('Request Follow User Action');
    const { userA, userB } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            // Add user A to userB's profileRequests collection
            await firestore
                .collection('profileRequests')
                .doc(userB.profileFollowID)
                .collection('allRequests')
                .doc(userA.id)
                .set({ 1: userA.id })

            dispatch({ type: 'FOLLOW_USER' })
        } catch (err) {
            dispatch({ type: 'FOLLOW_USER_ERROR', err });
        }
    }
};

// UPDATE: Unrequest Follow Profile Object
// Removes userA from userB's profileRequests collection
export const unrequestFollow = (data) => {
    console.log('Request Follow User Action');
    const { userA, userB } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            // Removes user A from userB's profileRequests collection
            await firestore
                .collection('profileRequests')
                .doc(userB.profileFollowID)
                .collection('allRequests')
                .doc(userA.id)
                .delete()

            dispatch({ type: 'FOLLOW_USER' })
        } catch (err) {
            dispatch({ type: 'FOLLOW_USER_ERROR', err });
        }
    }
};

// UPDATE: Follow Profile Object
// Called when userA declines the request sent to them from userB
// Removes userB from userA's followRequests collection
export const rejectRequest = (data) => {
    console.log('Reject Request User Action');
    const { userA, userB } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            // Remove user B from userA's profileRequests collection
            await firestore
                .collection('profileRequests')
                .doc(userA.profileFollowID)
                .collection('allRequests')
                .doc(userB.id)
                .delete();

            dispatch({ type: 'FOLLOW_USER' })
        } catch (err) {
            dispatch({ type: 'FOLLOW_USER_ERROR', err });
        }
    }
};