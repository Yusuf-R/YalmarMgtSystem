import SecurityConfig from "../utils/config";

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');
const authClient = require('./AuthController');
const RefreshToken = require('../models/RefreshToken');
const dbClient = require('../utils/db');
const mailClient = require('../utils/mailer');
const securityConfig = new SecurityConfig();


const userRef = ['username', 'country', 'city', 'phone', 'isAdmin', 'img'];
const signupRef = ['username', 'firstName', 'lastName'];

class UserController {
    static async getAllUsers(req, res) {
        const credentials = await authClient.fullAdminCheck(req);
        if (credentials.error) {
            return res.status(400).json({error: credentials.error});
        }
        const {accessToken} = credentials;
        const users = await User.find();
        if (!users) {
            return res.status(400).json({error: 'No users found'});
        }
        return res.status(200).json({
            message: 'All users retrieved successfully', data: users, accessToken,
        });
    }
    
    static async signUp(req, res) {
        const data64 = await authClient.signInPrecheck(req);
        if (data64.error) {
            return res.status(400).json({error: data64.error});
        }
        const decodeData = await authClient.singinDecrypt(data64);
        if (decodeData.error) {
            return res.status(400).json({error: decodeData.error});
        }
        const attributes = {};
        attributes.email = decodeData.email;
        attributes.password = decodeData.password;
        // Check if the body of the request has the required attributes
        for (const key of signupRef) {
            if (!Object.prototype.hasOwnProperty.call(req.body, key)) {
                return res.status(400).json({
                    error: `Missing required attribute: ${key}`, genFormat: '{ username: <string>, email: <string> }',
                });
            }
            attributes[key] = req.body[key];
        }
        let coreCheck = await User.findOne({email: attributes.email});
        if (coreCheck) {
            return res.status(409).json({error: 'User email already exists'});
        }
        coreCheck = await User.findOne({username: attributes.username});
        if (coreCheck) {
            return res.status(409).json({error: 'Username already exists'});
        }
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(attributes.password, saltRounds);
        attributes.password = hashedPassword;
        try {
            // Create a new user
            const user = await User.createUser(attributes);
            return res.status(201).json({
                msg: 'User object successfully created', data: user,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: 'Internal Server Error'});
        }
    }
    
    static async resetPassword(req, res) {
        // check if the email is valid
        const {email} = req.body;
        if (!email) {
            return res.status(400).json({
                error: 'Missing email', resolve: 'Please provide your email', reqFormat: ' { email: <string> }',
            });
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }
        // Generate and send password reset password token
        const resetToken = await user.generateOTP();
        try {
            await mailClient.sendToken(user);
        } catch (err) {
            return res.status(500).json({
                error: 'Mail Client Error',
            });
        }
        return res.status(201).json({
            message: 'Password resetpassword token sent successfully', email: user.email, resetToken,
        });
    }
    
    static async newPassword(req, res) {
        const {token} = req.body;
        if (!token) {
            return res.status(400).json({error: 'Missing token'});
        }
        const data64 = await authClient.signInPrecheck(req);
        if (data64.error) {
            return res.status(400).json({error: data64.error});
        }
        console.log({data64});
        const dataDecode = await authClient.singinDecrypt(data64);
        console.log({dataDecode});
        if (dataDecode.error) {
            return res.status(400).json({error: dataDecode.error});
        }
        const {email, password} = dataDecode;
        if (!email) {
            return res.status(400).json({error: 'Missing email'});
        }
        if (!password) {
            return res.status(400).json({error: 'Missing password'});
        }
        try {
            // check if server is up before verifying
            if (!(await dbClient.isAlive())) {
                return res.status(500).json({error: 'Database connection failed'});
            }
            const existingUser = await User.findOne({email});
            if (!existingUser) {
                return res.status(400).json({error: 'Invalid email credentials'});
            }
            // hash the password using bcrypt
            const hashedPwd = await bcrypt.hash(password, 10);
            let user = await existingUser.validateOTP(token);
            if (user.error) {
                return res.status(404).json({error: user.error});
            }
            user = await user.changePassword(hashedPwd);
            if (!user) {
                return res.status(500).json({error: 'Internal Server Error'});
            }
            // proceed user to login after password change
            return res.status(201).json({
                message: 'Password reset password successfully', email: user.email,
            });
        } catch (err) {
            console.error(err);
            return res.status(400).json({error: err});
        }
    }
    
