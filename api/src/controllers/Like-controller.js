import { Like } from "../models/Like-model.js";
import { Post } from "../models/Post-model.js";
import { Video } from "../models/Video-model.js";
import { Formation } from "../models/Formation-model.js";
import { client_response } from "../utils/responses.js";

export const user_create_like = async (req, res, next) => {
    try {
        const { item_type, item_id } = req.body;
        const user_id = req.user_id;
        const like = new Like({ user_id, item_type, item_id });
        await like.save();

        if (item_type === 'post') {
            const post = await Post.findById(item_id);
            post.likes++;
            await post.save();
        } else if (item_type === 'video') {
            const video = await Video.findById(item_id);
            video.likes++;
            await video.save();
        } else if (item_type === 'formation') {
            const formation = await Formation.findById(item_id);
            formation.likes++;
            await formation.save();
        } else {
            throw new Error('Tipo de item no válido');
        }

        return client_response(res, 201, 'Like creado correctamente');
    } catch (error) {
        next(error);
    }
}

export const visitor_create_like = async (req, res, next) => {
    try {
        const { item_type, item_id, email } = req.body;
        const like = new Like({ email, item_type, item_id });
        await like.save();

        if (item_type === 'post') {
            const post = await Post.findById(item_id);
            post.likes++;
            await post.save();
        } else if (item_type === 'video') {
            const video = await Video.findById(item_id);
            video.likes++;
            await video.save();
        } else if (item_type === 'formation') {
            const formation = await Formation.findById(item_id);
            formation.likes++;
            await formation.save();
        } else {
            throw new Error('Tipo de item no válido');
        }

        return client_response(res, 201, 'Like creado correctamente');
    } catch (error) {
        next(error);
    }
}

export const user_unlike = async (req, res, next) => {
    try {
        const { like_id } = req.params;
        const user_id = req.user_id;
        const like = await Like.findOne({ _id: like_id, user_id });
        if (!like) {
            throw new Error('Like no encontrado');
        }
        await like.remove();
        if (like.item_type === 'post') {
            const post = await Post.findById(like.item_id);
            post.likes--;
            await post.save();
        } else if (like.item_type === 'video') {
            const video = await Video.findById(like.item_id);
            video.likes--;
            await video.save();
        } else if (like.item_type === 'formation') {
            const formation = await Formation.findById(like.item_id);
            formation.likes--;
            await formation.save();
        } else {
            throw new Error('Tipo de item no válido');
        }
        return client_response(res, 200, 'Like eliminado correctamente');
    } catch (error) {
        next(error);
    }
}

export const visitor_unlike = async (req, res, next) => {
    try {
        const { like_id } = req.params;
        const {email} = req.body;
        const like = await Like.findOne({ _id: like_id, email });
        if (!like) {
            throw new Error('Like no encontrado');
        }
        await like.remove();
        if (like.item_type === 'post') {
            const post = await Post.findById(like.item_id);
            post.likes--;
            await post.save();
        } else if (like.item_type === 'video') {
            const video = await Video.findById(like.item_id);
            video.likes--;
            await video.save();
        } else if (like.item_type === 'formation') {
            const formation = await Formation.findById(like.item_id);
            formation.likes--;
            await formation.save();
        } else {
            throw new Error('Tipo de item no válido');
        }
        return client_response(res, 200, 'Like eliminado correctamente');
    } catch (error) {
        next(error);
    }
}

export const get_all_likes = async (req, res, next) => {
    try {
        const likes = await Like.find().lean();
        return client_response(res, 200, 'OK', likes);
    } catch (error) {
        next(error);
    }
}


