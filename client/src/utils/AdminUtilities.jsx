// 'use server';
import {axiosPrivate, axiosPublic} from "@/utils/AxiosInstance";

const idSecret = process.env.ID_SECRET;
const dataSecret = process.env.DATA_SECRET;

class AdminUtils {
    static async encryptUserID(userID) {
        // Hash the idSecret to get a 256-bit key
        // new TextEncoder().encode(idSecret) converts the secrets to an array of bytes
        const keyMaterial = await window.crypto.subtle.digest(
            'SHA-256',
            new TextEncoder().encode(idSecret)
        );
        //  The hashed key is imported for use with AES-GCM encryption using crypto.subtle.importKey.
        //  ['encrypt'] specifies that the key will be used for encryption.
        const key = await window.crypto.subtle.importKey(
            'raw',
            keyMaterial,
            {
                name: 'AES-GCM',
            },
            true,
            ['encrypt']
        );
        // Initialization Vector (IV): ensures the same plaintext encrypts to different ciphertexts each time
        const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
        
        // The user ID is encoded into bytes and encrypted using crypto.subtle.encrypt with the specified IV and key.
        // The encrypted data is combined with the IV to ensure that decryption can be done correctly later.
        const encrypted = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            new TextEncoder().encode(userID)
        );
        
        // Combine the iv and encrypted data
        // The IV and encrypted data are concatenated into a single array and converted to a base64 string using btoa.
        const encryptedDataWithIv = new Uint8Array(iv.length + new Uint8Array(encrypted).length);
        encryptedDataWithIv.set(iv);
        encryptedDataWithIv.set(new Uint8Array(encrypted), iv.length);
        
        // Convert to base64 string and return
        return btoa(String.fromCharCode(...encryptedDataWithIv));
    }
    
    static async decryptUserID(encryptedUserID) {
        // Decode the Base64 String
        // The encrypted base64 string is decoded back into a byte array using atob
        // and then mapped to their character codes to form a Uint8Array.
        const encryptedDataWithIv = new Uint8Array(atob(encryptedUserID).split('').map(char => char.charCodeAt(0)));
        
        // Extract the iv and encrypted data
        const iv = encryptedDataWithIv.slice(0, 12);
        const encryptedData = encryptedDataWithIv.slice(12);
        
        // Hash the idSecret to get a 256-bit key
        const keyMaterial = await window.crypto.subtle.digest(
            'SHA-256',
            new TextEncoder().encode(idSecret)
        );
        
        // The hashed key is imported for use with AES-GCM encryption using crypto.subtle.importKey.
        const key = await window.crypto.subtle.importKey(
            'raw',
            keyMaterial,
            {
                name: 'AES-GCM',
            },
            true,
            ['decrypt']
        );
        
        // Decrypt the encryptedData using the key and iv
        const decrypted = await window.crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            encryptedData
        );
        
        // Convert the decrypted data to a string
        return new TextDecoder().decode(decrypted);
    }
    
    static async encryptData(data) {
        // Hash the secret to get a 256-bit key
        const keyMaterial = await window.crypto.subtle.digest(
            'SHA-256',
            new TextEncoder().encode(dataSecret)
        );
        const key = await window.crypto.subtle.importKey(
            'raw',
            keyMaterial,
            {
                name: 'AES-GCM',
            },
            true,
            ['encrypt']
        );
        const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
        const encrypted = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            new TextEncoder().encode(JSON.stringify(data))
        );
        // Combine the iv and encrypted data
        const encryptedDataWithIv = new Uint8Array(iv.length + new Uint8Array(encrypted).length);
        encryptedDataWithIv.set(iv);
        encryptedDataWithIv.set(new Uint8Array(encrypted), iv.length);
        return btoa(String.fromCharCode(...encryptedDataWithIv)); // Convert to base64 string
    }
    
    static async decryptData(encryptedData) {
        const encryptedDataWithIv = new Uint8Array(atob(encryptedData).split('').map(char => char.charCodeAt(0)));
        // Extract the iv and encrypted data
        const iv = encryptedDataWithIv.slice(0, 12);
        const encryptedBytes = encryptedDataWithIv.slice(12);
        // Hash the secret to get a 256-bit key
        const keyMaterial = await window.crypto.subtle.digest(
            'SHA-256',
            new TextEncoder().encode(dataSecret)
        );
        const key = await window.crypto.subtle.importKey(
            'raw',
            keyMaterial,
            {
                name: 'AES-GCM',
            },
            true,
            ['decrypt']
        );
        const decrypted = await window.crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: iv
            },
            key,
            encryptedBytes
        );
        return JSON.parse(new TextDecoder().decode(decrypted));
    }
    
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
            return await AdminUtils.verifyCredentials(request);
        } catch (error) {
            console.error('Authentication failed:', error);
            throw new Error('Access Denied.');
        }
    }
    
    static async createImage(url) {
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', error => reject(error));
            image.src = url;
        })
    };
    
    static async getCroppedImg(imageSrc, pixelCrop) {
        const image = await AdminUtils.createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        
        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );
        
        return new Promise((resolve, reject) => {
            canvas.toBlob(file => {
                if (!file) {
                    reject(new Error('Canvas is empty'));
                    return;
                }
                file.name = 'cropped.jpg';
                resolve(URL.createObjectURL(file));
            }, 'image/jpeg');
        });
    }
    
    
    static async StaffLogin(obj) {
        // Encode username and password in base64
        const encoded = Buffer.from(obj.email + ':' + obj.password).toString('base64');
        const BasicAuth =
            `Basic ${encoded}`
        ;
        // use axios for http request
        try {
            const response = await axiosPublic(
                {
                    method: "POST",
                    url: '/staff/login',
                    headers: {
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
    
    static async StaffLogout() {
        try {
            const response = await axiosPrivate({
                method: "POST",
                url: '/staff/logout',
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Logout failed:', error);
            throw new Error('Logout Failed');
        }
    }
    
    static async staffDashboard() {
        try {
            const response = await axiosPrivate({
                method: "GET",
                url: '/staff/dashboard',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(error);
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
    
    static async NewStaff(obj) {
        // if obj is null, return an error
        if (!obj) {
            throw new Error('Invalid user data');
        }
        try {
            const response = await axiosPrivate({
                method: "POST",
                url: '/staff/new',
                data: obj,
            });
            return response.data;
        } catch (error) {
            // check if error code is 409
            // extract the error message from the response
            const errData = (error.response.data.error)
            throw new Error(errData);
        }
    }
    
    static async Profile() {
        try {
            const response = await axiosPrivate({
                method: "GET",
                url: '/staff/profile',
            });
            return response.data;
        } catch (error) {
            const errData = (error.response.data.error)
            throw new Error(errData);
        }
    }
    
    static async AllStaff() {
        try {
            const response = await axiosPrivate({
                method: "GET",
                url: '/staff/all',
            });
            return response.data;
        } catch (error) {
            const errData = (error.response.data.error)
            throw new Error(errData);
        }
    }
    
    static async UpdateStaff(obj) {
        try {
            const response = await axiosPrivate({
                method: "PUT",
                url: `/staff/update`,
                data: obj,
            });
            return response.data;
        } catch (error) {
            const errData = (error.response.data.error)
            throw new Error(errData);
        }
    }
    
    static async DeleteStaff(obj) {
        try {
            const response = await axiosPrivate({
                method: "DELETE",
                url: `/staff/delete`,
                data: obj,
            });
            return response.data;
        } catch (error) {
            const errData = (error.response.data.error)
            throw new Error(errData);
        }
    }
    
    
}

export default AdminUtils;