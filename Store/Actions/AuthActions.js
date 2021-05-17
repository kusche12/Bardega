// Check whether the user typed in an email or a username
// If it is a username, then query the database for a matching username and get their
// email. Then, authenticate using their email and password.
export const logIn = (credentials) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        if (validateEmail(credentials.email)) {
            firebase.auth().signInWithEmailAndPassword(
                credentials.email,
                credentials.password
            ).then(() => {
                console.log('success')
                dispatch({ type: 'LOGIN_SUCCESS' })
            }).catch((err) => {
                console.log('error')
                dispatch({ type: 'LOGIN_ERROR', err })
            });
        } else {
            const firestore = firebase.firestore();

            // Get email from their username
            const username = credentials.email.trim();
            const ref = firestore.collection("profiles");
            let userEmail;

            await ref.where("userName", "==", username)
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        userEmail = doc.data().email;
                    })
                }).then(() => {
                    firebase.auth().signInWithEmailAndPassword(
                        userEmail,
                        credentials.password
                    ).then(() => {
                        console.log('success')
                        dispatch({ type: 'LOGIN_SUCCESS' })
                    }).catch((err) => {
                        console.log(err)
                        dispatch({ type: 'LOGIN_ERROR', err });
                    })
                }).catch((err) => {
                    console.log(err)
                    dispatch({ type: 'LOGIN_ERROR', err: { message: 'Could not find account with this username' } });
                });
        }
    }
}

export const logOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'LOGOUT_SUCCESS' })
        })
    }
}

// TODO: Create the notifications collection and ID pair on creation of new user !!
export const signUp = (newUser) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();

        try {
            // Check if username already exists
            const username = newUser.userName.trim();
            var ref = firestore.collection("profiles");

            // Create a query against the collection.
            // This returns all the users with the username provided by the input
            let isUnique = true;
            await ref
                .where("userName", "==", username)
                .get()
                .then((snapshot) => {
                    snapshot.forEach((doc) => {
                        isUnique = false;
                    })
                })

            if (!isUnique) {
                dispatch({ type: 'SIGNUP_ERROR', err: { message: 'That username already exists. Your username must be unique.' } });
                return;
            }

            if (username.length < 1) {
                dispatch({ type: 'SIGNUP_ERROR', err: { message: 'Your username must be at least 1 character long' } });
                return;
            }

            if (username.length > 30) {
                dispatch({ type: 'SIGNUP_ERROR', err: { message: 'Your username must be 30 characters or less' } });
                return;
            }

            // Create collection for the followers and following users of this profile and save ID
            const followersRef = await firestore.collection('profileFollowers').doc();
            const profileFollowID = followersRef.id;
            console.log('profileFollowID: ' + profileFollowID);

            await firestore
                .collection('profileFollowers')
                .doc(profileFollowID)
                .set({ 1: 'default' });
            await firestore
                .collection('profileFollowers')
                .doc(profileFollowID)
                .collection('followerUsers')
                .doc('default')
                .set({ id: 'default' });

            await firestore
                .collection('profileFollowing')
                .doc(profileFollowID)
                .set({ 1: 'default' });
            await firestore
                .collection('profileFollowing')
                .doc(profileFollowID)
                .collection('followingUsers')
                .doc('default')
                .set({ id: 'default' });

            await firebase.auth().createUserWithEmailAndPassword(
                newUser.email,
                newUser.password
            ).then((resp) => {
                // Create a new profile in the firestore using the auto-generated user id
                const nameArray = newUser.name.trim().split(" ");
                const date = new Date();
                return firestore.collection('profiles').doc(resp.user.uid).set({
                    fName: nameArray[0],
                    lName: nameArray[1],
                    userName: newUser.userName.trim(),
                    email: newUser.email.trim(),
                    bio: '',
                    dateCreated: date.toISOString(),
                    drinks: [],
                    likedDrinks: [],
                    id: resp.user.uid,
                    imageURL: 'https://firebasestorage.googleapis.com/v0/b/culture-bardega.appspot.com/o/images%2Fprofiles%2Fdefault.png?alt=media&token=41fda793-637d-4e89-aacf-194a14433948',
                    receiveNotifications: true,
                    private: false,
                    likedDrinksPrivate: false,
                    profileFollowID: profileFollowID,
                    numFollowers: 0,
                    numFollowing: 0
                })
            })
                .then(() => {
                    dispatch({ type: 'SIGNUP_SUCCESS' })
                }).catch(err => {
                    dispatch({ type: 'SIGNUP_ERROR', err })
                })

        } catch (err) {
            dispatch({ type: 'SIGNUP_ERROR', err })
        }
    }
}

export const forgotPassword = (email) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                console.log('success')
                dispatch({ type: 'FORGOT_SUCCESS' })
            }).catch((err) => {
                console.log('error')
                dispatch({ type: 'FORGOT_ERROR', err })
            });
    }
}

// Helper function to check if string is an email
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
