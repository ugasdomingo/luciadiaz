//Import tools
import { Router } from 'express';
import { data_auth_validation } from '../middlewares/data-auth-vaidation';
import { admin_auth } from '../middlewares/admin-auth';
import { user_auth } from '../middlewares/user-auth';
import {
    register_user,
    access_user,
    refresh_token,
    logout_user,
    confirm_email,
    get_data_by_user,
    get_data_by_admin,
    get_all_users,
} from '../controllers/user-controllers';

//Create the router
const auth_router = Router();

//Routes
auth_router.post('/registro', data_auth_validation, register_user);

auth_router.post('/acceder', data_auth_validation, access_user);

auth_router.post('/refresh', refresh_token);

auth_router.post('/logout', logout_user);

auth_router.get('/confirmar-correo/:uid', confirm_email);

auth_router.get('/user', user_auth, get_data_by_user);

auth_router.get('/user/:id', admin_auth, get_data_by_admin);

auth_router.get('/users', admin_auth, get_all_users);

//Export the router
export default auth_router;
