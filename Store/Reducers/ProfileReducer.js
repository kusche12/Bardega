const initState = {
    profileError: null,
    profileSuccess: null
};

const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_BIO':
            console.log('Update Bio Reducer')
            return {
                ...state,
                profileError: null,
                profileSuccess: 'successfully updated bio'
            };
        case 'UPDATE_BIO_ERROR':
            console.log('Update Bio Error Reducer')
            return {
                ...state,
                profileError: action.err.message,
                profileSuccess: null
            }
        default:
            return state;
    }
}

export default profileReducer;