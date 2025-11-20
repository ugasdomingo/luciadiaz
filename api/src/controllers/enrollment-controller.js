import { Enrollment } from "../models/Enrollment-model.js";
import { Access_key } from "../models/Access-key-Model.js";
import { Formation } from "../models/Formation-model.js";
import { Progress } from "../models/Formation-progress.js";
import { client_response } from "../utils/responses.js";
import fs from 'fs-extra';
import { upload_offline_payment, delete_image } from "../utils/cloudinary.js";

// Validar clave de acceso
export const validate_access = async (req, res, next) => {
    try {
        const { formation_id, access_key } = req.body;

        // Buscar la clave
        const key = await Access_key.findOne({
            key: access_key,
            formation_id,
            used: false
        });

        if (!key) {
            return client_response(res, 400, 'Clave inválida o ya utilizada');
        }

        // Verificar si la clave expiró
        if (new Date() > key.expires_at) {
            return client_response(res, 400, 'Clave expirada');
        }

        return client_response(res, 200, 'Clave válida', { valid: true });
    } catch (error) {
        next(error);
    }
};

// Crear enrollment (usuario ya autenticado por middleware)
export const create_enrollment = async (req, res, next) => {
    try {
        const { formation_id, payment_method, access_key } = req.body;
        const user_id = req.user_id; // Viene del middleware user_auth

        // Buscar formación
        const formation = await Formation.findById(formation_id);
        if (!formation) {
            const error = new Error('Formación no encontrada');
            error.status = 404;
            throw error;
        }

        // Verificar que el usuario no esté ya inscrito
        const existing_enrollment = await Enrollment.findOne({ user_id, formation_id });
        if (existing_enrollment) {
            const error = new Error('Ya estás inscrito en esta formación');
            error.status = 400;
            throw error;
        }

        let final_payment_method = payment_method;
        let payment_status = 'completed';
        let key_used = null;

        // Determinar método de pago y validar si es necesario
        if (formation.price === 0) {
            // Formación gratuita
            final_payment_method = 'gratuito';
        } else if (payment_method === 'paypal') {
            // PayPal ya validado por el frontend con success_payment
            payment_status = 'completed';
        } else {
            // Bizum o Efectivo - Validar clave de acceso
            if (!access_key) {
                const error = new Error('Se requiere clave de acceso para este método de pago');
                error.status = 400;
                throw error;
            }

            const key = await Access_key.findOne({
                key: access_key,
                formation_id,
                used: false
            });

            if (!key) {
                const error = new Error('Clave inválida o ya utilizada');
                error.status = 400;
                throw error;
            }

            if (new Date() > key.expires_at) {
                const error = new Error('Clave expirada');
                error.status = 400;
                throw error;
            }

            // Marcar clave como usada
            key.used = true;
            key.used_by = user_id;
            await key.save();

            key_used = access_key;
        }

        // Crear enrollment
        const enrollment = new Enrollment({
            user_id,
            formation_id,
            payment_method: final_payment_method,
            payment_status,
            access_key_used: key_used
        });

        await enrollment.save();

        // Agregar usuario a la formación
        formation.users_enrolled.push(user_id);
        await formation.save();

        const progress = new Progress({
            enrollment_id: enrollment._id,
            user_id,
            formation_id,
            access_log: [
                {
                    accessed_at: new Date()
                }
            ],
            lessons_progress: [], // Se llena cuando el usuario empieza a ver contenido
            overall_progress_percentage: 0,
            last_accessed: new Date()
        });

        await progress.save();

        return client_response(res, 201, 'Inscripción completada con éxito');
    } catch (error) {
        next(error);
    }
};

export const add_payment_proof = async (req, res, next) => {
    try {
        const { enrollment_id } = req.params;
        const enrollment = await Enrollment.findById(enrollment_id);
        if (!enrollment) {
            const error = new Error('Enrollment not found');
            error.status = 404;
            throw error;
        }
        if (enrollment.payment_proof) {
            const error = new Error('Payment proof already added');
            error.status = 400;
            throw error;
        }
        const result = await upload_offline_payment(req.file.payment_proof);
        enrollment.payment_proof = {
            public_id: result.public_id,
            secure_url: result.secure_url,
        };
        await fs.remove(req.file.payment_proof.tempFilePath);
        await enrollment.save();
        return client_response(res, 200, 'Payment proof added successfully');
    } catch (error) {
        next(error);
    }
}

export const approve_payment = async (req, res, next) => {
    try {
        const { enrollment_id } = req.params;
        const enrollment = await Enrollment.findById(enrollment_id);
        if (!enrollment) {
            const error = new Error('Enrollment not found');
            error.status = 404;
            throw error;
        }
        enrollment.payment_status = 'completed';
        await enrollment.save();
        return client_response(res, 200, 'Payment approved successfully');
    } catch (error) {
        next(error);
    }
}

export const get_all_enrollments = async (req, res, next) => {
    try {
        const enrollments = await Enrollment.find()
            .populate('user_id', 'name email')
            .populate('formation_id', 'title')
            .lean();
        return client_response(res, 200, 'OK', enrollments);
    } catch (error) {
        next(error);
    }
}

export const get_enrollment_by_id = async (req, res, next) => {
    try {
        const { enrollment_id } = req.params;
        const enrollment = await Enrollment.findById(enrollment_id).lean();
        if (!enrollment) {
            const error = new Error('Enrollment not found');
            error.status = 404;
            throw error;
        }
        return client_response(res, 200, 'OK', enrollment);
    } catch (error) {
        next(error);
    }
}

// Obtener claves de una formación (solo admin)
export const get_formation_keys = async (req, res, next) => {
    try {
        const { formation_id } = req.params;

        const keys = await Access_key.find({ formation_id })
            .populate('used_by', 'name email')
            .sort({ createdAt: -1 })
            .lean();

        return client_response(res, 200, 'OK', keys);
    } catch (error) {
        next(error);
    }
};