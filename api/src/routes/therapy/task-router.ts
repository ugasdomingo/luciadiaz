//Import tools
import { Router } from 'express';
import { admin_auth } from '../../middlewares/admin-auth';
import { user_auth } from '../../middlewares/user-auth';
import {
    create_task,
    update_task_status,
    edit_task,
} from '../../controllers/therapy/task-controllers';

//Create the router
const task_router = Router();

//Routes
task_router.post('/', admin_auth, create_task);

task_router.put('/status', user_auth, update_task_status);

task_router.put('/edit', admin_auth, edit_task);

//Export the router
export default task_router;
