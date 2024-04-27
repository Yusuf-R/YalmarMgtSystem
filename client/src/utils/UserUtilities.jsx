'use server';
import {verifyCredentials} from "@/utils/authLogin";
import Cookies from "js-cookie";

class UserUtils {
    static userLogout() {
        // clear the content of the cookie storage
        Cookies.remove('accessToken');
        Cookies.remove('userData');
        Cookies.remove('rememberMe');
        return null;
    }
    
    static async authGuard(request) {
        try {
            return await verifyCredentials(request);
        } catch (error) {
            console.error('Authentication failed:', error);
            throw new Error('Access Denied.');
        }
    }
}

export default UserUtils;