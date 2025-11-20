import { Router } from "express";
import { user_auth } from "../middlewares/user_auth.js";
import {
    get_user_progress,
    register_access,
    update_video_progress,
    register_download,
} from "../controllers/progress-controller.js";

const progress_router = Router();

// Obtener progreso del usuario en una formación
progress_router.get('/:formation_id', user_auth, get_user_progress);

// Registrar acceso al dashboard del curso
progress_router.post('/access/:formation_id', user_auth, register_access);

// Actualizar progreso de video
progress_router.put('/video/:formation_id', user_auth, update_video_progress);

// Registrar descarga
progress_router.post('/download/:formation_id', user_auth, register_download);

export default progress_router;