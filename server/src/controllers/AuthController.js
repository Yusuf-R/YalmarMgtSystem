import SecurityConfig from "../utils/config";

const JWT = require('jsonwebtoken');
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');
const RefreshToken = require('../models/RefreshToken');
const User = require('../models/User');
const securityConfig = new SecurityConfig();


// const EXP = 60 * 60 * 24; // 24hrs
const EXP = 30; // 15s

const jwtAccessSecret = process.env.JWT_ACCESS_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
const jwtAccessExp = process.env.JWT_ACCESS_EXPIRES_IN;
const jwtRefreshExp = process.env.JWT_REFRESH_EXPIRES_IN;

class AuthController {
    static async isHealth(req, res) {
        const dbStatus = await dbClient.isAlive();
        const redisStatus = await redisClient.isAlive();
        if (!dbStatus) {
            return res.status(500).json({error: 'Database connection failed'});
        }
        if (!redisStatus) {
            return res.status(500).json({error: 'Redis connection failed'});
        }
        try {
            const encryptedAccessToken = await AuthController.currPreCheck(req);
            const decryptedAccessToken = securityConfig.decryptData(encryptedAccessToken);
            const verifiedAccessToken = await AuthController.verifyAccessToken(decryptedAccessToken);
            const portal = req.originalUrl.split('/')[3];
            return res.status(200).json({
                verifiedAccessToken,
                decryptedAccessToken,
                portal,
                message: 'Server is up and running',
                redisStatus,
                dbStatus,
            });
        } catch (error) {
            throw new Error(error.message);
            
        }
    }
    
    static async currPreCheck(req) {
        try {
            if (!req.headers.authorization) {
                return new Error('Bearer Authorization header is required');
            }
            if (!req.headers.authorization.startsWith('Bearer ')) {
                return new Error('Authorization Header improperly formatted');
            }
            const jwToken = req.headers.authorization.split(' ')[1];
            if (!jwToken) {
                return new Error('Missing JWT token');
            }
            return (jwToken);
        } catch (error) {
            throw new Error(error.message || 'Invalid token')
        }
        
    }
    
    static getAccessTokenFromCookie(cookieHeader) {
        if (!cookieHeader) {
            return null;
        }
        // Check if the cookie header contains multiple cookies separated by ';'
        if (cookieHeader.includes(';')) {
            const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
            for (const cookie of cookies) {
                if (cookie.startsWith('accessToken=')) {
                    return cookie.substring('accessToken='.length);
                }
            }
        } else {
            // If the cookie header is a single cookie, directly extract the accessToken value
            const match = cookieHeader.match(/accessToken=([^;]*)/);
            if (match) {
                return match[1];
            }
        }
        return null;
    }
    
    static async headlessCheck(req) {
        // Check if the cookie header exists
        if (!req.headers.cookie) {
            throw new Error('Missing cookie header');
        }
        // Parse the cookie header to extract the accessToken
        const cookies = req.headers.cookie.split('; ');
        let encryptedAccessToken = null;
        
        cookies.forEach(cookie => {
            const [name, value] = cookie.split('=');
            if (name === 'accessToken') {
                encryptedAccessToken = value;
            }
        });
        // If accessToken is not found, use the entire cookie value as a fallback
        if (!encryptedAccessToken) {
            encryptedAccessToken = req.headers.cookie;
        }
        if (!encryptedAccessToken) {
            throw new Error('Missing or invalid JWT token');
        }
        return encryptedAccessToken;
    }
    
    static async signInPrecheck(req) {
        // check authorization header
        if (!req.headers.authorization) {
            return {error: 'Basic Authorization header is required'};
        }
        // check if Authorization header starts with Basic + space
        if (!req.headers.authorization.startsWith('Basic ')) {
            return {error: 'Authorization Header encryption improperly formatted'};
        }
        // get the token
        const data64 = req.headers.authorization.split(' ')[1];
        if (!data64) {
            return {error: 'Encrypted base64 information not found'};
        }
        return data64;
    }
    
    static async singinDecrypt(data64) {
        // decode the token to get the email and password
        const dataDecode = (Buffer.from(data64, 'base64').toString().split(':'));
        if (dataDecode.length !== 2) {
            return ({error: 'Inconsistent Encryption Algorithm, ensure Base64 encryption'});
        }
        const email = dataDecode[0];
        const password = dataDecode[1];
        return {email, password};
    }
    
