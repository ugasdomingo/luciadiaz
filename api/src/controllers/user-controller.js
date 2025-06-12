import { User } from "../models/User-model.js";
import { client_response } from "../utils/responses.js";
import { admin_get_user_data } from "../services/auth-service.js";

//Get all users
export const get_all_users = async (req, res, next) => {
    try {
        const users = await User.find().select('_id name medical_record role').lean();

        return client_response(res, 200, 'OK', users);
    } catch (error) {
        next(error);
    }
}

export const get_user_by_id = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const user = await User.findById(user_id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        // Get all user data
        const user_data = await admin_get_user_data(user._id);

        return client_response(res, 200, 'OK', user_data);
    } catch (error) {
        next(error);
    }
}

export const update_user = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        if (user_id !== req.user_id) {
            throw new Error('No tienes permiso para actualizar este usuario');
        }
        const user = await User.findById(user_id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        await user.save();
        return client_response(res, 200, 'Datos actualizados');
    } catch (error) {
        next(error);
    }
}

export const role_to_patient = async (req, res, next) => {
    try {
        const { user_id } = req.params;
        const user = await User.findById(user_id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        user.role = 'patient';
        await user.save();
        return client_response(res, 200, 'Rol actualizado');
    } catch (error) {
        next(error);
    }
}
