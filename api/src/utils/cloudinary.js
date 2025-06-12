import { v2 as cloudinary } from 'cloudinary';

//Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export const upload_formation_cover = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: 'Lucia/Formaciones',
            use_filename: true,
            resource_type: 'auto'
        });
        return result;
    } catch (error) {
        throw error;
    }
}

export const upload_post_cover = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: 'Lucia/Posts',
            use_filename: true,
            resource_type: 'auto'
        });
        return result;
    } catch (error) {
        throw error;
    }
}

export const upload_video_cover = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: 'Lucia/Videos',
            use_filename: true,
            resource_type: 'auto'
        });
        return result;
    } catch (error) {
        throw error;
    }
}

export const upload_offline_payment = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: 'Lucia/Pagos',
            use_filename: true,
            resource_type: 'auto'
        });
        return result;
    } catch (error) {
        throw error;
    }
}

export const delete_image = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error) {
        throw error;
    }
}
