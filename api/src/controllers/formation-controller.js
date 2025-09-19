import { Formation } from "../models/Formation-model.js";
import { client_response } from "../utils/responses.js";
import { upload_formation_cover, delete_image } from "../utils/cloudinary.js";
import fs from 'fs-extra';

export const get_all_formations = async (req, res, next) => {
    try {
        const { display } = req.params;

        if (display === '0') {
            const formations = await Formation.find({ status: 'active' }).lean();
            return client_response(res, 200, 'OK', formations);
        }
        const formations = await Formation.find({ status: 'active' }).limit(Number(display)).lean();

        return client_response(res, 200, 'OK', formations);
    } catch (error) {
        next(error);
    }
}

export const get_all_formations_admin = async (req, res, next) => {
    try {
        const formations = await Formation.find().lean();
        return client_response(res, 200, 'OK', formations);
    } catch (error) {
        next(error);
    }
}

export const get_formation_by_slug = async (req, res, next) => {
    try {
        const { formation_slug } = req.params;
        const formation = await Formation.findOne({ slug: formation_slug }).lean();
        if (!formation) {
            throw new Error('Formación no encontrada');
        }
        return client_response(res, 200, 'OK', formation);
    } catch (error) {
        next(error);
    }
}

export const create_formation = async (req, res, next) => {
    try {
        const { title, slug, content, description, duration, location, price, start_date, categorys, type, video_url = '', paypal_button = '', status = 'inactive' } = req.body;

        if (await Formation.findOne({ slug })) {
            throw new Error('Formación ya existe');
        }
        const formation = new Formation({ title, slug, content, description, duration, location, price, start_date, categorys, type, video_url, paypal_button, status });

        if (req.files?.formation_cover) {
            const result = await upload_formation_cover(req.files.formation_cover);
            formation.formation_cover = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };
            await fs.remove(req.files.formation_cover.tempFilePath);
        }
        await formation.save();
        return client_response(res, 201, 'Formación creada correctamente');
    } catch (error) {
        next(error);
    }
}

export const update_formation = async (req, res, next) => {
    try {
        const { formation_id } = req.params;
        const { title, slug, content, description, duration, location, price, start_date, categorys, type, video_url, paypal_button, status } = req.body;
        const formation = await Formation.findById(formation_id);
        if (!formation) {
            throw new Error('Formación no encontrada');
        }
        formation.title = title || formation.title;
        formation.slug = slug || formation.slug;
        formation.content = content || formation.content;
        formation.description = description || formation.description;
        formation.duration = duration || formation.duration;
        formation.location = location || formation.location;
        formation.price = price || formation.price;
        formation.start_date = start_date || formation.start_date;
        formation.categorys = categorys || formation.categorys;
        formation.type = type || formation.type;
        formation.video_url = video_url || formation.video_url;
        formation.paypal_button = paypal_button || formation.paypal_button;
        formation.status = status || formation.status;

        if (req.files?.formation_cover) {
            await delete_image(formation.formation_cover.public_id);
            const result = await upload_formation_cover(req.files.formation_cover);
            formation.formation_cover = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };
            await fs.remove(req.files.formation_cover.tempFilePath);
        }
        await formation.save();
        return client_response(res, 200, 'Formación actualizada correctamente');
    } catch (error) {
        next(error);
    }
}

export const delete_formation = async (req, res, next) => {
    try {
        const { formation_id } = req.params;
        const formation = await Formation.findByIdAndDelete(formation_id);
        if (!formation) {
            throw new Error('Formación no encontrada');
        }
        await delete_image(formation.formation_cover.public_id);
        return client_response(res, 200, 'Formación eliminada correctamente');
    } catch (error) {
        next(error);
    }
}

