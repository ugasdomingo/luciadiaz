import { Util } from "../models/Util-model.js";
import { User } from "../models/User-model.js";
import { client_response } from "../utils/responses.js";

export const create_util = async (req, res, next) => {
    try {
        await Util.create({
            last_histoty_number: 1000
        });
        return client_response(res, 201, 'Util creado correctamente');
    } catch (error) {
        next(error);
    }
}

export const active_anamnesis_kids = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        await User.findByIdAndUpdate(user_id, {
            anamnesis_kids: true
        });
        return client_response(res, 201, 'AnamnesisKids activado correctamente');
    } catch (error) {
        next(error);
    }
}