import SecurityConfig from "../utils/config";

const JWT = require('jsonwebtoken');
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');
const RefreshToken = require('../models/RefreshToken');
const Staff = require('../models/Staff');
const securityConfig = new SecurityConfig();


const EXP = 60 * 60 * 2; // 2hrs
// const EXP = 10; // 10s

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
            const verifiedJWT = await AuthController.currPreCheck(req);
            if (verifiedJWT instanceof Error) {
                return res.status(401).json({error: verifiedJWT.message});
            }
            return res.status(200).json({
                message: 'Server is up and running',
                redisStatus,
                dbStatus,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            return res.status(500).json({error: error.message});
        }
    }

    static async refreshCurrPreCheck(req) {
        console.log('about to authorize returnees');
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

    static async currPreCheck(req) {
        try {
            if (!req.headers.authorization) {
                return new Error('Bearer Authorization header is required');
            }
            if (!req.headers.authorization.startsWith('Bearer ')) {
                return new Error('Authorization Header improperly formatted');
            }
            const encryptedJWT = req.headers.authorization.split(' ')[1];
            if (!encryptedJWT) {
                return new Error('Missing JWT token');
            }
            // decrypt the token
            const decryptedJWT = securityConfig.decryptData(encryptedJWT);
            if (!decryptedJWT) {
                return new Error('Invalid JWT token');
            }
            // verify JWT token
            const verifiedJWT = JWT.verify(decryptedJWT, jwtAccessSecret, {algorithm: 'HS256'});
            if (!verifiedJWT) {
                return new Error('A Invalid JWT token');
            }
            // verify JWT against JWT
            const redisAccessToken = await AuthController.getJWT(verifiedJWT.id);
            if (!redisAccessToken) {
                return new Error('B Invalid JWT token');
            }
            if (redisAccessToken !== decryptedJWT) {
                return new Error('JWT token mismatch');
            }
            // ensure token is not blacklisted
            const blackListed = await redisClient.isInBlacklist(verifiedJWT.id, decryptedJWT);
            if (blackListed) {
                return new Error('Token is blacklisted');
            }
            // ensure it's corresponding refresh token exists
            const refreshTokenObj = await RefreshToken.findOne({staffId: verifiedJWT.id});
            if (!refreshTokenObj) {
                return new Error('Invalid token');
            }
            return verifiedJWT;
        } catch (error) {
            throw new Error(error.message)
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
        try {
            if (!req.headers.authorization) {
                return new Error('Missing authorization header');
            }
            if (!req.headers.authorization.startsWith('Bearer ')) {
                return new Error('Authorization Header improperly formatted');
            }
            // Extract the accessToken from the cookie header
            const encryptedAccessToken = req.headers.authorization.split(' ')[1];
            if (!encryptedAccessToken) {
                return new Error('Missing token');
            }
            // Decrypt the accessToken
            const decryptedAccessToken = securityConfig.decryptData(encryptedAccessToken);
            if (!decryptedAccessToken) {
                return new Error('Invalid JWT token');
            }
            // Verify the accessToken
            const verifiedAccessToken = JWT.verify(decryptedAccessToken, jwtAccessSecret, {
                algorithm: 'HS256',
                ignoreExpiration: true,
            });
            if (verifiedAccessToken.exp < Date.now()) {
                // check if it has been blacklisted
                const blacklisted = await redisClient.isInBlacklist(verifiedAccessToken.id, decryptedAccessToken);
                if (blacklisted) {
                    return new Error('Token is blacklisted');
                }
            }
            return verifiedAccessToken;
        } catch (error) {
            return new Error(error.message);
        }
    }

    static async signInPrecheck(req) {
        try {
            // check authorization header
            if (!req.headers.authorization) {
                return new Error('Basic Authorization header is required');
            }
            // check if Authorization header starts with Basic + space
            if (!req.headers.authorization.startsWith('Basic ')) {
                return new Error('Authorization Header encryption improperly formatted');
            }
            // get the token
            const data64 = req.headers.authorization.split(' ')[1];
            if (!data64) {
                return new Error('Encrypted base64 information not found');
            }
            return data64;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async signInDecrypt(data64) {
        // decode the token to get the email and password
        const dataDecode = (Buffer.from(data64, 'base64').toString().split(':'));
        if (dataDecode.length !== 2) {
            return ({error: 'Inconsistent Encryption Algorithm, ensure Base64 encryption'});
        }
        const email = dataDecode[0];
        const password = dataDecode[1];
        return {email, password};
    }

    static async loginDecrypt(data) {
        try {
            return await SecurityConfig.decryptedLoginData(data);
        } catch (error) {
            throw new Error(error.message);
        }
    }


    static async generateJWT(obj) {
        const payload = {id: obj.id};
        const accessToken = JWT.sign(payload, jwtAccessSecret, {expiresIn: jwtAccessExp, algorithm: 'HS256'});
        const refreshToken = JWT.sign(payload, jwtRefreshSecret, {expiresIn: jwtRefreshExp, algorithm: 'HS256'});
        const refreshObj = await RefreshToken.findOne({staffId: obj._id});
        if (refreshObj) {
            console.log('removing and creating a new object');
            // remove the old refresh token object
            await RefreshToken.deleteMany({staffId: obj._id});
            await RefreshToken.create({staffId: obj._id, token: refreshToken});
        } else {
            console.log('creating');
            await RefreshToken.create({staffId: obj._id, token: refreshToken});
        }
        return {accessToken, refreshToken};
    }

    static async refreshJWT(req, res) {
        try {
            const encToken = await AuthController.refreshCurrPreCheck(req);
            if (encToken instanceof Error) {
                return res.status(400).json({error: encToken.message});
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
                console.log('About to generate new tokens');
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
                    // maxAge: 2 * 60 * 60 * 1000, // Set cookie expiration time (2 hours)
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
            const refreshTokenObj = await RefreshToken.findOne({staffId: payload.id});
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
            await RefreshToken.deleteOne({staffId: payload.id});
            console.log('Deleting old refresh token');
            // create a new refresh token
            await RefreshToken.create({staffId: payload.id, token: refreshToken});
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
            console.log('Genesis is Here');
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

    static async AdminCheck(id) {
        try {
            // extract admin data
            const admin = await Staff.findById(id);
            if (!admin) {
                return new Error('Unauthorized Access');
            }
            // ensure only Admin or SuperAdmin can perform this request
            if (admin.role !== 'Admin' && admin.role !== 'SuperAdmin') {
                return new Error('Forbidden Operation: Privileged Access Required');
            }
            return admin;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async StaffCheck(id) {
        try {
            // extract admin data
            const staff = await Staff.findById(id);
            if (!staff) {
                return new Error('Unauthorized Access');
            }
            // ensure every other role can perform this task except Admin or SuperAdmin
            const {role} = staff;
            if (role === 'Admin' || role === 'SuperAdmin') {
                return new Error('Forbidden Operation: Strictly a Staff Operation');
            }
            return staff;

        } catch (error) {
            throw new Error(error.message)
        }
    }

    static async dashBoardCheck(id) {
        try {
            const staff = await Staff.findById(id);
            if (!staff) {
                return new Error(`User with ID ${id} not found.`);
            }
            const staffData = {};
            //extract all the keys from the return staff object query
            const staffObj = staff.toObject();
            const exclude = ['_id', 'password', '__v', 'createdAt', 'updatedAt'];
            Object.keys(staffObj).forEach((key) => {
                if (!exclude.includes(key)) {
                    staffData[key] = staff[key];
                }
            });
            return staffData;
        } catch (err) {
            return new Error(err.message);
        }
    }

    static async apiPrecheck(req) {
        try {
            const encryptedAccessToken = await AuthController.refreshCurrPreCheck(req);
            if (encryptedAccessToken instanceof Error) {
                return new Error(encryptedAccessToken.message);
            }
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
            const verifiedAccessToken = await AuthController.headlessCheck(req);
            if (verifiedAccessToken instanceof Error) {
                return res.status(400).json({error: verifiedAccessToken.message});
            }
            return res.status(200).json({
                msg: 'AccessToken verified',
            });
        } catch (error) {
            console.log('Error caught:', error.message);
            return res.status(400).json({error: error.message});
        }
    }
}

module.exports = AuthController;
