import { Router } from "express";
import { user_create_like, visitor_create_like, user_unlike, visitor_unlike, get_all_likes } from "../controllers/Like-controller.js";
import { user_auth, admin_auth } from "../middlewares/user_auth.js";

const like_router = Router();

like_router.post('/', user_auth, user_create_like);
like_router.post('/visitor', visitor_create_like);
like_router.delete('/:like_id', user_auth, user_unlike);
like_router.delete('/visitor/:like_id', visitor_unlike);
like_router.get('/', admin_auth, get_all_likes);

export default like_router;