
function reducer(state="",action) {
    switch (action.type) {
        case "SET_USER_AUTH":
            return action.payload;
        case "CLEAR_USER_AUTH":
            return action.payload;
        case "LOAD_USER_AUTH":
            return action.payload;
        case "ERROR_LOAD_USER_AUTH":
            return action.payload;
        default:
            return state;
    }
    
}
export default reducer;