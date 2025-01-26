//Import tools
import { Router } from 'express';
import { admin_auth } from '../middlewares/admin-auth';
import { user_auth } from '../middlewares/user-auth';
import {
    create_patient_history,
    user_get_patient_history,
    admin_get_patient_history,
} from '../controllers/patient-history-controllers';

//Create the router
const patient_history_router = Router();

//Routes
patient_history_router.post('/', user_auth, create_patient_history);

patient_history_router.get('/user', user_auth, user_get_patient_history);

patient_history_router.get('/admin', admin_auth, admin_get_patient_history);

//Export the router
export default patient_history_router;
