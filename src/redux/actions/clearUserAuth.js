const clearUserAuth = () => {
    return{
        type: "CLEAR_USER_AUTH",
        payload: {
            token: "",
            userAuthenticated: null,
            isAuthenticated: false
        }
    }
}

export default clearUserAuth;