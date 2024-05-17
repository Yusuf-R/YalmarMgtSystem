// 'use server';
import {axiosPrivate} from "@/utils/AxiosInstance";
import axios from "axios";

class UserUtils {
    static async verifyCredentials(request) {
        try {
            // we will use fetch in this scenario since it supports edge runtime
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${request.cookies.get('accessToken')?.value}`,
                    },
                });
            if (response.status === 400) {
                return new Error('Access Denied');
            }
            if (response.status === 200) {
                return await response.json();
            }
            console.log('I came back with a null');
            return null;
        } catch (error) {
            console.log(error.message)
            throw new Error('Access Denied');
        }
    }
    
    static async authGuard(request) {
        try {
            return await UserUtils.verifyCredentials(request);
        } catch (error) {
            console.error('Authentication failed:', error);
            throw new Error('Access Denied.');
        }
    }
    
    static async UserLogin(obj) {
        // Encode username and password in base64
        const encoded = Buffer.from(obj.email + ':' + obj.password).toString('base64');
        const BasicAuth =
            `Basic ${encoded}`
        ;
        // use axios for http request
        try {
            const response = await axios(
                {
                    method: "POST",
                    url: '/user/login',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": BasicAuth
                    },
                    data: obj,
                    withCredentials: true // Include cookies in the request
                });
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error(error.response.data.message);
        }
    }
    
    static async UserLogout() {
        try {
            const response = await axiosPrivate({
                method: "POST",
                url: '/user/logout',
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Logout failed:', error);
            throw new Error('Logout Failed');
        }
    }
    
    static async userDashboard() {
        try {
            const response = await axiosPrivate({
                method: "GET",
                url: '/user/dashboard',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            throw new Error({
                error: error.response.data.message,
                status: error.response.status,
                headers: error.response.headers
            });
        }
    }
    
    static async privateCheck(request) {
        try {
            const response = await axiosPrivate({
                method: "GET",
                url: '/auth/health',
            })
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error('Access Denied');
        }
    }
    
    static async NewUser(obj) {
        // if obj is null, return an error
        if (!obj) {
            throw new Error('Invalid user data');
        }
        try {
            const response = await axiosPrivate({
                method: "POST",
                url: '/user/signup',
                data: obj,
            });
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error(error.response.data.message);
        }
    }
}

export default UserUtils;
