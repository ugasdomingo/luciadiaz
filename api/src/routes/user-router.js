import { Router } from "express";
import { user_auth, admin_auth } from "../middlewares/user_auth.js";
import { get_all_users, get_user_by_id, update_user, role_to_patient } from "../controllers/user-controller.js";

const user_router = Router();

user_router.get('/', admin_auth, get_all_users);
user_router.get('/:user_id', admin_auth, get_user_by_id);
user_router.put('/:user_id', user_auth, update_user);
user_router.put('/role_to_patient/:user_id', admin_auth, role_to_patient);

export default user_router;