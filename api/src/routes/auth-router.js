import { Router } from "express";
import { login, register, forgot_password, reset_password, change_password, logout, verify_email, verify_login, refresh } from "../controllers/auth-controller.js";
import { user_auth } from "../middlewares/user_auth.js";

const auth_router = Router();

auth_router.post('/login', login);
auth_router.post('/register', register);
auth_router.post('/verify_email', verify_email);
auth_router.post('/verify_login', verify_login);
auth_router.post('/refresh', refresh);
auth_router.post('/forgot_password', forgot_password);
auth_router.post('/reset_password', reset_password);
auth_router.post('/change_password', user_auth, change_password);
auth_router.post('/logout', user_auth, logout);

export default auth_router;
