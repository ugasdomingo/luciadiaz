//Import tools
import { Video_model, IVideo } from '../../models/content/VideoModel';
import { client_response, internal_response } from '../../utils/responses';
import { upload_video_cover } from '../../utils/cloudinary';
import { add_liked_video_id } from '../medical-record-controllers';
import fs from 'fs-extra';

//Create a new video
export const create_video = async (req: any, res: any) => {
    try {
        const new_video: IVideo = new Video_model(req.body);

        if (req.files?.cover_image) {
            const cover_image = await upload_video_cover(req.files.cover_image);
            new_video.cover_image = {
                public_id: cover_image.public_id,
                secure_url: cover_image.secure_url,
            };

            await fs.unlink(req.files.cover_image.tempFilePath);
        }

        //Save the video
        await new_video.save();

        return client_response(res, 201, 'Video agregado correctamente');
    } catch (error) {
        internal_response('Error while creating the video', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get all the videos
export const get_videos = async (req: any, res: any) => {
    try {
        const videos = await Video_model.find();

        return client_response(res, 200, 'Correcto', videos);
    } catch (error) {
        internal_response('Error while getting the videos', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get a single video
export const get_video = async (req: any, res: any) => {
    try {
        const video = await Video_model.findById(req.params.id);

        return client_response(res, 200, 'Correcto', video);
    } catch (error) {
        internal_response('Error while getting the video', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Update a video
export const update_video = async (req: any, res: any) => {
    try {
        const video = await Video_model.findById(req.params.id);

        if (!video) {
            return client_response(res, 404, 'Video no encontrado');
        }

        if (req.files?.cover_image) {
            const cover_image = await upload_video_cover(req.files.cover_image);
            video.cover_image = {
                public_id: cover_image.public_id,
                secure_url: cover_image.secure_url,
            };

            await fs.unlink(req.files.cover_image.path);
        }

        video.set(req.body);
        await video.save();

        return client_response(res, 200, 'Video actualizado correctamente');
    } catch (error) {
        internal_response('Error while updating the video', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Delete a video
export const delete_video = async (req: any, res: any) => {
    try {
        const video = await Video_model.findById(req.params.id);

        if (!video) {
            return client_response(res, 404, 'Video no encontrado');
        }

        await video.deleteOne();

        return client_response(res, 200, 'Video eliminado correctamente');
    } catch (error) {
        internal_response('Error while deleting the video', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Add a like to a video
export const add_like = async (req: any, res: any) => {
    try {
        const { medical_record } = req.body;

        const video = await Video_model.findById(req.params.id);

        if (!video) {
            return client_response(res, 404, 'Video no encontrado');
        }

        await add_liked_video_id(medical_record, video._id);

        video.likes += 1;
        await video.save();

        return client_response(
            res,
            200,
            'Me alegro que te haya gustado el video'
        );
    } catch (error) {
        internal_response('Error while adding the like', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};
