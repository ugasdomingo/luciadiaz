import { Util } from "../models/Util-model.js";
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