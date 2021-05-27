// CREATE: Comment Object
export const createComment = (comment) => {
    console.log('Create Comment Action');
    console.log(comment);
    const { authorID, text, commentID, taggedUsers } = comment;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        // Comment Likes ID
        const commentRef = await firestore.collection('commentLikes').doc();
        const commentLikesID = commentRef.id;
        console.log('commentLikesID: ' + commentLikesID);

        // Add comment likes section to the comments likes collection
        await firestore
            .collection('commentLikes')
            .doc(commentLikesID)
            .set({
                1: 'default'
            })

        // Must load in 1 default object to initialize the likedByUsers subcollection
        await firestore
            .collection('commentLikes')
            .doc(commentLikesID)
            .collection('likedByUsers')
            .doc('default')
            .set({
                1: 'default'
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
                id: id,
                numLikes: 0,
                taggedUsers: taggedUsers
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
                .update({ numLikes: firebase.firestore.FieldValue.increment(1) })

            dispatch({ type: 'LIKE_COMMENT' })
        } catch (err) {
            dispatch({ type: 'LIKE_COMMENT_ERROR', err });
        }
    }
};

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
                .update({ numLikes: firebase.firestore.FieldValue.increment(-1) })

            dispatch({ type: 'LIKE_COMMENT' })
        } catch (err) {
            dispatch({ type: 'LIKE_COMMENT_ERROR', err });
        }
    }
};

// DELETE: Comment Object
// Remove the commentLikes collection using the commentLikesID
// Remove the individual comment from the allComments collection using its id
export const deleteComment = (data) => {
    console.log('Delete Comment Action');
    console.log(data);
    const { commentID, comment } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            // Remove the commentLikes collectionåß
            await firestore
                .collection('commentLikes')
                .doc(comment.commentLikesID)
                .delete();

            // Remove the comment from the allComments collection
            await firestore
                .collection('comments')
                .doc(commentID)
                .collection('allComments')
                .doc(comment.id)
                .delete();

            dispatch({ type: 'DELETE_COMMENT' })
        } catch (err) {
            dispatch({ type: 'DELETE_COMMENT_ERROR', err });
        }
    }
};