import { Formation } from "../models/Formation-model.js";
import { client_response } from "../utils/responses.js";

// ========== GESTIÓN DE MÓDULOS ==========

export const add_module = async (req, res, next) => {
    try {
        const { formation_id } = req.params;
        const { module_number, module_title } = req.body;

        const formation = await Formation.findById(formation_id);
        if (!formation) {
            throw new Error('Formación no encontrada');
        }

        // Verificar que el número de módulo no exista ya
        const module_exists = formation.curriculum.some(
            module => module.module_number === module_number
        );

        if (module_exists) {
            throw new Error('Ya existe un módulo con ese número');
        }

        // Agregar el nuevo módulo
        formation.curriculum.push({
            module_number,
            module_title,
            lessons: []
        });

        // Ordenar módulos por número
        formation.curriculum.sort((a, b) => a.module_number - b.module_number);

        await formation.save();

        return client_response(res, 201, 'Módulo agregado correctamente', formation.curriculum);
    } catch (error) {
        next(error);
    }
};

export const update_module = async (req, res, next) => {
    try {
        const { formation_id, module_number } = req.params;
        const { new_module_title } = req.body;

        const formation = await Formation.findById(formation_id);
        if (!formation) {
            throw new Error('Formación no encontrada');
        }

        // Buscar el módulo
        const module = formation.curriculum.find(
            m => m.module_number === parseInt(module_number)
        );

        if (!module) {
            throw new Error('Módulo no encontrado');
        }

        // Actualizar título
        module.module_title = new_module_title;

        await formation.save();

        return client_response(res, 200, 'Módulo actualizado correctamente', formation.curriculum);
    } catch (error) {
        next(error);
    }
};

export const delete_module = async (req, res, next) => {
    try {
        const { formation_id, module_number } = req.params;

        const formation = await Formation.findById(formation_id);
        if (!formation) {
            throw new Error('Formación no encontrada');
        }

        // Filtrar para eliminar el módulo
        formation.curriculum = formation.curriculum.filter(
            m => m.module_number !== parseInt(module_number)
        );

        await formation.save();

        return client_response(res, 200, 'Módulo eliminado correctamente', formation.curriculum);
    } catch (error) {
        next(error);
    }
};

// ========== GESTIÓN DE LECCIONES ==========

export const add_lesson = async (req, res, next) => {
    try {
        const { formation_id, module_number } = req.params;
        const {
            lesson_number,
            lesson_title,
            lesson_description,
            lesson_type,
            is_free_preview
        } = req.body;

        const formation = await Formation.findById(formation_id);
        if (!formation) {
            throw new Error('Formación no encontrada');
        }

        // Buscar el módulo
        const module = formation.curriculum.find(
            m => m.module_number === parseInt(module_number)
        );

        if (!module) {
            throw new Error('Módulo no encontrado');
        }

        // Verificar que el número de lección no exista ya en este módulo
        const lesson_exists = module.lessons.some(
            lesson => lesson.lesson_number === lesson_number
        );

        if (lesson_exists) {
            throw new Error('Ya existe una lección con ese número en este módulo');
        }

        // Agregar la nueva lección
        module.lessons.push({
            lesson_number,
            lesson_title,
            lesson_description: lesson_description || '',
            lesson_type: lesson_type || 'video',
            is_free_preview: is_free_preview || false,
            video_data: {} // Vacío por ahora, se llenará cuando se agreguen videos
        });

        // Ordenar lecciones por número
        module.lessons.sort((a, b) => a.lesson_number - b.lesson_number);

        await formation.save();

        return client_response(res, 201, 'Lección agregada correctamente', formation.curriculum);
    } catch (error) {
        next(error);
    }
};

export const update_lesson = async (req, res, next) => {
    try {
        const { formation_id, module_number, lesson_number } = req.params;
        const {
            lesson_title,
            lesson_description,
            lesson_type,
            is_free_preview,
            video_data // Para agregar/actualizar datos de Bunny.net
        } = req.body;

        const formation = await Formation.findById(formation_id);
        if (!formation) {
            throw new Error('Formación no encontrada');
        }

        // Buscar el módulo
        const module = formation.curriculum.find(
            m => m.module_number === parseInt(module_number)
        );

        if (!module) {
            throw new Error('Módulo no encontrado');
        }

        // Buscar la lección
        const lesson = module.lessons.find(
            l => l.lesson_number === parseInt(lesson_number)
        );

        if (!lesson) {
            throw new Error('Lección no encontrada');
        }

        // Actualizar campos (solo los que vienen en el body)
        if (lesson_title !== undefined) lesson.lesson_title = lesson_title;
        if (lesson_description !== undefined) lesson.lesson_description = lesson_description;
        if (lesson_type !== undefined) lesson.lesson_type = lesson_type;
        if (is_free_preview !== undefined) lesson.is_free_preview = is_free_preview;

        // Actualizar video_data si viene
        if (video_data !== undefined) {
            lesson.video_data = {
                bunny_video_id: video_data.bunny_video_id || lesson.video_data.bunny_video_id,
                bunny_stream_url: video_data.bunny_stream_url || lesson.video_data.bunny_stream_url,
                duration_seconds: video_data.duration_seconds || lesson.video_data.duration_seconds,
                thumbnail_url: video_data.thumbnail_url || lesson.video_data.thumbnail_url,
            };
        }

        await formation.save();

        return client_response(res, 200, 'Lección actualizada correctamente', formation.curriculum);
    } catch (error) {
        next(error);
    }
};

export const delete_lesson = async (req, res, next) => {
    try {
        const { formation_id, module_number, lesson_number } = req.params;

        const formation = await Formation.findById(formation_id);
        if (!formation) {
            throw new Error('Formación no encontrada');
        }

        // Buscar el módulo
        const module = formation.curriculum.find(
            m => m.module_number === parseInt(module_number)
        );

        if (!module) {
            throw new Error('Módulo no encontrado');
        }

        // Filtrar para eliminar la lección
        module.lessons = module.lessons.filter(
            l => l.lesson_number !== parseInt(lesson_number)
        );

        await formation.save();

        return client_response(res, 200, 'Lección eliminada correctamente', formation.curriculum);
    } catch (error) {
        next(error);
    }
};

// ========== GESTIÓN DE DESCARGABLES GENERALES ==========

export const add_downloadable = async (req, res, next) => {
    try {
        const { formation_id } = req.params;
        const { file_name, file_description, file_url, file_size, file_type } = req.body;

        const formation = await Formation.findById(formation_id);
        if (!formation) {
            throw new Error('Formación no encontrada');
        }

        // Agregar el descargable
        formation.downloadables.push({
            file_name,
            file_description: file_description || '',
            file_url,
            file_size: file_size || '',
            file_type: file_type || 'pdf'
        });

        await formation.save();

        return client_response(res, 201, 'Descargable agregado correctamente', formation.downloadables);
    } catch (error) {
        next(error);
    }
};

export const delete_downloadable = async (req, res, next) => {
    try {
        const { formation_id, downloadable_id } = req.params;

        const formation = await Formation.findById(formation_id);
        if (!formation) {
            throw new Error('Formación no encontrada');
        }

        // Filtrar para eliminar el descargable
        formation.downloadables = formation.downloadables.filter(
            d => d._id.toString() !== downloadable_id
        );

        await formation.save();

        return client_response(res, 200, 'Descargable eliminado correctamente', formation.downloadables);
    } catch (error) {
        next(error);
    }
};