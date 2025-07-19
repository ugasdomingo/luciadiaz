import { Router } from "express";
import { login, register, forgot_password, reset_password, change_password, logout, verify_email, verify_login, refresh } from "../controllers/auth-controller.js";
import { user_auth } from "../middlewares/user_auth.js";
import { auth_data_validation } from "../middlewares/data-validation.js";

const auth_router = Router();

auth_router.post('/login', auth_data_validation, login);
auth_router.post('/register', auth_data_validation, register);
auth_router.post('/verify-email', verify_email);
auth_router.post('/verify-login', verify_login);
auth_router.post('/refresh', refresh);
auth_router.post('/forgot-password', forgot_password);
auth_router.post('/reset-password', auth_data_validation, reset_password);
auth_router.post('/change-password', user_auth, change_password);
auth_router.post('/logout', user_auth, logout);

export default auth_router;
