import { Router } from "express";
import { create_history, get_all_history, update_history } from "../controllers/history-controller.js";
import { user_auth, admin_auth } from "../middlewares/user_auth.js";

const history_router = Router();

history_router.post('/', user_auth, create_history);
history_router.get('/', admin_auth, get_all_history);
history_router.put('/:history_id', user_auth, update_history);

export default history_router;
