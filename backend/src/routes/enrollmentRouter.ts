//Import tools
import { Router } from 'express';
import { adminAuth } from '../middlewares/adminAuth';
import { userAuth } from '../middlewares/userAuth';
import { userOrAdminAuth } from '../middlewares/userOrAdminAuth';
import {
    createEnrollment,
    getAllEnrollments,
    getEnrollmentById,
    updateEnrollment,
} from '../controllers/enrollmentControllers';

//Define router
const enrollmentRouter = Router();

//routes
enrollmentRouter.post('/', userAuth, createEnrollment);

enrollmentRouter.get('/', adminAuth, getAllEnrollments);

enrollmentRouter.get('/:id', userOrAdminAuth, getEnrollmentById);

enrollmentRouter.put('/:id', adminAuth, updateEnrollment);

//Export router
export default enrollmentRouter;
