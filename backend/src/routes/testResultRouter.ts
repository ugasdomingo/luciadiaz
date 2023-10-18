//Import tools
import { Router } from 'express';
import { userOrAdminAuth } from '../middlewares/userOrAdminAuth';
import {
    createTestResult,
    getAllTestResultsByUserId,
    deleteTestResult,
} from '../controllers/testResultControllers';

//Define router
const testResultRouter = Router();

//Routes
testResultRouter.post('/', userOrAdminAuth, createTestResult);

testResultRouter.get('/:uid', userOrAdminAuth, getAllTestResultsByUserId);

testResultRouter.delete('/:id', userOrAdminAuth, deleteTestResult);

//Export router
export default testResultRouter;
