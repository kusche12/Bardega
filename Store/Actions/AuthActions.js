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

// TODO: Connect this to a signout button in settings
// https://www.youtube.com/watch?v=inM3epP9cMU&list=PL4cUxeGkcC9iWstfXntcj8f-dFZ4UtlN3&index=24
export const logOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({ type: 'LOGOUT_SUCCESS' })
        })
    }
}