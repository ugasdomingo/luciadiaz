import { Router } from "express";
import { create_util } from "../controllers/util-controller.js";
import  { admin_auth } from "../middlewares/user_auth.js";

const util_router = Router();

util_router.post('/create_util', admin_auth, create_util);

export default util_router;
