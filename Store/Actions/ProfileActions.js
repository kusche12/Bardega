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

        // Check if username already exists
        const username = userName.trim();
        var ref = firestore.collection("profiles");

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

// DELETE: Delete the profile from profiles collection
// Remove ALL of the user's created drinks
// Remove the user's account from ALL of the drinks that he/she liked
// Remove the user's account from All of the user's that he/she followed
// Remove the user's profile image (if they had one)
// Remove the user's account from the Firebase Auth
export const deleteAccount = (data) => {
    console.log('Delete Profile and Account Action');
    const { id } = data;
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



// Handler that prepares the drink image to be sent to firestorage
const convertImage = async (image) => {
    if (image === null) {
        return null;
    }
    const response = await fetch(image);
    const blob = await response.blob();
    return blob;
}

