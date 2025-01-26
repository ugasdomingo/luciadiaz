//Import tools
import {
    Formation_model,
    IFormation,
} from '../../models/formation/FormationModel';
import { client_response, internal_response } from '../../utils/responses';
import { upload_formation_cover } from '../../utils/cloudinary';
import { add_liked_formation_id } from '../medical-record-controllers';
import fs from 'fs-extra';

//Create a new formation
export const create_formation = async (req: any, res: any) => {
    try {
        const new_formation: IFormation = new Formation_model(req.body);

        if (req.files?.cover_image) {
            const cover_image = await upload_formation_cover(
                req.files.cover_image
            );
            new_formation.cover_image = {
                public_id: cover_image.public_id,
                secure_url: cover_image.secure_url,
            };

            await fs.unlink(req.files.cover_image.tempFilePath);
        }

        //Save the formation
        await new_formation.save();

        return client_response(res, 201, 'Formación agregada correctamente');
    } catch (error) {
        internal_response('Error while creating the formation', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get all the formations
export const get_formations = async (req: any, res: any) => {
    try {
        const formations = await Formation_model.find();

        return client_response(res, 200, 'Correcto', formations);
    } catch (error) {
        internal_response('Error while getting the formations', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get a single formation
export const get_formation = async (req: any, res: any) => {
    try {
        const formation = await Formation_model.findById(req.params.id);

        return client_response(res, 200, 'Correcto', formation);
    } catch (error) {
        internal_response('Error while getting the formation', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Update a formation
export const update_formation = async (req: any, res: any) => {
    try {
        const formation: IFormation | null = await Formation_model.findById(
            req.params.id
        );

        if (!formation) {
            return client_response(res, 404, 'Formación no encontrada');
        }

        if (req.files?.cover_image) {
            const cover_image = await upload_formation_cover(
                req.files.cover_image
            );
            formation.cover_image = {
                public_id: cover_image.public_id,
                secure_url: cover_image.secure_url,
            };

            await fs.unlink(req.files.cover_image.tempFilePath);
        }

        await formation.updateOne(req.body);

        return client_response(res, 200, 'Formación actualizada correctamente');
    } catch (error) {
        internal_response('Error while updating the formation', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Add like to a formation
export const add_like = async (req: any, res: any) => {
    try {
        const { medical_record } = req.body;

        const formation: IFormation | null = await Formation_model.findById(
            req.params.id
        );

        if (!formation) {
            return client_response(res, 404, 'Formación no encontrada');
        }

        await add_liked_formation_id(medical_record, formation._id);

        formation.likes += 1;
        await formation.save();

        return client_response(
            res,
            200,
            'Me alegro que te haya gustado la formación'
        );
    } catch (error) {
        internal_response('Error while adding the like', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};