    static async changePassword(req, res) {
        const id = await authClient.fullCurrCheck(req);
        if (id.error) {
            return res.status(400).json({error: id.error});
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({error: 'User Object not found'});
        }
        const {email, oldPassword, newPassword} = req.body;
        if (!email || !oldPassword || !newPassword) {
            return res.status(400).json({
                error: 'Missing required fields',
                reqFields: ['email', 'oldPassword', 'newPassword'],
                format: 'email: string, oldPassword: string, newPassword: string',
            });
        }
        // check if server is up before verifying
        if (!(await dbClient.isAlive())) {
            return res.status(500).json({error: 'Database connection failed'});
        }
        // compare old password to the hashed password in the database
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({error: 'Invalid old password'});
        }
        // hash the password using bcrypt
        const hashedPwd = await bcrypt.hash(newPassword, 10);
        try {
            const updatedUser = await user.changePassword(hashedPwd);
            if (updatedUser.error) {
                return res.status(400).json({error: updatedUser.error});
            }
        } catch (err) {
            return res.status(400).json({error: err});
        }
        // generate new credential for the user
        const newCredentials = await authClient.generateJWT(user);
        if (newCredentials.error) {
            return res.status(400).json({error: newCredentials.error});
        }
        if (!newCredentials) {
            return res.status(500).json({error: 'Internal Server Error'});
        }
        const {accessToken, refreshToken} = newCredentials;
        // update RedisClient with the new credentials of the accessToken
        const updateRedisAcessToken = await authClient.setJWT(user, accessToken);
        if (updateRedisAcessToken.error) {
            return res.status(400).json({error: updateRedisAcessToken.error});
        }
        return res.status(201).json({
            message: 'Password changed successfully', accessToken, refreshToken,
        });
    }
    
    static async login(req, res) {
        const data64 = await authClient.signInPrecheck(req);
        if (data64.error) {
            return res.status(400).json({error: data64.error});
        }
        const decodeData = await authClient.singinDecrypt(data64);
        if (decodeData.error) {
            return res.status(400).json({error: decodeData.error});
        }
        const {email, password} = decodeData;
        if (!email) {
            return res.status(400).json({
                error: 'Missing email address', reqFormat: ' { email:  <string>, password:  <string> }',
            });
        }
        if (!password) {
            return res.status(400).json({
                error: 'Missing password', reqFormat: ' { email:  <string>, password:  <string> }',
            });
        }
        try {
            if (!await dbClient.isAlive()) {
                return res.status(500).json({error: 'Internal Server Error'});
            }
            const user = await User.findOne({email});
            if (!user) {
                return res
                    .status(400)
                    .json({error: 'User with this email address not found'});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({error: 'Incorrect password'});
            }
            const id = user._id.toString();
            if (!id) {
                return res.status(500).json({error: 'Internal Server Error'});
            }
            // set up JWT token using this credentials
            const {accessToken, refreshToken} = await authClient.generateJWT(user);
            if (!accessToken || !refreshToken) {
                return res.status(500).json({error: 'Internal Server Error'});
            }
            // set the access token to redis client
            try {
                await authClient.setJWT(user, accessToken);
            } catch (err) {
                return res.status(500).json({error: 'Redis Internal Server Error'});
            }
            // encrypt our accessToken with our CIPHER_TOKEN_SECRET
            const encryptedAccessToken = securityConfig.encryptData(accessToken);
            
            // set the encryptedAccessToken to be stored as a signed cookie
            res.cookie('accessToken', encryptedAccessToken, {
                // httpOnly: true, // Prevent client-side access via JavaScript
                secure: true, // Requires HTTPS connection for secure transmission
                maxAge: 2 * 60 * 60 * 1000, // Set cookie expiration time (2 hours)
                sameSite: 'strict', // Mitigate cross-site request forgery (CSRF) attacks
            });
            return res.status(201).json({
                message: 'Login successful',
                accessToken: encryptedAccessToken,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({error: 'Failed to login'});
        }
    }
    
    static async dashboardData(req, res) {
        try {
            const result = await authClient.apiPrecheck(req);
            if (result instanceof Error) {
                // Handle the error
                return res.status(401).json({error: result.message});
            }
            const {verifiedAccessToken, decryptedAccessToken} = result;
            const {id} = verifiedAccessToken;
            const userData = await authClient.dashBoardCheck(id);
            if (userData instanceof Error) {
                return res.status(400).json({error: userData.message});
            }
            // set the userData to be stored as cookie
            res.cookie('userData', JSON.stringify(userData), {
                // httpOnly: true, // Prevent client-side access via JavaScript
                secure: true, // Requires HTTPS connection for secure transmission
                maxAge: 2 * 60 * 60 * 1000, // Set cookie expiration time (2 hours)
                sameSite: 'strict', // Mitigate cross-site request forgery (CSRF) attacks
            })
            return res.status(200).json({
                message: 'Dashboard data retrieved successfully',
                userData,
                accessToken: decryptedAccessToken,
            });
        } catch (err) {
            return res.status(401).json({error: err.message ? err.message : 'Unauthorized'});
        }
    }
    
    static async logout(req, res) {
        try {
            const accessToken = await authClient.currPreCheck(req);
            if (accessToken.error) {
                return res.status(400).json({error: accessToken.error});
            }
            const payload = await authClient.verifyAccessToken(accessToken);
            if (payload.error) {
                return res.status(400).json({error: payload});
            }
            const {id} = payload;
            if (!id) {
                return res.status(400).json({error: 'Invalid token'});
            }
            // delete the access token from Redis
            const result = await authClient.deleteJWT(id);
            if (result.error) {
                return res.status(500).json(result);
            }
            const ret = await RefreshToken.deleteOne({userId: id});
            if (ret.deletedCount === 0) {
                return res.status(500).json({error: 'Token Object does not exit'});
            }
            if (ret.deletedCount === 1 && result === 1) {
                return res.status(201).json({message: 'Logout successful'});
            }
            return res
                .status(500)
                .json({error: 'Invalid Operational Request', msg: 'Logout failed'});
        } catch (err) {
            return res
                .status(500)
                .json({error: 'Failed to logout', msg: err.message});
        }
    }
    
    static async updateUser(req, res) {
        const accessToken = await authClient.currPreCheck(req);
        if (accessToken.error) {
            return res.status(400).json({error: accessToken.error});
        }
        const payload = await authClient.verifyAccessToken(accessToken);
        if (payload.error) {
            return res.status(400).json({error: payload});
        }
        const {id} = payload;
        if (!id) {
            return res.status(400).json({error: 'Invalid token'});
        }
        // get Redis access token
        const redisAccessToken = await authClient.getJWT(id);
        if (redisAccessToken.error) {
            return res.status(400).json({error: redisAccessToken.error});
        }
        if (redisAccessToken !== accessToken) {
            return res.status(400).json({error: 'Invalid token'});
        }
        // update the user profile
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({error: 'User not found'});
        }
        if (!user) {
            res.status(400).json({error: 'Invalid Credentials for ths token'});
        }
        const attributes = {};
        for (const key of userRef) {
            if (Object.prototype.hasOwnProperty.call(req.body, key) && (key !== 'email' || key !== 'password')) {
                attributes[key] = req.body[key];
            }
        }
        // update the userprofile
        let updatedUser;
        try {
            updatedUser = await user.updateProfile(attributes);
        } catch (err) {
            return res.status(500).json({
                error: 'Potential Data Integrity Violation', msg: err.message,
            });
        }
        if (!updatedUser) {
            return res.status(500).json({error: 'Internal Server Error'});
        }
        const userData = await authClient.dashBoardCheck(id);
        if (!userData) {
            return res.status(400).json({error: 'Invalid token to fetch userData'});
        }
        return res.status(201).json({
            message: 'Profile updated successfully', userData,
        });
    }
    
    static async userData(req, res) {
        const ops = await authClient.fullCurrCheck(req);
        if (ops.error) {
            return res.status(400).json({error: ops.error});
        }
        const {id, accessToken} = ops;
        const userData = await authClient.dashBoardCheck(id);
        if (userData.error) {
            return res.status(400).json({error: userData.error});
        }
        return res.status(200).json({
            userData, accessToken,
        });
    }
    
    
}

module.exports = UserController;
