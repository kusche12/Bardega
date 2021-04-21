
// TODO: There is something wrong with the connection between the DrinkAction and the component
// It does not even run the code inside of the return statement of createDrink. I know this bc the console 
//  was not logging. Fix this ASAP.


// TODO: ImageURL and Image upload
// TODO: CommentID and Comment Collection
// SavedBy is an array that will hold all the UserID's that have saved this drink in a collection
export const createDrink = (drink) => {
    console.log('createDrink')
    return (dispatch, getState, { getFirebase }) => {
        // Get the ID of drink before uploading
        console.log('hello')
        const firebase = getFirebase();
        const firestore = firebase.firestore();
        const ref = firestore.collection('drinks').doc();
        const id = ref.id;

        const date = new Date();

        // Connect to the storage and upload drink image
        // const storage = firebase.storage();
        // const storageRef = storage.ref();
        // const fileRef = storageRef.child('images/drinks');
        // fileRef
        //     .put(drink.image)
        //     .then(() => {
        //         console.log("Uploaded file " + drink.image)
        //         dispatch({ type: 'IMAGE_SUCCESS' })
        //     }).catch((err) => {
        //         console.log("Error uploading file " + err)
        //         dispatch({ type: 'IMAGE_ERROR', err })
        //     })
        firestore.collection('drinks').add({
            ...drink,
            id: id,
            dateCreated: date.toISOString(),
            savedBy: [],
            imageURL: 'https://firebasestorage.googleapis.com/v0/b/culture-bardega.appspot.com/o/images%2Fdrinks%2Fdefault.jpeg?alt=media&token=f23f76dc-79cf-416d-9d14-644c7ea34466'
        }).then(() => {
            dispatch({ type: 'CREATE_DRINK', drink })
        }).catch((err) => {
            dispatch({ type: 'CREATE_DRINK_ERROR', err });
        })
    }
};