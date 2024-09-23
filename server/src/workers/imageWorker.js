import {cloudinary} from "../utils/cloudinary";

const fs = require('fs');

process.on('message', async (data) => {
    const {filePaths, folderPath} = data;
    const uploadPromises = filePaths.map(filePath =>
        cloudinary.uploader.upload(filePath, {
            folder: folderPath,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            invalidate: true,
            transformation: [
                {width: 500, height: 500},
                {quality: 'auto', fetch_format: 'auto'},
            ],
            secure: true
        })
    );
    
    let uploadedImages = [];
    try {
        const results = await Promise.all(uploadPromises);
        uploadedImages = results.map(result => result.secure_url);
        process.send(uploadedImages);  // Send URLs back to the main process
    } catch (uploadError) {
        process.send({error: 'Image upload failed'});
    } finally {
        // Clean up temp files
        filePaths.forEach(filePath => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Failed to delete temp file:', err);
                }
            });
        });
    }
});
