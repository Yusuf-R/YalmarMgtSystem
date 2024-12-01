require('dotenv').config({ path: '../../../server/.env' });
const crypto = require('crypto');

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
            return { error: 'Inconsistent Encryption Algorithm, ensure Base64 encryption' };
        }
        const email = dataDecode[0];
        const password = dataDecode[1];
        return { email, password };
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

    // Function to decrypt data (AES-GCM decryption) for Password and login operations
    static async decryptedPasswordLoginData(encryptedData) {
        const rawKey = process.env.PRIVATE_KEY;
        const privateKeyPem = SecurityConfig.formatPrivateKey(rawKey);

        try {
            const buffer = Buffer.from(encryptedData, 'base64');
            const decrypted = crypto.privateDecrypt({
                    key: privateKeyPem,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha256',
                },
                buffer,
            );

            const jsonString = decrypted.toString('utf8');
            // Parse the JSON string
            return JSON.parse(jsonString);
        } catch (error) {
            console.error('Decryption error:', error);
            throw error;
        }
    }

    static async decryptLoginData(data) {
        const dataSecret = process.env.DATA_SECRET;

        // Hash the secret to get a 256-bit key (using SHA-256)
        const keyMaterial = crypto.createHash('sha256').update(dataSecret).digest();

        // Base64 decode
        const encryptedDataWithIv = Buffer.from(data, 'base64');

        // Extract IV (first 12 bytes), AuthTag (next 16 bytes), and Encrypted Bytes (remaining)
        const iv = encryptedDataWithIv.slice(0, 12);
        const authTag = encryptedDataWithIv.slice(encryptedDataWithIv.length - 16); // Last 16 bytes are the auth tag
        const encryptedBytes = encryptedDataWithIv.slice(12, encryptedDataWithIv.length - 16); // Everything between IV and auth tag

        try {
            // Create decipher using the AES-GCM algorithm
            const decipher = crypto.createDecipheriv('aes-256-gcm', keyMaterial, iv);

            // Set the authentication tag before finalizing decryption
            decipher.setAuthTag(authTag);
            // Decrypt the encrypted data
            let decrypted = decipher.update(encryptedBytes, null, 'utf8');

            decrypted += decipher.final('utf8'); // Finalize decryption

            return JSON.parse(decrypted); // Return the decrypted data as JSON
        } catch (error) {
            console.error('Decryption error:', error.message);
            throw new Error(error.message);
        }
    }

    static formatPrivateKey(rawKey) {
        // Remove any existing header and footer
        const cleanKey = rawKey.replace(/-----BEGIN PRIVATE KEY-----/, '')
            .replace(/-----END PRIVATE KEY-----/, '')
            .replace(/\s/g, '');

        // Split the key into 64-character lines
        const formattedKey = cleanKey.match(/.{1,64}/g).join('\n');

        // Add header and footer
        return `-----BEGIN PRIVATE KEY-----\n${formattedKey}\n-----END PRIVATE KEY-----`;
    }

    static async generatePEMKeyPair() {
        return new Promise((resolve, reject) => {
            crypto.generateKeyPair('rsa', {
                modulusLength: 4096,
                publicKeyEncoding: {
                    type: 'spki',
                    format: 'pem',
                },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem',
                },
            }, (err, publicKey, privateKey) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ publicKey, privateKey });
                }
            });
        });
    }

    get corsOptions() {
        return {
            origin: [
                "https://yalmar-management-system-server.vercel.app",
                "https://yalmar-management-system.vercel.app"
            ],
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
            preflightContinue: false, // Allow Express to handle preflight automatically
            optionsSuccessStatus: 200, // Ensure status 200 with headers for OPTIONS
        };
    }
}

export default SecurityConfig;