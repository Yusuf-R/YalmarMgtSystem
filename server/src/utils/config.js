require('dotenv').config({path: '../../../server/.env'});
const crypto = require('crypto');
const {log} = console;

class SecurityConfig {
    constructor() {
        this.secretKey = process.env.CIPHER_SECRET;
    }
    
    // generating any random secret key
    generateSecret() {
        return crypto.randomBytes(256).toString('hex');
    }
    
    // generating cipher secret
    generateCipherSecret() {
        return crypto.randomBytes(32).toString('hex');
    }
    
    base64Encode(str) {
        return Buffer.from(str).toString('base64');
    }
    
    encodeB64(email, pwd) {
        const obj = `${email}:${pwd}`;
        return this.base64Encode(obj);
    }
    
    decodeB64(data64) {
        const dataDecode = Buffer.from(data64, 'base64').toString().split(':');
        if (dataDecode.length !== 2) {
            return {error: 'Inconsistent Encryption Algorithm, ensure Base64 encryption'};
        }
        const email = dataDecode[0];
        const password = dataDecode[1];
        return {email, password};
    }
    
    encryptData(data) {
        const keyBuffer = Buffer.from(this.secretKey, 'hex');
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag();
        return iv.toString('hex') + authTag.toString('hex') + encrypted;
    }
    
    decryptData(encryptedData) {
        const keyBuffer = Buffer.from(this.secretKey, 'hex');
        const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
        const authTag = Buffer.from(encryptedData.slice(32, 64), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, iv);
        decipher.setAuthTag(authTag);
        try {
            let decryptedData = decipher.update(encryptedData.slice(64), 'hex', 'utf8');
            decryptedData += decipher.final('utf8');
            return decryptedData;
        } catch (error) {
            console.error('Error during decryption:', error.message);
            return null;
        }
    }
    
    get corsOptions() {
        return {
            origin: 'http://localhost:3000',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'X-Auth-Token',
                'Authorization',
                'X-Token',
            ],
            preflightContinue: false, // Ensure preflight requests are handled correctly
            optionsSuccessStatus: 204, // Response status code for successful OPTIONS requests
        };
    }
}



export default SecurityConfig;

