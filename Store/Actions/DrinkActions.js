// TODO: Once users are authenticated, get their information and upload it along with the rest of the drink data
// TODO: Put this action into the create drink component / page
export const createDrink = (drink) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('drinks').add({
            ...drink,
            authorFirstName: 'Kyle',
            authorLastName: 'Kusche',
            authorID: 12345,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_DRINK', drink })
        }).catch((err) => {
            dispatch({ type: 'CREATE_DRINK_ERROR', err });
        })
    }
};