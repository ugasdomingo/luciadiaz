import { Router } from "express";
import { create_test_result, get_all_test_results } from "../controllers/test-result-controller.js";
import { user_auth, admin_auth } from "../middlewares/user_auth.js";

const test_result_router = Router();

test_result_router.get('/', admin_auth, get_all_test_results);
test_result_router.post('/', user_auth, create_test_result);

export default test_result_router;

