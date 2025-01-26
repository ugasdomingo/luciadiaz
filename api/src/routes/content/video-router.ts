//Import tools
import { Router } from 'express';
import fileUpload from 'express-fileupload';
import { admin_auth } from '../../middlewares/admin-auth';
import { user_auth } from '../../middlewares/user-auth';
import {
    create_video,
    get_videos,
    get_video,
    update_video,
    delete_video,
    add_like,
} from '../../controllers/content/video-controllers';

//Create the router
const video_router = Router();

//Routes
video_router.post(
    '/',
    admin_auth,
    fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads',
    }),
    create_video
);

video_router.get('/', get_videos);

video_router.get('/:id', get_video);

video_router.put('/:id', admin_auth, update_video);

video_router.delete('/:id', admin_auth, delete_video);

video_router.put('/like/:id', user_auth, add_like);

//Export router
export default video_router;
