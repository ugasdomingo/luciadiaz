import { Router } from "express";
import { create_util, active_anamnesis_kids } from "../controllers/util-controller.js";
import { admin_auth } from "../middlewares/user_auth.js";

const util_router = Router();

util_router.post('/create_util', admin_auth, create_util);
util_router.post('/active_anamnesis', admin_auth, active_anamnesis_kids);

export default util_router;
