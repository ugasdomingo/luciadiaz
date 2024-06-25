//Import tools
import { Request, Response } from 'express';
import { Post, IPost } from '../models/Post';
import { deleteImage } from '../utils/cloudinary';

// Create --> Line 14
// getAllPosts --> Line 37
// getPostById --> Line 57
// Update --> Line 80
// Delete --> Line 103

//Create
export const createPost = async (req: Request, res: Response) => {
    const { title, content, cover, category, tags, author } = req.body;

    try {
        //Create post
        const post: IPost = new Post({
            title,
            content,
            cover,
            category,
            tags,
            author,
        });

        await post.save();

        return res.status(201).json({
            msg: 'Post creado',
            post,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al crear el post',
        });
    }
};

//Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts: IPost[] = await Post.find();

        return res.status(200).json({
            msg: 'Posts obtenidos',
            posts,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al obtener los posts',
        });
    }
};

//Get post by id
export const getPostById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const post: IPost | null = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                msg: 'Post no encontrado',
            });
        }

        return res.status(200).json({
            msg: 'Post obtenido',
            post,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al obtener el post',
        });
    }
};

//Update
export const updatePost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, content, coverUrl, category, tags, author } = req.body;

    try {
        const post: IPost | null = await Post.findByIdAndUpdate(id, {
            title,
            content,
            coverUrl,
            category,
            tags,
            author,
        });

        if (!post) {
            return res.status(404).json({
                msg: 'Post no encontrado',
            });
        }

        await post.save();

        return res.status(200).json({
            msg: 'Post actualizado',
            post,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al actualizar el post',
        });
    }
};

//Delete
export const deletePost = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const post: IPost | null = await Post.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).json({
                msg: 'Post no encontrado',
            });
        }

        //Delete image from cloudinary
        await deleteImage(post.cover);

        return res.status(200).json({
            msg: 'Post eliminado',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al eliminar el post',
        });
    }
};
