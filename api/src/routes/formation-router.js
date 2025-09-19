import { Router } from "express";
import { create_formation, get_all_formations, get_all_formations_admin, get_formation_by_slug, update_formation, delete_formation } from "../controllers/formation-controller.js";
import { admin_auth } from "../middlewares/user_auth.js";
import fileUpload from "express-fileupload";

const formation_router = Router();

formation_router.get('/:display', get_all_formations);
formation_router.get('/formation/:formation_slug', get_formation_by_slug);
formation_router.get('/admin/all', admin_auth, get_all_formations_admin);
formation_router.post('/', admin_auth, fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }), create_formation);
formation_router.put('/:formation_id', admin_auth, fileUpload({ useTempFiles: true, tempFileDir: '/tmp' }), update_formation);
formation_router.delete('/:formation_id', admin_auth, delete_formation);

export default formation_router;