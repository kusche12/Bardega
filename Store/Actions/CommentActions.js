// CREATE: Comment Object
// TODO: Add a commentLikesID field that links to an object of all the users that liked this comment
export const createComment = (comment) => {
    console.log('Create Comment Action');
    console.log(comment);
    const { authorID, text, commentID } = comment;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        const date = new Date();

        // Current Comment ID
        const ref = await firestore.collection('comments').doc(commentID).collection('allComments').doc();
        const id = ref.id;
        console.log('Current Comment ID: ' + id);

        try {
            // Add comment to the comments collection
            await firestore.collection('comments').doc(commentID).collection('allComments').doc(id).set({
                authorID: authorID,
                text: text,
                dateCreated: date.toISOString(),
                numLikes: 0,
                id: id
            })

            dispatch({ type: 'CREATE_COMMENT', id })
        } catch (err) {
            dispatch({ type: 'CREATE_COMMENT_ERROR', err });
        }
    }
};