const initState = {
    notifError: null,
};

const notificationReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_NOTIF':
            console.log('create notification reducer');
            return { ...state, notifError: null };
        case 'CREATE_NOTIF_ERROR':
            console.log('create notification error reducer: ', action.err.message);
            return { ...state, notifError: action.err.message };
        case 'DELETE_NOTIF':
            console.log('delete notification reducer');
            return { ...state, notifError: null };
        case 'DELETE_NOTIF_ERROR':
            console.log('delete notification error reducer: ', action.err.message);
            return { ...state, notifError: action.err.message };
        default:
            return state;
    }
}

export default notificationReducer;