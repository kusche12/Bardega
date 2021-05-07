import * as Facebook from 'expo-facebook';
// import FirebaseAuth from 'firebaseauth';
// import firebaseConfig from '../../API/fbConfig';
// const firebaseSocial = new FirebaseAuth(firebaseConfig.apiKey);

export const logIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
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

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();

        // Check if username already exists
        const username = newUser.userName.trim();
        var ref = firestore.collection("profiles");

        // Create a query against the collection.
        // This returns all the users with the username provided by the input
        let isUnique = true;
        ref.where("userName", "==", username)
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    isUnique = false;
                })
            }).then(() => {
                if (isUnique === false) {
                    dispatch({ type: 'SIGNUP_ERROR', err: { message: 'That username already exists Your username must be unique.' } });
                } else {
                    firebase.auth().createUserWithEmailAndPassword(
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
                            followers: [],
                            following: [],
                            likedDrinks: [],
                            id: resp.user.uid,
                            imageURL: 'https://firebasestorage.googleapis.com/v0/b/culture-bardega.appspot.com/o/images%2Fprofiles%2Fdefault.png?alt=media&token=41fda793-637d-4e89-aacf-194a14433948',
                            receiveNotifications: true,
                            private: false
                        })
                    })
                        .then(() => {
                            dispatch({ type: 'SIGNUP_SUCCESS' })
                        }).catch(err => {
                            dispatch({ type: 'SIGNUP_ERROR', err })
                        })

                }
            })
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


export const loginFacebook = () => {
    return async (dispatch, getState, { getFirebase }) => {
        console.log('init facebook login');
        // Initialize facebook login SDK
        await Facebook.initializeAsync({
            appId: '1643873412449618',
            appName: 'Bardega'
        });

        const firebase = await getFirebase();

        const { type, token } = await
            Facebook.logInWithReadPermissionsAsync({
                permission: "public_profile"
            });

        if (type == "success") {
            const credential =
                firebase
                    .auth
                    .FacebookAuthProvider
                    .credential(token)

            firebase
                .auth()
                .signInWithCredential(credential)
                .then(() => {
                    console.log('success')
                    dispatch({ type: 'FACEBOOK_SUCCESS' })
                })
                .catch(error => {
                    console.log(error);
                    dispatch({ type: 'FACEBOOK_ERROR', err: { message: 'There was an error authenticating with Facebook.' } })
                });
        }

    }
}

export const loginGoogle = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithRedirect(provider)
            .then((result) => {
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;

                console.log(user);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                console.log(errorMessage);
            });

        // firebase.auth().signInWithRedirect(provider)
        //     .then(() => {
        //         console.log('success')
        //         dispatch({ type: 'FACEBOOK_SUCCESS' })
        //     }).catch((err) => {
        //         console.log(err);
        //         dispatch({ type: 'FACEBOOK_ERROR', err: { message: 'There was an error authenticating with Google.' } })
        //     });
    }
}
