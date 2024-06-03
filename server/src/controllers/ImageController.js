/* eslint-disable camelcase */
const mongoose = require('mongoose');
const streamifier = require('streamifier');
const Image = require('../models/Images');
import AuthController from "./AuthController";

const {cloudinary} = require('../utils/cloudinary');

class ImageController {
    static async getSignature(req, res) {
        try {
            const verifiedJWT = await AuthController.currPreCheck(req);
            if (verifiedJWT instanceof Error) {
                return res.status(400).json({error: verifiedJWT.message});
            }
            const {id} = verifiedJWT;
            if (!id) {
                return res.status(400).json({error: 'Invalid token'});
            }
            const timestamp = Math.round(Date.now() / 1000); // in seconds
            const signature = cloudinary.utils.api_sign_request(
                {
                    timestamp,
                    eager: [
                        {
                            width: 100,
                            height: 100,
                            crop: 'fill',
                        },
                    ],
                },
                process.env.CLOUDINARY_API_SECRET,
            );
            return res.status(200).json({
                timestamp,
                signature,
                accessToken,
            });
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            return res.status(500).json({error: error.message});
        }
    }
    
    static async uploadNewImage(req, res) {
        try {
            const verifiedJWT = await AuthController.currPreCheck(req);
            if (verifiedJWT instanceof Error) {
                return res.status(400).json({error: verifiedJWT.message});
            }
            const {id} = verifiedJWT;
            if (!id) {
                return res.status(400).json({error: 'Invalid token'});
            }
            const {timestamp, signature, parentFolder, subFolder} = req.body;
            if (!timestamp || !signature || !parentFolder || !subFolder) {
                return res.status(400).json({
                    error: 'Missing required attributes',
                    genFormat: '{ timestamp: <number>, signature: <string>, parentFolder: <string>, subFolder: <string>}',
                });
            }
            const {file} = req;
            if (!file || !file.originalname) {
                return res.status(400).json({error: 'Missing required attribute: file or file.filename'});
            }
            const public_id = `Hotel/${parentFolder}/${subFolder}/${file.originalname.split('.')[0]}`;
            // Use cloudinary.utils.api_sign_request to verify the signature
            const isValidSignature = cloudinary.utils.api_sign_request(
                {
                    timestamp,
                    eager: [
                        {
                            width: 100,
                            height: 100,
                            crop: 'fill',
                        },
                    ],
                },
                process.env.CLOUDINARY_API_SECRET,
            ) === signature;
            
            if (!isValidSignature) {
                return res.status(401).json({error: 'Invalid Signature'});
            }
            // const stringToSign = `overwrite=true&public_id=${public_id}&timestamp=${timestamp}`;
            // console.log('String to sign:', stringToSign);
            
            // Create a readable stream from the buffer
            const stream = streamifier.createReadStream(file.buffer);
            // Use cloudinary.uploader.upload_stream to upload the stream
            const streamObj = {
                resource_type: 'image',
                timestamp,
                public_id,
                api_key: process.env.CLOUDINARY_API_KEY,
                overwrite: true,
            };
            const uploadStream = cloudinary.uploader.upload_stream(streamObj, async (err, result) => {
                if (err) {
                    return res.status(500).json({error: err});
                }
                // check if the image already exists
                const img = await Image.findOne({altText: result.public_id});
                if (img) {
                    // delete image from the database
                    console.log('Deleting image from database');
                    await mongoose.models.Image.deleteOne({public_id});
                    // create new image object
                    console.log('Creating new image object entry to the database');
                    const imgObject = await mongoose.models.Image.create({
                        url: result.secure_url,
                        altText: result.public_id,
                        dir: result.folder,
                    });
                    if (!imgObject) {
                        return res.status(500).json({error: 'Database Internal Server Error'});
                    }
                    return res.status(200).json({
                        img: imgObject,
                        accessToken,
                    });
                }
                console.log('Creating new image object entry to the database');
                const imgObject = await mongoose.models.Image.create({
                    url: result.secure_url,
                    altText: result.public_id,
                    dir: result.folder,
                });
                if (!imgObject) {
                    return res.status(500).json({error: 'Database Internal Server Error'});
                }
                return res.status(200).json({
                    img: imgObject,
                    accessToken,
                });
            });
            // Pipe the stream to the uploadStream
            stream.pipe(uploadStream);
        } catch (error) {
            if (error.message === 'jwt expired') {
                return res.status(401).json({error: error.message});
            }
            return res.status(500).json({error: error.message});
        }
    }
}

module.exports = ImageController;
