import { Router } from "express";
import { home_data } from "../controllers/common-controller.js";

const common_router = Router();

common_router.get('/home', home_data);

export default common_router;

