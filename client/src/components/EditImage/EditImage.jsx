import React, {useState, useCallback} from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function EditImage({image, onClose, onSave}) {
    const [crop, setCrop] = useState({aspect: 1});
    const [completedCrop, setCompletedCrop] = useState(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    
    const onImageLoaded = useCallback((img) => {
        this.imageRef = img;
    }, []);
    
    const onCropComplete = useCallback((crop) => {
        setCompletedCrop(crop);
    }, []);
    
    const onCropChange = (crop) => {
        setCrop(crop);
    };
    
    const getCroppedImg = (image, crop) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        
        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
        
        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    // eslint-disable-next-line no-console
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = 'cropped.jpg';
                window.URL.revokeObjectURL(croppedImageUrl);
                setCroppedImageUrl(window.URL.createObjectURL(blob));
                resolve(blob);
            }, 'image/jpeg');
        });
    };
    
    const handleSave = async () => {
        if (!completedCrop || !this.imageRef) {
            return;
        }
        
        const croppedImageBlob = await getCroppedImg(this.imageRef, completedCrop);
        onSave(croppedImageBlob);
    };
    
    return (
        <>
            <Box sx={{
                padding: '20px',
                width: 'calc(100% - 250px)',
                position: 'absolute',
                top: '70px',
                left: '250px',
            }}>
                <DialogTitle>Edit/Crop Image</DialogTitle>
                <DialogContent>
                    <ReactCrop
                        src={image}
                        crop={crop}
                        onImageLoaded={onImageLoaded}
                        onComplete={onCropComplete}
                        onChange={onCropChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Box>
        </>
    );
}

export default EditImage;
