//Import tools
import { Request, Response } from 'express';
import { Formations, IFormations } from '../models/Formation';
import { deleteImage } from '../utils/cloudinary';

// Create --> Line 14
// getAllFormations --> Line 76
// getFormationById --> Line 93
// Update --> Line 118
// Delete --> Line 149

//Create
export const createFormation = async (req: any, res: Response) => {
    const {
        title,
        description,
        type,
        cover,
        price,
        duration,
        location,
        category,
        tags,
        initialDate,
        paypalButton,
        videoUrl,
        author,
    } = req.body;

    try {
        //Create post
        const formation: IFormations = new Formations({
            title,
            description,
            type,
            cover,
            price,
            duration,
            location,
            category,
            tags,
            initialDate,
            paypalButton,
            videoUrl,
            author,
        });

        await formation.save();

        return res.status(201).json({
            msg: 'Formación creada',
            formation,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error creating formation',
        });
    }
};

//Get all formations
export const getAllFormations = async (req: Request, res: Response) => {
    try {
        const formations = await Formations.find();

        return res.status(200).json({
            msg: 'Formaciones obtenidas',
            formations,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al obtener las formaciones',
        });
    }
};

//Get formation by id
export const getFormationById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const formation: IFormations | null = await Formations.findById(id);

        if (!formation) {
            return res.status(404).json({
                msg: 'Formación no encontrada',
            });
        }

        return res.status(200).json({
            msg: 'Formación obtenida',
            formation,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al obtener la formación',
        });
    }
};

//Update
export const updateFormation = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const formation: IFormations | null =
            await Formations.findByIdAndUpdate(id, req.body);

        if (!formation) {
            return res.status(404).json({
                msg: 'Formación no encontrada',
            });
        }

        return res.status(200).json({
            msg: 'Formación actualizada',
            formation,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al actualizar la formación',
        });
    }
};

//Delete
export const deleteFormation = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const formation: IFormations | null =
            await Formations.findByIdAndDelete(id);

        if (!formation) {
            return res.status(404).json({
                msg: 'Formación no encontrada',
            });
        }

        if (formation.cover) {
            await deleteImage(formation.cover);
        }

        return res.status(200).json({
            msg: 'Formación eliminada',
            formation,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al eliminar la formación',
        });
    }
};
