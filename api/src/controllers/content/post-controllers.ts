//Import tools
import { Post_model, IPost } from '../../models/content/PostModel';
import { Medical_record_model } from '../../models/MedicalRecordModel';
import { client_response, internal_response } from '../../utils/responses';
import { upload_post_cover } from '../../utils/cloudinary';
import { add_liked_post_id } from '../medical-record-controllers';
import fs from 'fs-extra';

//Create a new post
export const create_post = async (req: any, res: any) => {
    try {
        const { title, content, categorys, video_url } = req.body;

        //Check if the post already exists
        const post_exists = await Post_model.findOne({ title });
        if (post_exists) {
            return client_response(res, 400, 'Post ya existe');
        }

        //Create the post
        const new_post: IPost = new Post_model({
            title,
            content,
            categorys,
            video_url,
        });

        //Upload the post cover image
        if (req.files?.cover_image) {
            const cover_image = await upload_post_cover(req.files.cover_image);
            new_post.cover_image = {
                public_id: cover_image.public_id,
                secure_url: cover_image.secure_url,
            };

            await fs.unlink(req.files.cover_image.tempFilePath);
        }

        //Save the post
        await new_post.save();

        return client_response(res, 200, 'Post agregado correctamente');
    } catch (error) {
        internal_response('Error while creating the post', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get all the posts
export const get_posts = async (req: any, res: any) => {
    try {
        const posts = await Post_model.find();

        return client_response(res, 200, 'Correcto', posts);
    } catch (error) {
        internal_response('Error while getting the posts', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get a single post
export const get_post = async (req: any, res: any) => {
    try {
        const post = await Post_model.findById(req.params.id);

        return client_response(res, 200, 'Correcto', post);
    } catch (error) {
        internal_response('Error while getting the post', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Update a post
export const update_post = async (req: any, res: any) => {
    try {
        const post = await Post_model.findById(req.params.id);

        if (!post) {
            return client_response(res, 404, 'Post no encontrado');
        }

        if (req.files?.cover_image) {
            const cover_image = await upload_post_cover(req.files.cover_image);
            post.cover_image = {
                public_id: cover_image.public_id,
                secure_url: cover_image.secure_url,
            };

            await fs.unlink(req.files.cover_image.path);
        }

        //Update the post
        post.set(req.body);
        await post.save();

        return client_response(res, 200, 'Post actualizado correctamente');
    } catch (error) {
        internal_response('Error while updating the post', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Delete a post
export const delete_post = async (req: any, res: any) => {
    try {
        //Delete the post
        await Post_model.findByIdAndDelete(req.params.id);

        return client_response(res, 200, 'Post eliminado correctamente');
    } catch (error) {
        internal_response('Error while deleting the post', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Like a post
export const add_like = async (req: any, res: any) => {
    try {
        const post = await Post_model.findById(req.params.id);
        const { medical_record } = req.body;

        //Check if the post exists
        if (!post) {
            return client_response(res, 404, 'Post no encontrado');
        }

        //Check if the user already liked the post
        const already_liked = await Medical_record_model.findOne({
            medical_record: medical_record,
            liked_posts: post._id,
        });

        if (already_liked) {
            return client_response(res, 400, 'Ya le diste like a este post');
        }

        //Add the post id to the user's liked posts
        await add_liked_post_id(medical_record, post._id);

        //Increment the post likes
        post.likes += 1;
        await post.save();

        return client_response(
            res,
            200,
            'Me alegro que te haya gustado el post'
        );
    } catch (error) {
        internal_response('Error while liking the post', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};
