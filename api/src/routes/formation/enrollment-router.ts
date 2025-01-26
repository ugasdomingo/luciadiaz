//Import tools
import { Router } from 'express';
import { admin_auth } from '../../middlewares/admin-auth';
import { user_auth } from '../../middlewares/user-auth';
import {
    create_enrollment,
    get_enrollments,
    get_enrollment,
    update_enrollment_status,
} from '../../controllers/formation/enrollment-controllers';

//Create the router
const enrollment_router = Router();

//Routes
enrollment_router.post('/', user_auth, create_enrollment);

enrollment_router.get('/', admin_auth, get_enrollments);

enrollment_router.get('/:id', user_auth, get_enrollment);

enrollment_router.put('/:id', admin_auth, update_enrollment_status);

//Export the router
export default enrollment_router;
