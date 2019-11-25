import axios from "axios";

const setAuthHeader = (token) => {
    axios.defaults.headers.common['x-auth-token'] = token
}
 
export default setAuthHeader;