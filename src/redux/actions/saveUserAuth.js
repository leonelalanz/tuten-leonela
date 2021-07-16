const saveUserAuth = (token,userAuthenticated) => {
    return{
        type: "SET_USER_AUTH",
        payload: {
            token,
            userAuthenticated,
            isAuthenticated:true,
        }
    }
}

export default saveUserAuth;