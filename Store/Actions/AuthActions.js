//import firebase from '../../API/FirebaseSetup';

export const logIn = (credentials) => {
    console.log("AUTH ACTION LOG IN")
    return (dispatch, getState) => {
        //const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            console.log('success')
            dispatch({ type: 'LOGIN_SUCCESS' })
        }).catch((err) => {
            console.log('error')
            dispatch({ type: 'LOGIN_ERROR, ', err })
        });
    }
}