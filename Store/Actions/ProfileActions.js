// UPDATE: Profile Bio
// Called while editing the Biography of the user's profile
export const updateBio = (data) => {
    console.log('Update Bio Action');
    const { bio, id } = data;
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = await getFirebase();
        const firestore = await firebase.firestore();

        try {
            if (bio.length > 150) {
                dispatch({ type: 'UPDATE_BIO_ERROR', err: { message: 'Bio must be shorter than 150 characters.' } });
                return;
            }
            // Update bio in the user's profile
            await firestore.collection('profiles').doc(id).update({ bio: bio })

            dispatch({ type: 'UPDATE_BIO', id })
        } catch (err) {
            dispatch({ type: 'UPDATE_BIO_ERROR', err });
        }
    }
};