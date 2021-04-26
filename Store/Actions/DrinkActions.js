// CREATE: Drink Object
// Take all of the state from the create drink page and combine it into the new drink object
// Upload the drink image to firebase storage, and save the ImageURL to the drink object
// Upload a new comments section in the comments bucket and save the ID to the drink object
// Save the ID and dateCreated to the user's drink's array
export const createDrink = (drink) => {
    console.log('Create Drink Action')
    const { authorID, description, instructions, name, prepTime, recipe, tags } = drink;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        // Drink ID
        const ref = await firestore.collection('drinks').doc();
        const id = ref.id;
        console.log('drinkID: ' + id);

        // Comment ID
        const commentRef = await firestore.collection('comments').doc();
        const commentID = commentRef.id;
        console.log('commentID: ' + commentID);

        const date = new Date();

        try {
            // Connect to the storage and upload drink image
            const storage = firebase.storage();
            const storageRef = storage.ref();
            const fileRef = storageRef.child('images/drinks/' + drink.authorID + '_' + id);
            // Set the default ImageURL for drink
            let fileURL = 'https://firebasestorage.googleapis.com/v0/b/culture-bardega.appspot.com/o/images%2Fdrinks%2Fdefault.jpeg?alt=media&token=f23f76dc-79cf-416d-9d14-644c7ea34466';
            if (drink.image !== null) {
                await fileRef.put(drink.image)
                fileURL = await fileRef.getDownloadURL();
            }

            // Add comment section to the comments bucket
            await firestore.collection('comments').doc(commentID).set({ comments: [] });

            // Add drink to the drinks bucket
            await firestore.collection('drinks').doc(id).set({
                authorID: authorID,
                description: description,
                instructions: instructions,
                name: name,
                prepTime: prepTime,
                recipe: recipe,
                tags: tags,
                id: id,
                dateCreated: date.toISOString(),
                savedBy: [],
                imageURL: fileURL,
                commentID: commentID
            })

            // Add this drink to the user's saved drinks array
            await firestore.collection('profiles').doc(drink.authorID).update({
                drinks: firebase.firestore.FieldValue.arrayUnion({ id: id })
            })

            dispatch({ type: 'CREATE_DRINK', id })
        } catch (err) {
            dispatch({ type: 'CREATE_DRINK_ERROR', err });
        }
    }
};

// UPDATE: Drink Object
// Take all of the state from the create drink page and combine it into the new drink object
// Upload the drink image to firebase storage, and save the ImageURL to the drink object
export const updateDrink = (drink) => {
    console.log('Update Drink Action')
    const { id, authorID, description, instructions, name, prepTime, recipe, tags } = drink;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            // Connect to the storage and upload drink image
            const storage = firebase.storage();
            const storageRef = storage.ref();
            const fileRef = storageRef.child('images/drinks/' + authorID + '_' + id);
            // Set the default ImageURL for drink
            let fileURL = 'https://firebasestorage.googleapis.com/v0/b/culture-bardega.appspot.com/o/images%2Fdrinks%2Fdefault.jpeg?alt=media&token=f23f76dc-79cf-416d-9d14-644c7ea34466';
            if (drink.image !== null) {
                await fileRef.put(drink.image)
                fileURL = await fileRef.getDownloadURL();
            }

            // Add drink to the drinks bucket
            await firestore.collection('drinks').doc(id).update({
                description: description,
                instructions: instructions,
                name: name,
                prepTime: prepTime,
                recipe: recipe,
                tags: tags,
                imageURL: fileURL,
            })

            dispatch({ type: 'UPDATE_DRINK', id })
        } catch (err) {
            dispatch({ type: 'UPDATE_DRINK_ERROR', err });
        }
    }
};

// CLEAR DRINK STATE
// Remove the drink ID from the reducer state so that the Create Screen
// can start on a clean slate every time it is opened
export const clearDrinkState = (drink) => {
    console.log('Clear Drink Action')
    return async (dispatch, getState, { getFirebase }) => {
        dispatch({ type: 'CLEAR_DRINK_STATE' })
    }
};

// DELETE: Drink Object
// Remove the drink's image from firebase storage
// Remove the comments bucket
// Remove the drink from the user's drink array
export const deleteDrink = (drink) => {
    console.log('Delete Drink Action')
    const { id, authorID, commentID } = drink;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            // Connect to the storage and delete drink image
            const storage = firebase.storage();
            const storageRef = storage.ref();
            const fileRef = storageRef.child('images/drinks/' + authorID + '_' + id);
            await fileRef.getDownloadURL().then((resp) => {
                fileRef.delete()
            }).catch((err) => {
                console.log('image does not exist')
            })

            // Delete drink from the user's drinks array
            await firestore.collection('profiles').doc(authorID).update({
                drinks: firebase.firestore.FieldValue.arrayRemove({ id: id })
            })

            // Delete the comments bucket
            await firestore.collection('comments').doc(commentID).delete();

            // Delete the drink from the drinks bucket
            await firestore.collection('drinks').doc(id).delete();

            dispatch({ type: 'DELETE_DRINK' })
        } catch (err) {
            dispatch({ type: 'DELETE_DRINK_ERROR', err });
        }
    }
}

// TODO: Test this on the favorites screen
// TODO: Test this on the list screen thta appears after clicking on a FavoritesScreen bucket
// DELETE: Drink Object from Drinks Array
// When the user enters the profile screen or favorites screen and the drink no longer 
// exists in the database, this function is called to remove it from their profile
export const removeDrinkFromArray = (data) => {
    console.log('Remove Drink From Array Action')
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            // Delete drink from the drinks array
            await firestore.collection('profiles').doc(data.authorID).update({
                drinks: firebase.firestore.FieldValue.arrayRemove({ id: data.drinkID })
            })

            dispatch({ type: 'DELETE_DRINK' })
        } catch (err) {
            dispatch({ type: 'DELETE_DRINK_ERROR', err });
        }
    }
}