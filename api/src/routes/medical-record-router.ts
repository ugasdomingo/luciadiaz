//Import tools
import { Router } from 'express';
import { admin_auth } from '../middlewares/admin-auth';
import { user_auth } from '../middlewares/user-auth';
import {
    get_all_medical_records,
    get_medical_record_by_user,
    get_medical_record_by_medical_record,
} from '../controllers/medical-record-controllers';

//Create the router
const medical_record_router = Router();

//Routes
medical_record_router.get('/', admin_auth, get_all_medical_records);

medical_record_router.get('/user', user_auth, get_medical_record_by_user);

medical_record_router.get(
    '/:medical_record',
    admin_auth,
    get_medical_record_by_medical_record
);

//Export the router
export default medical_record_router;
