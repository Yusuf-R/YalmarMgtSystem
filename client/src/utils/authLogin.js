import axios from "axios";
axios.defaults.baseURL=process.env.NEXT_PUBLIC_BACKEND_URL

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

export default UserLogin;