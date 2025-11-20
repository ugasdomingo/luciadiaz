import { Router } from "express";
import { admin_auth } from "../middlewares/user_auth.js";
import {
    add_module,
    update_module,
    delete_module,
    add_lesson,
    update_lesson,
    delete_lesson,
    add_downloadable,
    delete_downloadable
} from "../controllers/curriculum-controller.js";

const curriculum_router = Router();

// Rutas de módulos
curriculum_router.post('/module/:formation_id', admin_auth, add_module);
curriculum_router.put('/module/:formation_id/:module_number', admin_auth, update_module);
curriculum_router.delete('/module/:formation_id/:module_number', admin_auth, delete_module);

// Rutas de lecciones
curriculum_router.post('/lesson/:formation_id/:module_number', admin_auth, add_lesson);
curriculum_router.put('/lesson/:formation_id/:module_number/:lesson_number', admin_auth, update_lesson);
curriculum_router.delete('/lesson/:formation_id/:module_number/:lesson_number', admin_auth, delete_lesson);

// Rutas de descargables
curriculum_router.post('/downloadable/:formation_id', admin_auth, add_downloadable);
curriculum_router.delete('/downloadable/:formation_id/:downloadable_id', admin_auth, delete_downloadable);

export default curriculum_router;