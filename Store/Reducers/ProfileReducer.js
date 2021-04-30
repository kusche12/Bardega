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
            };
        case 'UPDATE_PROFILE':
            console.log('Update Profile Reducer')
            return {
                ...state,
                profileError: null,
                profileSuccess: 'successfully updated profile'
            };
        case 'UPDATE_PROFILE_ERROR':
            console.log('Update Profile Error Reducer')
            console.log(action.err.message);
            return {
                ...state,
                profileError: action.err.message,
                profileSuccess: null
            }
        case 'UPDATE_PROFILE_IMAGE':
            console.log('Update Profile Image Reducer')
            return {
                ...state,
                profileError: null,
                profileSuccess: 'successfully updated profile'
            };
        case 'UPDATE_PROFILE_IMAGE_ERROR':
            console.log('Update Image Error Reducer')
            console.log(action.err.message);
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