import Axios from "axios";

const loadUserAuth = () => async (dispatch,getState) => {
    let payload = {
        token:"",
        userAuthenticated:null,
        isAuthenticated:false
    };       
    try {
        const {userAuthenticated} = getState();
        if (userAuthenticated && userAuthenticated.isAuthenticated) {
            const res = await Axios.post("https://dev.tuten.cl:443/TutenREST/rest/user/testapis@tuten.cl", {token:userAuthenticated.token});
            if (res.data.success) {
                const {token, userAuthenticated} = res.data;
                payload = {
                    token,
                    userAuthenticated,
                    isAuthenticated: true
                }
            }
        }
        dispatch({
            type: "LOAD_USER_AUTH", 
            payload
        });

    } catch (error) {
        console.log("ERROR_LOAD_USER_AUTH:", error);
        dispatch({
            type: "ERROR_LOAD_USER_AUTH",
            payload
        });
    }
}

export default loadUserAuth;

