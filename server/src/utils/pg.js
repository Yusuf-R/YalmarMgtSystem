// const {v4: uuidv4} = require('uuid');
//
// require('dotenv').config({path: '../../../server/.env'});
// const crypto = require('crypto');
// var jwt = require('jsonwebtoken');
// var cookieParser = require('cookie-parser')
//
// const encryptData = (data) => {
//     const keyBuffer = Buffer.from(process.env.CIPHER_SECRET, 'hex');
//     const iv = crypto.randomBytes(16);
//     const cipher = crypto.createCipheriv('aes-256-gcm', keyBuffer, iv);
//     let encrypted = cipher.update(data, 'utf8', 'hex');
//     encrypted += cipher.final('hex');
//     const authTag = cipher.getAuthTag();
//     return iv.toString('hex') + authTag.toString('hex') + encrypted;
// }
//
//
// const decryptedData = (encryptedData) => {
//     const keyBuffer = Buffer.from(process.env.CIPHER_SECRET, 'hex');
//     const iv = Buffer.from(encryptedData.slice(0, 32), 'hex');
//     const authTag = Buffer.from(encryptedData.slice(32, 64), 'hex');
//     const decipher = crypto.createDecipheriv('aes-256-gcm', keyBuffer, iv);
//     decipher.setAuthTag(authTag);
//     try {
//         let decryptedData = decipher.update(encryptedData.slice(64), 'hex', 'utf8');
//         decryptedData += decipher.final('utf8');
//         return decryptedData;
//     } catch (error) {
//         console.error('Error during decryption:', error.message);
//         return null;
//     }
// }
//
// const data = {
//     name: 'Kehinde',
//     id: uuidv4(),
//     isAdmin: true,
// }
//
// const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'});
// console.log({accessToken});
// const encryptedData = encryptData(accessToken);
// console.log({encryptedData});
// const decrytDT = decryptedData(encryptedData);
// console.log({decrytDT});
//
