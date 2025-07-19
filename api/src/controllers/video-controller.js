import { Video } from "../models/Video-model.js";
import { client_response } from "../utils/responses.js";
import { upload_video_cover, delete_image } from "../utils/cloudinary.js";
import fs from 'fs-extra';

//Get all videos
export const get_all_videos = async (req, res, next) => {
    try {
        const { display } = req.params;
        if (display === '0') {
            const videos = await Video.find().sort({ createdAt: -1 }).lean();
            return client_response(res, 200, 'OK', videos);
        }
        const videos = await Video.find().sort({ createdAt: -1 }).limit(display).lean();
        return client_response(res, 200, 'OK', videos);
    } catch (error) {
        next(error);
    }
}

export const get_video_by_id = async (req, res, next) => {
    try {
        const { video_id } = req.params;
        const video = await Video.findById(video_id).lean();
        if (!video) {
            throw new Error('Video no encontrado');
        }
        return client_response(res, 200, 'OK', video);
    } catch (error) {
        next(error);
    }
}

export const create_video = async (req, res, next) => {
    try {
        const { title, brief, video_url, category, tags } = req.body;
        const user_id = req.user_id;
        const video = new Video({ title, brief, video_url, category, tags, user_id });

        if (req.files?.video_cover) {
            const result = await upload_video_cover(req.files.video_cover);
            video.video_cover = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };

            await fs.remove(req.files.video_cover.tempFilePath);
        }

        await video.save();
        return client_response(res, 201, 'Video creado');
    } catch (error) {
        next(error);
    }
}

export const update_video = async (req, res, next) => {
    try {
        const { video_id } = req.params;
        const video = await Video.findById(video_id);
        if (!video) {
            throw new Error('Video no encontrado');
        }
        video.title = req.body.title || video.title;
        video.brief = req.body.brief || video.brief;
        video.video_url = req.body.video_url || video.video_url;
        video.category = req.body.category || video.category;
        video.tags = req.body.tags || video.tags;
        if (req.files?.video_cover) {
            await delete_image(video.video_cover.public_id);
            const result = await upload_video_cover(req.files.video_cover);
            video.video_cover = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };
            await fs.remove(req.files.video_cover.tempFilePath);
        }
        await video.save();
        return client_response(res, 200, 'Video actualizado');
    } catch (error) {
        next(error);
    }
}

export const delete_video = async (req, res, next) => {
    try {
        const { video_id } = req.params;
        const video = await Video.findByIdAndDelete(video_id);
        if (!video) {
            throw new Error('Video no encontrado');
        }
        await delete_image(video.video_cover.public_id);
        return client_response(res, 200, 'Video eliminado');
    } catch (error) {
        next(error);
    }
}



