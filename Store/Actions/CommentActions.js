// CREATE: Comment Object
export const createComment = (comment) => {
    console.log('Create Comment Action');
    console.log(comment);
    const { authorID, text, commentID } = comment;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        // Comment Likes ID
        const commentRef = await firestore.collection('commentLikes').doc();
        const commentLikesID = commentRef.id;
        console.log('commentLikesID: ' + commentLikesID);

        // Add comment likes section to the comments likes collection
        // Must load in 1 default object to initialize the likedByUsers subcollection
        await firestore.collection('commentLikes').doc(commentLikesID).collection('likedByUsers').doc().set({
            default: 'default'
        })

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
                commentLikesID: commentLikesID,
                id: id
            })

            dispatch({ type: 'CREATE_COMMENT', id })
        } catch (err) {
            dispatch({ type: 'CREATE_COMMENT_ERROR', err });
        }
    }
};