    static async generateJWT(obj) {
        const payload = {id: obj.id};
        const accessToken = JWT.sign(payload, jwtAccessSecret, {expiresIn: jwtAccessExp, algorithm: 'HS256'});
        const refreshToken = JWT.sign(payload, jwtRefreshSecret, {expiresIn: jwtRefreshExp, algorithm: 'HS256'});
        const refreshObj = await RefreshToken.findOne({userId: obj.id});
        if (refreshObj) {
            console.log('removing and creating a new object');
            // remove the old refresh token object
            await RefreshToken.deleteMany({userId: obj.id});
            await RefreshToken.create({userId: obj.id, token: refreshToken});
        } else {
            console.log('creating');
            await RefreshToken.create({userId: obj.id, token: refreshToken});
        }
        return {accessToken, refreshToken};
    }
    
    static async refreshJWT(req, res) {
        try {
            const encToken = await AuthController.currPreCheck(req);
            if (encToken.error) {
                return res.status(400).json({error: encToken.error});
            }
            if (!encToken) {
                return res.status(400).json({error: 'Missing token'});
            }
            // decrypt the expToken
            const decToken = securityConfig.decryptData(encToken);
            if (!decToken) {
                return res.status(400).json({error: 'Decryption Failed'});
            }
            // vet the expiry and generate a new AT and RT
            const payload = JWT.verify(decToken, jwtAccessSecret, {algorithm: 'HS256', ignoreExpiration: true});
            if (payload.exp < Date.now()) {
                // ensure this token is not in the blacklist
                const blackListed = await redisClient.isInBlacklist(payload.id, decToken);
                if (blackListed) {
                    return res.status(403).json({error: 'Token is blacklisted'});
                }
                // refresh the access and refresh token
                const refreshJWTcredentials = await AuthController.tokenGenerator(decToken, payload);
                if (refreshJWTcredentials.error) {
                    return res.status(400).json({error: refreshJWTcredentials.error});
                }
                const {accessToken, refreshToken} = refreshJWTcredentials;
                // encrypt the AT
                const encryptedAccessToken = securityConfig.encryptData(accessToken);
                // set the cookie with the new accessToken
                // set the encryptedAccessToken to be stored as a signed cookie
                res.cookie('accessToken', encryptedAccessToken, {
                    // httpOnly: true, // Prevent client-side access via JavaScript
                    secure: true, // Requires HTTPS connection for secure transmission
                    maxAge: 2 * 60 * 60 * 1000, // Set cookie expiration time (2 hours)
                    sameSite: 'strict', // Mitigate cross-site request forgery (CSRF) attacks
                });
                // store the AT in redis
                await AuthController.setJWT(payload, accessToken);
                return res.status(201).json({
                    message: 'Token refreshed successfully', accessToken: encryptedAccessToken, refreshToken,
                });
            }
            res.status(403).json({msg: 'Forbidden Operation'});
        } catch (err) {
            res.status(403).json({msg: 'Forbidden Operation', info: err.message});
        }
    }
    
    
    static async tokenGenerator(decToken, payload) {
        // extract  from the payload
        try {
            // Find the old refresh token
            const refreshTokenObj = await RefreshToken.findOne({userId: payload.id});
            // Check if the old refresh token exists
            if (!refreshTokenObj) {
                return {error: 'Invalid token'};
            }
            // blacklist the old token
            await redisClient.addToBlacklist(payload.id, decToken);
            // Generate new access and refresh token
            const accessToken = JWT.sign({id: payload.id}, jwtAccessSecret, {
                expiresIn: jwtAccessExp,
                algorithm: 'HS256',
            });
            const refreshToken = JWT.sign({id: payload.id}, jwtRefreshSecret, {
                expiresIn: jwtRefreshExp,
                algorithm: 'HS256',
            });
            // remove the old refresh token object
            await RefreshToken.deleteMany({userId: payload.id});
            console.log('Deleting old refresh token');
            // create a new refresh token
            await RefreshToken.create({userId: payload.id, token: refreshToken});
            console.log('Creating a new Token');
            return ({accessToken, refreshToken});
        } catch (err) {
            return {error: err.message || 'Invalid refresh token'};
        }
    }
    
    static async verifyAccessToken(accessToken) {
        try {
            const payload = JWT.verify(accessToken, jwtAccessSecret, {algorithm: 'HS256'});
            if (!payload || !payload.id) {
                return new Error('Invalid access token');
            }
            return (payload);
        } catch (err) {
            throw new Error(err.message);
        }
    }
    
