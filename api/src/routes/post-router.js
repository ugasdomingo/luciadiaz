import { Router } from "express";
import { user_auth, admin_auth } from "../middlewares/user_auth.js";
import { create_post, delete_post, get_all_posts, get_post_by_id, update_post, change_post_status } from "../controllers/post-controller.js";
import fileUpload from "express-fileupload";

const post_router = Router();

post_router.get('/:display', get_all_posts);
post_router.get('/post/:post_id', get_post_by_id);
post_router.post('/', admin_auth, fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }), create_post);
post_router.put('/:post_id', admin_auth, fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }), update_post);
post_router.put('/status/:post_id', admin_auth, change_post_status);
post_router.delete('/:post_id', admin_auth, delete_post);

export default post_router;