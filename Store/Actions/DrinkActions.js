export const createDrink = (drink) => {
    console.log('createDrink')
    const { authorID, description, instructions, name, prepTime, recipe, tags } = drink;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        // Drink ID
        const ref = await firestore.collection('drinks').doc();
        const id = ref.id;
        console.log('drinkID: ' + id);
        console.log('-----------------------')

        // Comment ID
        const commentRef = await firestore.collection('comments').doc();
        const commentID = commentRef.id;
        console.log('commentID: ' + commentID);

        const date = new Date();

        // Connect to the storage and upload drink image
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const fileRef = storageRef.child('images/drinks/' + drink.authorID + '_' + id);
        await fileRef.put(drink.image)
        const fileURL = await fileRef.getDownloadURL();

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
    }
};