    static async verifyRefreshToken(refreshToken) {
        // Verify the refresh token
        try {
            const payload = JWT.verify(refreshToken, jwtRefreshSecret, {algorithm: 'HS256'});
            if (!payload || !payload.id) {
                return ({error: 'Invalid refresh token'});
            }
            return (payload);
        } catch (err) {
            return ({error: err.message || 'Invalid refresh token'});
        }
    }
    
    // saving the JWT token in redis
    static async setJWT(obj, accessToken) {
        // set the JWT token
        const key = `auth_${obj.id}`;
        try {
            await redisClient.set(key, accessToken, EXP);
        } catch (RedisError) {
            console.error('Redis Error:', RedisError);
            return ({error: RedisError});
        }
    }
    
    static async getJWT(id) {
        const key = `auth_${id}`;
        const redisAccessToken = await redisClient.get(key);
        if (!redisAccessToken || redisAccessToken === 'nill' || redisAccessToken === 'null') {
            return ({error: 'Access token is expired'});
        }
        return redisAccessToken;
    }
    
    static async deleteJWT(id) {
        const key = `auth_${id}`;
        try {
            const result = await redisClient.del(key);
            if (result === 0) {
                return {error: 'Token does not exist'};
            }
            if (!result) {
                return {error: 'Invalid Operation', msg: 'Token does not exist'};
            }
            return result;
        } catch (RedisError) {
            console.error('Redis Error:', RedisError);
            return {error: RedisError};
        }
    }
    
    static async fullCurrCheck(req) {
        const accessToken = await this.currPreCheck(req);
        if (accessToken.error) {
            return {error: accessToken.error};
        }
        const payload = await this.verifyAccessToken(accessToken);
        if (payload.error) {
            return {error: payload.error};
        }
        const {id} = payload;
        if (!id) {
            return {error: 'Invalid token for associated ID'};
        }
        const redisAccessToken = await this.getJWT(payload.id);
        if (redisAccessToken.error) {
            return {error: redisAccessToken.error};
        }
        if (redisAccessToken !== accessToken) {
            return {error: 'Invalid token'};
        }
        return {id, accessToken};
    }
    
    static async fullAdminCheck(req) {
        const accessToken = await this.currPreCheck(req);
        if (accessToken.error) {
            return {error: accessToken.error};
        }
        const payload = await this.verifyAccessToken(accessToken);
        if (payload.error) {
            return {error: payload.error};
        }
        const {id} = payload;
        if (!id) {
            return {error: 'Invalid token for associated ID'};
        }
        const redisAccessToken = await this.getJWT(payload.id);
        if (redisAccessToken.error) {
            return {error: redisAccessToken.error};
        }
        if (redisAccessToken !== accessToken) {
            return {error: 'Invalid token'};
        }
        const user = await User.findById(id);
        if (!user) {
            return {error: 'User does not exist'};
        }
        if (!user.isAdmin) {
            return {error: 'User is not an admin'};
        }
        return {id, accessToken};
    }
    
    static async dashBoardCheck(id) {
        try {
            const user = await User.findById(id);
            if (!user) {
                return new Error(`User with ID ${id} not found.`);
            }
            const userData = {};
            //extract all the keys from the return user object query
            const userObj = user.toObject();
            const exclude = ['_id', 'password', '__v', 'createdAt', 'updatedAt'];
            Object.keys(userObj).forEach((key) => {
                if (!exclude.includes(key)) {
                    userData[key] = user[key];
                }
            });
            return userData;
        } catch (err) {
            return new Error(err.message);
        }
    }
    
    static async apiPrecheck(req) {
        try {
            const encryptedAccessToken = await AuthController.headlessCheck(req);
            // decrypt the token
            const decryptedAccessToken = securityConfig.decryptData(encryptedAccessToken);
            const verifiedAccessToken = await AuthController.verifyAccessToken(decryptedAccessToken);
            return ({
                verifiedAccessToken,
                decryptedAccessToken
            });
        } catch (err) {
            return new Error(err.message || 'Unauthorized');
        }
    }
    
    static async verify(req, res) {
        // extract the token from the authorization header
        try {
            const {verifiedAccessToken, decryptedAccessToken} = await AuthController.apiPrecheck(req);
            return res.status(200).json({
                msg: 'AccessToken verified',
                verifiedAccessToken,
                decryptedAccessToken
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: error.message});
        }
    }
}

module.exports = AuthController;
