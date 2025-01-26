//Import tools
import { Router } from 'express';
import { admin_auth } from '../middlewares/admin-auth';
import { user_auth } from '../middlewares/user-auth';
import {
    get_all_medical_data_by_user,
    get_all_medical_data_by_admin,
} from '../controllers/medical-data-controllers';

//Create the router
const medical_data_router = Router();

//Routes
medical_data_router.get('/user', user_auth, get_all_medical_data_by_user);

medical_data_router.get('/user/:id', admin_auth, get_all_medical_data_by_admin);

//Export the router
export default medical_data_router;
