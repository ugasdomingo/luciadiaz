//Import tools
import { Router } from 'express';
import fileUpload from 'express-fileupload';
import { admin_auth } from '../../middlewares/admin-auth';
import { user_auth } from '../../middlewares/user-auth';
import {
    create_post,
    get_posts,
    get_post,
    update_post,
    delete_post,
    add_like,
} from '../../controllers/content/post-controllers';

//Create the router
const post_router = Router();

//Routes
post_router.post(
    '/',
    admin_auth,
    fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads',
    }),
    create_post
);

post_router.get('/', get_posts);

post_router.get('/:id', get_post);

post_router.put('/:id', admin_auth, update_post);

post_router.delete('/:id', admin_auth, delete_post);

post_router.put('/like/:id', user_auth, add_like);

//Export the router
export default post_router;
