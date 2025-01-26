//Import tools
import { Router } from 'express';
import { admin_auth } from '../middlewares/admin-auth';
import { user_auth } from '../middlewares/user-auth';
import {
    create_test_result,
    user_get_test_results,
    admin_get_test_results,
} from '../controllers/test-result-controllers';

//Create the router
const test_result_router = Router();

//Routes
test_result_router.post('/', user_auth, create_test_result);

test_result_router.get('/user', user_auth, user_get_test_results);

test_result_router.get('/admin', admin_auth, admin_get_test_results);

//Export the router
export default test_result_router;
