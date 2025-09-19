import { Router } from "express";
import { admin_auth } from "../middlewares/user_auth.js";
import { create_post, delete_post, get_all_posts, get_post_by_slug, update_post, change_post_status, get_all_posts_admin } from "../controllers/post-controller.js";
import fileUpload from "express-fileupload";

const post_router = Router();

post_router.get('/:display', get_all_posts);
post_router.get('/post/:post_slug', get_post_by_slug);
post_router.get('/admin/all', admin_auth, get_all_posts_admin);
post_router.post('/', admin_auth, fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }), create_post);
post_router.put('/:post_id', admin_auth, fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }), update_post);
post_router.put('/status/:post_id', admin_auth, change_post_status);
post_router.delete('/:post_id', admin_auth, delete_post);

export default post_router;