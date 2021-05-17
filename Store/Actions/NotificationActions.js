// CREATE: Notification Object
export const createNotification = (data) => {
    console.log('Create Comment Action');
    console.log(data);
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        console.log(data);
        dispatch({ type: 'CREATE_NOTIF', id });

        // // Comment Likes ID
        // const commentRef = await firestore.collection('commentLikes').doc();
        // const commentLikesID = commentRef.id;
        // console.log('commentLikesID: ' + commentLikesID);

        // // Add comment likes section to the comments likes collection
        // await firestore
        //     .collection('commentLikes')
        //     .doc(commentLikesID)
        //     .set({
        //         1: 'default'
        //     })

        // // Must load in 1 default object to initialize the likedByUsers subcollection
        // await firestore
        //     .collection('commentLikes')
        //     .doc(commentLikesID)
        //     .collection('likedByUsers')
        //     .doc('default')
        //     .set({
        //         1: 'default'
        //     })

        // const date = new Date();

        // // Current Comment ID
        // const ref = await firestore.collection('comments').doc(commentID).collection('allComments').doc();
        // const id = ref.id;
        // console.log('Current Comment ID: ' + id);

        // try {
        //     // Add comment to the comments collection
        //     await firestore.collection('comments').doc(commentID).collection('allComments').doc(id).set({
        //         authorID: authorID,
        //         text: text,
        //         dateCreated: date.toISOString(),
        //         commentLikesID: commentLikesID,
        //         id: id,
        //         numLikes: 0
        //     })

        //     dispatch({ type: 'CREATE_COMMENT', id })
        // } catch (err) {
        //     dispatch({ type: 'CREATE_COMMENT_ERROR', err });
        // }
    }
};
