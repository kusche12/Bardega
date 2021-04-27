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

// UPDATE: Like Comment Object
// Updates the numLikes field by +1 and adds the user into the likeByUsers
// within the commentLikes collection
export const likeComment = (data) => {
    console.log('Like Comment Action');
    console.log(data);
    const { comment, userID, commentID } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            // Add user to the commentLikes object
            await firestore
                .collection('commentLikes')
                .doc(comment.commentLikesID)
                .collection('likedByUsers')
                .doc(userID)
                .set({ 1: userID })

            // Update comment's numLikes field by 1
            await firestore
                .collection('comments')
                .doc(commentID)
                .collection('allComments')
                .doc(comment.id)
                .update({ numLikes: comment.numLikes + 1 })

            dispatch({ type: 'LIKE_COMMENT' })
        } catch (err) {
            dispatch({ type: 'LIKE_COMMENT_ERROR', err });
        }
    }
};
// TODO: For the create a comment, do not make a commentLikesID. 
// Do this on the first comment like action instead


// UPDATE: Unlike Comment Object
// Updates the numLikes field by -1 and removes the user from the likeByUsers
// within the commentLikes collection
export const unLikeComment = (data) => {
    console.log('Unlike Comment Action');
    console.log(data);
    const { comment, userID, commentID } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            // Remove user from the commentLikes object
            await firestore
                .collection('commentLikes')
                .doc(comment.commentLikesID)
                .collection('likedByUsers')
                .doc(userID)
                .delete()

            // Update comment's numLikes field by -1
            await firestore
                .collection('comments')
                .doc(commentID)
                .collection('allComments')
                .doc(comment.id)
                .update({ numLikes: comment.numLikes - 1 })

            dispatch({ type: 'LIKE_COMMENT' })
        } catch (err) {
            dispatch({ type: 'LIKE_COMMENT_ERROR', err });
        }
    }
};