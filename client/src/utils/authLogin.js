import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

const UserLogin = async (obj) => {
    // Encode username and password in base64
    const encoded = Buffer.from(obj.email + ':' + obj.password).toString('base64');
    const BasicAuth = `Basic ${encoded}`;
    // use axios for http request
    try {
        const response = await axios(
            {
                method: "POST",
                url: '/users/login',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": BasicAuth
                },
                data: obj,
            });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const userDashboard = async () => {
    const token = Cookies.get('accessToken');
    if (!token) {
        return null;
    }
    try {
        const response = await axios({
            method: "GET",
            url: '/users/dashboard',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export {
    UserLogin,
    userDashboard,
}