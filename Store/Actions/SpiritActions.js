// CREATE: Spirit Object
// Take all of the state from the create spirit page and combine it into the new spirit object
// Upload the spirit image to firebase storage, and save the ImageURL to the drink object
// Upload a new comments section in the comments collection and save the ID to the drink object
// Create a Spirit Ratings collection and corresponding ID
export const createSpirit = (data) => {
    console.log('Create Spirit Action')
    const { authorID, drinkDesc, image, drinkName, drinkPrice, drinkable, available, spirit } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();
        // Spirit ID
        const ref = await firestore.collection('spirits').doc();
        const id = ref.id;
        console.log('spiritID: ' + id);

        // Comment ID
        const commentRef = await firestore.collection('comments').doc();
        const commentID = commentRef.id;
        console.log('commentID: ' + commentID);

        // Spirit Rating ID
        const rateRef = await firestore.collection('ratings').doc();
        const rateID = rateRef.id;
        console.log('rateID: ' + rateID);

        const date = new Date();
        date.setTime(date.getTime() - new Date().getTimezoneOffset() * 60 * 1000);

        try {
            // Connect to the storage and upload drink image
            const storage = firebase.storage();
            const storageRef = storage.ref();
            const fileRef = storageRef.child('images/spirits/' + authorID + '_' + id);
            // Set the default ImageURL for drink
            let fileURL = 'https://firebasestorage.googleapis.com/v0/b/culture-bardega.appspot.com/o/images%2Fdrinks%2Fdefault.jpeg?alt=media&token=f23f76dc-79cf-416d-9d14-644c7ea34466';
            if (image !== null) {
                await fileRef.put(image)
                fileURL = await fileRef.getDownloadURL();
            }

            // Add comment section to the comments collection
            // Initialize with 1 default comment
            await firestore
                .collection('comments')
                .doc(commentID)
                .set({ 1: 'default' });
            await firestore
                .collection('comments')
                .doc(commentID)
                .collection('allComments')
                .doc('default')
                .set({ id: 'default' });

            // Must load in 1 default object to initialize the ratings subcollection
            await firestore
                .collection('ratings')
                .doc(rateID)
                .set({
                    1: 'default'
                })
            await firestore
                .collection('ratings')
                .doc(rateID)
                .collection('allRatings')
                .doc('default')
                .set({
                    id: 'default'
                })

            // Add drink to the drinks collection
            await firestore.collection('spirits').doc(id).set({
                authorID: authorID,
                availability: available,
                drinkability: drinkable,
                price: drinkPrice,
                description: drinkDesc,
                name: drinkName,
                id: id,
                dateCreated: date.toISOString(),
                imageURL: fileURL,
                commentID: commentID,
                private: false,
                commentsAllowed: true,
                numRatings: 0,
                rateID: rateID,
                rating: 0,
                spirit: spirit
            })

            dispatch({ type: 'CREATE_SPIRIT', id })
        } catch (err) {
            dispatch({ type: 'CREATE_SPIRIT_ERROR', err });
        }
    }
};

// DELETE: Spirit Object
// Remove the spirit's image from firebase storage
// Remove the comments collection
// Remove the ratings collection
export const deleteSpirit = (data) => {
    console.log('Delete Drink Action')
    const { id, authorID, commentID, rateID } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            // Connect to the storage and delete drink image
            const storage = firebase.storage();
            const storageRef = storage.ref();
            const fileRef = storageRef.child('images/spirits/' + authorID + '_' + id);
            await fileRef.getDownloadURL().then((resp) => {
                fileRef.delete()
            }).catch((err) => {
                console.log('image does not exist')
            })

            // Delete the comments collection
            await firestore.collection('comments').doc(commentID).delete();

            // Delete the drink likes collection
            await firestore.collection('ratings').doc(rateID).delete();

            // Delete the drink from the drinks collection
            await firestore.collection('spirits').doc(id).delete();

            dispatch({ type: 'DELETE_SPIRIT' });
        } catch (err) {
            dispatch({ type: 'DELETE_SPIRIT_ERROR', err });
        }
    }
}