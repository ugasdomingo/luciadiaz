import { Router } from "express";
import { create_formation, get_all_formations, get_formation_by_id, update_formation, delete_formation } from "../controllers/formation-controller.js";
import { admin_auth } from "../middlewares/user_auth.js";

const formation_router = Router();

formation_router.get('/', get_all_formations);
formation_router.get('/:formation_id', get_formation_by_id);
formation_router.post('/', admin_auth, create_formation);
formation_router.put('/:formation_id', admin_auth, update_formation);
formation_router.delete('/:formation_id', admin_auth, delete_formation);

export default formation_router;