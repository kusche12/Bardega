const initState = {
    authError: null
};

const authReducer = (state = initState, action) => {
    console.log(action)
    switch (action.type) {
        case 'LOGIN_ERROR':
            console.log('AUTH REDUCER: LOGIN ERROR')
            return {
                ...state,
                authError: 'Login failed'
            };
        case 'LOGIN_SUCCESS':
            console.log('AUTH REDUCER: LOGIN SUCCESS')
            return {
                ...state,
                authError: null
            }
        default:
            return state;
    }
}

export default authReducer;