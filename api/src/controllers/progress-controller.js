import { Progress } from "../models/Formation-progress.js";
import { Formation } from "../models/Formation-model.js";
import { Enrollment } from "../models/Enrollment-model.js";
import { client_response } from "../utils/responses.js";

// ========== OBTENER PROGRESS ==========

export const get_user_progress = async (req, res, next) => {
    try {
        const { formation_id } = req.params;
        const user_id = req.user_id;

        const progress = await Progress.findOne({
            user_id,
            formation_id
        })
            .populate('formation_id', 'title slug type curriculum downloadables formation_cover')
            .lean();

        if (!progress) {
            const error = new Error('No se encontró progreso para esta formación');
            error.status = 404;
            throw error;
        }

        return client_response(res, 200, 'OK', progress);
    } catch (error) {
        next(error);
    }
};

// ========== REGISTRAR ACCESO AL DASHBOARD DEL CURSO ==========

export const register_access = async (req, res, next) => {
    try {
        const { formation_id } = req.params;
        const user_id = req.user_id;

        const progress = await Progress.findOne({ user_id, formation_id });

        if (!progress) {
            const error = new Error('No se encontró progreso para esta formación');
            error.status = 404;
            throw error;
        }

        // Agregar nuevo registro de acceso
        progress.access_log.push({
            accessed_at: new Date()
        });

        // Actualizar last_accessed
        progress.last_accessed = new Date();

        await progress.save();

        return client_response(res, 200, 'Acceso registrado correctamente');
    } catch (error) {
        next(error);
    }
};

// ========== ACTUALIZAR PROGRESO DE VIDEO ==========

export const update_video_progress = async (req, res, next) => {
    try {
        const { formation_id } = req.params;
        const { lesson_id, last_watched_second, video_duration } = req.body;
        const user_id = req.user_id;

        const progress = await Progress.findOne({ user_id, formation_id });

        if (!progress) {
            const error = new Error('No se encontró progreso para esta formación');
            error.status = 404;
            throw error;
        }

        // Buscar si ya existe progreso para esta lección
        let lesson_progress = progress.lessons_progress.find(
            lp => lp.lesson_id === lesson_id
        );

        // Calcular porcentaje visto
        const total_watched_percentage = Math.min(
            Math.round((last_watched_second / video_duration) * 100),
            100
        );

        // Determinar estado basado en porcentaje
        let status = 'not_started';
        if (total_watched_percentage > 0 && total_watched_percentage < 20) {
            status = 'in_progress';
        } else if (total_watched_percentage >= 20 && total_watched_percentage < 90) {
            status = 'almost_done';
        } else if (total_watched_percentage >= 90) {
            status = 'completed';
        }

        if (lesson_progress) {
            // Actualizar progreso existente
            lesson_progress.video_progress.last_watched_second = last_watched_second;
            lesson_progress.video_progress.total_watched_percentage = total_watched_percentage;

            // Solo actualizar estado si es progreso (no retroceder de completed a in_progress)
            const status_priority = {
                'not_started': 0,
                'in_progress': 1,
                'almost_done': 2,
                'completed': 3
            };

            if (status_priority[status] > status_priority[lesson_progress.video_progress.status]) {
                lesson_progress.video_progress.status = status;
            }

            // Si se completa, guardar fecha
            if (status === 'completed' && !lesson_progress.video_progress.completed_at) {
                lesson_progress.video_progress.completed_at = new Date();
            }
        } else {
            // Crear nuevo progreso para esta lección
            progress.lessons_progress.push({
                lesson_id,
                video_progress: {
                    last_watched_second,
                    total_watched_percentage,
                    status,
                    completed_at: status === 'completed' ? new Date() : null
                },
                downloads: []
            });
        }

        // Recalcular progreso general
        await calculate_overall_progress(progress, formation_id);

        await progress.save();

        return client_response(res, 200, 'Progreso actualizado correctamente', {
            lesson_progress: lesson_progress || progress.lessons_progress[progress.lessons_progress.length - 1],
            overall_progress_percentage: progress.overall_progress_percentage
        });
    } catch (error) {
        next(error);
    }
};

// ========== REGISTRAR DESCARGA DE ARCHIVO ==========

export const register_download = async (req, res, next) => {
    try {
        const { formation_id } = req.params;
        const { lesson_id } = req.body; // Puede ser null si es un descargable general
        const user_id = req.user_id;

        const progress = await Progress.findOne({ user_id, formation_id });

        if (!progress) {
            const error = new Error('No se encontró progreso para esta formación');
            error.status = 404;
            throw error;
        }

        // Si es un descargable de una lección específica
        if (lesson_id) {
            let lesson_progress = progress.lessons_progress.find(
                lp => lp.lesson_id === lesson_id
            );

            if (lesson_progress) {
                // Agregar registro de descarga
                lesson_progress.downloads.push({
                    downloaded_at: new Date()
                });
            } else {
                // Crear progreso para esta lección con la descarga
                progress.lessons_progress.push({
                    lesson_id,
                    video_progress: {
                        last_watched_second: 0,
                        total_watched_percentage: 0,
                        status: 'not_started'
                    },
                    downloads: [{
                        downloaded_at: new Date()
                    }]
                });
            }
        }
        // Si es un descargable general, solo lo registramos sin vincularlo a una lección

        await progress.save();

        return client_response(res, 200, 'Descarga registrada correctamente');
    } catch (error) {
        next(error);
    }
};

// ========== HELPER: CALCULAR PROGRESO GENERAL ==========

const calculate_overall_progress = async (progress, formation_id) => {
    try {
        const formation = await Formation.findById(formation_id).lean();

        if (!formation || !formation.curriculum || formation.curriculum.length === 0) {
            progress.overall_progress_percentage = 0;
            return;
        }

        // Contar total de lecciones
        let total_lessons = 0;
        formation.curriculum.forEach(module => {
            total_lessons += module.lessons.length;
        });

        if (total_lessons === 0) {
            progress.overall_progress_percentage = 0;
            return;
        }

        // Contar lecciones completadas
        const completed_lessons = progress.lessons_progress.filter(
            lp => lp.video_progress.status === 'completed'
        ).length;

        // Calcular porcentaje
        progress.overall_progress_percentage = Math.round(
            (completed_lessons / total_lessons) * 100
        );

        // Si completa el 100%, marcar fecha de completado
        if (progress.overall_progress_percentage === 100 && !progress.completed_at) {
            progress.completed_at = new Date();
        }

    } catch (error) {
        progress.overall_progress_percentage = 0;
        next(error);
    }
};