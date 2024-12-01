const { parentPort, isMainThread } = require('node:worker_threads');
const sharp = require('sharp');

if (!isMainThread) {
    parentPort.on('message', async(buffer) => {
        try {
            // Use sharp to resize and compress the image
            const compressedBuffer = await sharp(buffer)
                .resize(500, 500, { fit: 'inside' }) // resize to 500x500 keeping aspect ratio
                .jpeg({ quality: 80 }) // compress to 80% quality
                .toBuffer();
            parentPort.postMessage(compressedBuffer);
        } catch (error) {
            parentPort.postMessage({ error: error.message });
        }
    });
}