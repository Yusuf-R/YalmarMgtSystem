import axios from "axios";

// axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

export const axiosPublic = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const axiosPrivate = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosPrivate.interceptors.request.use((config) => {
    const accessToken = document.cookie.match(/accessToken=([^;]*)/)[1];
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosPrivate.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.data.error === "jwt expired" && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            console.log('Access token expired. Refreshing token...')
            // const accessToken = document.cookie.match(/accessToken=([^;]*)/)[1];
            const accessToken = originalRequest.headers.Authorization.split(' ')[1];
            // console.log({accessToken})
            // make an api call to the refresh token endpoint
            const newCall = await axiosPublic({
                method: "POST",
                url: '/auth/refresh',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            // get the new access token from the cookie storage
            const newAccessToken = newCall.data.accessToken;
            // set the new access token in the header
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            // retry the request
            return axiosPrivate(originalRequest);
        } catch (refreshError) {
            // Handle the refresh token failure (e.g., log out the user, redirect to login, etc.)
            console.log('Token refresh failed:', refreshError.message);
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});



