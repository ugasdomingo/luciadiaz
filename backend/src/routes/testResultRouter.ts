//Import tools
import { Router } from 'express';
import { userOrAdminAuth } from '../middlewares/userOrAdminAuth';
import { userAuth } from '../middlewares/userAuth';
import {
    createTestResult,
    getAllTestResultsByUserId,
    getAllOwnTestResults,
    deleteTestResult,
} from '../controllers/testResultControllers';

//Define router
const testResultRouter = Router();

//Routes
testResultRouter.post('/', userOrAdminAuth, createTestResult);

testResultRouter.get('/admin/:uid', userOrAdminAuth, getAllTestResultsByUserId);

testResultRouter.get('/own', userAuth, getAllOwnTestResults);

testResultRouter.delete('/:id', userOrAdminAuth, deleteTestResult);

//Export router
export default testResultRouter;
