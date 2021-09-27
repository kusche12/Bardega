const initState = {
    profileError: null,
    profileSuccess: null
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: action.err.message,
                authSuccess: null
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authError: null,
                authSuccess: null
            }
        case 'LOGOUT_SUCCESS':
            console.log('Logout Success');
            return state
        case 'SIGNUP_SUCCESS':
            console.log('Signup Success');
            return {
                ...state,
                authError: null,
                authSuccess: null
            }
        case 'SIGNUP_ERROR':
            console.log(action.err.message);
            return {
                ...state,
                authError: action.err.message,
                authSuccess: null
            }
        case 'FORGOT_SUCCESS':
            console.log('forgot password success');
            return {
                ...state,
                authError: null,
                authSuccess: 'Check your email for a link to reset your password.'
            }
        case 'FORGOT_ERROR':
            console.log('forgot password failure');
            return {
                ...state,
                authError: action.err.message,
                authSuccess: null
            }
        case 'CHANGE_EMAIL_SUCCESS':
            console.log('change email success');
            return {
                ...state,
                authError: null,
                authSuccess: null
            }
        case 'CHANGE_EMAIL_ERROR':
            console.log('change email failure');
            return {
                ...state,
                authError: action.err.message,
                authSuccess: null
            }
        default:
            return state;
    }
}

export default authReducer;