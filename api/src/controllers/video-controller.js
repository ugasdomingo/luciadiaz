import { Video } from "../models/Video-model.js";
import { client_response } from "../utils/responses.js";
import { upload_video_cover } from "../utils/cloudinary.js";
import fs from 'fs-extra';

//Get all videos
export const get_all_videos = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 }).lean();

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
        const { title, content, category, tags } = req.body;
        const video = new Video({ title, content, category, tags });

        if (req.file?.video_cover) {
            const result = await upload_video_cover(req.file.video_cover);
            video.post_cover = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };

            await fs.remove(req.file.video_cover.tempFilePath);
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
        video.content = req.body.content || video.content;
        video.category = req.body.category || video.category;
        video.tags = req.body.tags || video.tags;
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
        return client_response(res, 200, 'Video eliminado');
    } catch (error) {
        next(error);
    }
}



