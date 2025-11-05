import { Router } from "express";
import { admin_auth, user_auth } from "../middlewares/user_auth.js";
import { get_all_enrollments, get_enrollment_by_id, create_enrollment, validate_access, get_formation_keys } from "../controllers/enrollment-controller.js";

const enrollment_router = Router();

enrollment_router.get('/', admin_auth, get_all_enrollments);
enrollment_router.get('/:enrollment_id', admin_auth, get_enrollment_by_id);
enrollment_router.post('/', user_auth, create_enrollment);
enrollment_router.post('/validate-access', validate_access);
enrollment_router.get('/formation-keys/:formation_id', admin_auth, get_formation_keys);

export default enrollment_router;
