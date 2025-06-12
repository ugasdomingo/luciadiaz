import { Router } from "express";
import { admin_auth, user_auth } from "../middlewares/user_auth.js";
import { add_payment_proof, approve_payment, get_all_enrollments, get_enrollment_by_id, create_enrollment } from "../controllers/enrollment-controller.js";

const enrollment_router = Router();

enrollment_router.get('/', admin_auth, get_all_enrollments);
enrollment_router.get('/:enrollment_id', admin_auth, get_enrollment_by_id);
enrollment_router.put('/approve/:enrollment_id', admin_auth, approve_payment);
enrollment_router.post('/', user_auth, create_enrollment);
enrollment_router.put('/:enrollment_id', user_auth, add_payment_proof);

export default enrollment_router;
