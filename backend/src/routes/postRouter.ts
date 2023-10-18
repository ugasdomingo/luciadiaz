//Import tools
import { Router } from 'express';
import { adminAuth } from '../middlewares/adminAuth';
import fs from 'fs-extra';
import fileUpload from 'express-fileupload';
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
} from '../controllers/postControllers';

//Define router
const postRouter = Router();

//routes
postRouter.post('/', adminAuth, createPost);

postRouter.get('/', getAllPosts);

postRouter.get('/:id', getPostById);

postRouter.put('/:id', adminAuth, updatePost);

postRouter.delete('/:id', adminAuth, deletePost);

//Export router
export default postRouter;
