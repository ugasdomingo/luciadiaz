import { Patient_history } from "../models/Patient-history-model.js";
import { client_response } from "../utils/responses.js";
import { encrypt, decrypt } from "../utils/encrypt.js";

export const create_history = async (req, res, next) => {
    try {
        const { form_title, answers } = req.body;
        const user_id = req.user_id;
        //Validate if user did the test before
        const history_before = await Patient_history.findOne({ user_id, form_title });
        if (history_before) {
            throw new Error('Ya has completado esta parte del historial, por favor contáctame');
        }
        const encrypted_answers = encrypt(answers);
        const history = new Patient_history({ user_id, form_title, answers: encrypted_answers });
        await history.save();
        return client_response(res, 201, 'Historial guardado correctamente');
    } catch (error) {
        next(error);
    }
}

export const get_all_history = async (req, res, next) => {
    try {
        const history = await Patient_history.find().populate('user_id').sort({ createdAt: -1 }).lean();

        history.forEach((history) => {
            history.answers = decrypt(history.answers);
        });

        return client_response(res, 200, 'OK', history);
    } catch (error) {
        next(error);
    }
}

export const update_history = async (req, res, next) => {
    try {
        const { history_id } = req.params;
        const { form_title, answers } = req.body;
        const user_id = req.user_id;
        const history = await Patient_history.findById(history_id);
        if (!history) {
            throw new Error('Historial no encontrado');
        }
        if (history.user_id.toString() !== user_id) {
            throw new Error('No tienes permiso para actualizar este historial');
        }
        const encrypted_answers = encrypt(answers);
        history.form_title = form_title;
        history.answers = encrypted_answers;
        await history.save();
        return client_response(res, 200, 'Historial actualizado correctamente');
    } catch (error) {
        next(error);
    }
}
