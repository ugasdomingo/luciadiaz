import { Router } from "express";
import { user_auth, admin_auth } from "../middlewares/user_auth.js";
import { create_video, delete_video, get_all_videos, get_video_by_id, update_video } from "../controllers/video-controller.js";
import fileUpload from "express-fileupload";

const video_router = Router();

video_router.get('/:display', get_all_videos);
video_router.get('/video/:video_id', get_video_by_id);
video_router.post('/', admin_auth, fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }), create_video);
video_router.put('/:video_id', admin_auth, fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }), update_video);
video_router.delete('/:video_id', admin_auth, delete_video);

export default video_router;
