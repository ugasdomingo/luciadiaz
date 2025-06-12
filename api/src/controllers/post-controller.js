import { Post } from "../models/Post-model.js";
import { client_response } from "../utils/responses.js";
import { upload_post_cover } from "../utils/cloudinary.js";
import fs from 'fs-extra';

//Get all posts
export const get_all_posts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).lean();
        return client_response(res, 200, 'OK', posts);
    } catch (error) {
        next(error);
    }
}

//Get post by id
export const get_post_by_id = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const post = await Post.findById(post_id).lean();
        if (!post) {
            throw new Error('Post no encontrado');
        }
        return client_response(res, 200, 'OK', post);
    } catch (error) {
        next(error);
    }
}

//Create post
export const create_post = async (req, res, next) => {
    try {
        const { title, content, category, tags } = req.body;
        const user_id = req.user_id;
        const post = new Post({ title, content, category, tags, user_id });
        if (req.file?.post_cover) {
            const result = await upload_post_cover(req.file.post_cover);
            post.post_cover = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };
            await fs.remove(req.file.post_cover.tempFilePath);
        }
        await post.save();
        return client_response(res, 201, 'Post creado');
    } catch (error) {
        next(error);
    }
}

//Update post
export const update_post = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const post = await Post.findById(post_id);
        if (!post) {
            throw new Error('Post no encontrado');
        }
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.category = req.body.category || post.category;
        post.tags = req.body.tags || post.tags;
        await post.save();
        return client_response(res, 200, 'Post actualizado');
    } catch (error) {
        next(error);
    }
}

//Delete post
export const delete_post = async (req, res, next) => {
    try {
        const { post_id } = req.params;
        const post = await Post.findByIdAndDelete(post_id);
        if (!post) {
            throw new Error('Post no encontrado');
        }
        return client_response(res, 200, 'Post eliminado');
    } catch (error) {
        next(error);
    }
}

