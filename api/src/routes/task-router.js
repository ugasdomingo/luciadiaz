import { Router } from "express";
import { create_task, delete_task, update_task, complete_task } from "../controllers/task-controller.js";
import { user_auth, admin_auth } from "../middlewares/user_auth.js";

const task_router = Router();   

task_router.post('/', admin_auth, create_task);
task_router.put('/:task_id', admin_auth, update_task);
task_router.delete('/:task_id', admin_auth, delete_task);
task_router.put('/complete/:task_id', user_auth, complete_task);

export default task_router;