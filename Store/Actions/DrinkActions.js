// CREATE: Drink Object
// Take all of the state from the create drink page and combine it into the new drink object
// Upload the drink imaeg to firebase storage, and save the ImageURL to the drink object
// Upload a new comments section in the comments bucket and save the ID to the drink object
// Save the ID and dateCreated to the user's drink's array
export const createDrink = (drink) => {
    console.log('Create Drink Action: ')
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
                drinks: firebase.firestore.FieldValue.arrayUnion({ dateCreated: date.toISOString(), id: id })
            })

            dispatch({ type: 'CREATE_DRINK', id })
        } catch (err) {
            dispatch({ type: 'CREATE_DRINK_ERROR', err });
        }
    }
};