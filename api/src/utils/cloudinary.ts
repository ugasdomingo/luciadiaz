//Import tools
import { v2 as cloudinary } from 'cloudinary';
import { internal_response } from './responses';

//Configure the cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
});

//Export the cloudinary functions
export const upload_formation_cover = async (file: any) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'Lucia/Formaciones',
            use_filename: true,
        });

        return result;
    } catch (error: any) {
        internal_response('Error uploading the image', error);
        return error;
    }
};

export const upload_post_cover = async (file: any) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'Lucia/Posts',
            use_filename: true,
        });

        return result;
    } catch (error: any) {
        internal_response('Error uploading the image', error);
        return error;
    }
};

export const upload_video_cover = async (file: any) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'Lucia/Meditaciones',
            use_filename: true,
        });

        return result;
    } catch (error: any) {
        internal_response('Error uploading the image', error);
        return error;
    }
};

export const upload_payment = async (file: any) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'Lucia/Comprobantes',
            use_filename: true,
        });

        return result;
    } catch (error: any) {
        internal_response('Error uploading the image', error);
        return error;
    }
};

export const delete_image = async (image: any) => {
    try {
        const result = await cloudinary.uploader.destroy(image.public_id);

        return result;
    } catch (error: any) {
        internal_response('Error deleting the image', error);
        return error;
    }
};
