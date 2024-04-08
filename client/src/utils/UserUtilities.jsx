import Cookies from "js-cookie";

class UserUtils {
    static userLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        Cookies.remove('userData');
        Cookies.remove('email');
        Cookies.remove('rememberMe');
        return null;
    }    
    
}

export default UserUtils;