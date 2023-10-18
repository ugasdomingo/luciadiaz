//Import tools
import { Request, Response } from 'express';
import { Formation, IFormation } from '../models/Formation';
import { ICover } from '../interfaces/ICover';
import fs from 'fs-extra';
import { uploadImage, deleteImage } from '../utils/cloudinary';

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
        const formation: IFormation = new Formation({
            title,
            description,
            type,
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

        if (req.files) {
            const cover = req.files.cover as ICover;

            const result = await uploadImage(cover.tempFilePath as string);
            formation.cover = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };

            fs.unlink(cover.tempFilePath, (err) => {
                if (err) throw err;
            });
        }

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
        const formations = await Formation.find();

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
        const formation: IFormation | null = await Formation.findById(id);

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
export const updateFormation = async (req: any, res: Response) => {
    const { id } = req.params;
    const {
        title,
        description,
        type,
        price,
        duration,
        location,
        category,
        tags,
        initialDate,
        paypalButton,
        videoUrl,
    } = req.body;

    try {
        const formation: IFormation | null = await Formation.findById(id);

        if (!formation) {
            return res.status(404).json({
                msg: 'Formación no encontrada',
            });
        }

        if (req.files) {
            if (formation.cover) {
                await deleteImage(formation.cover);
            }

            const cover = req.files.cover as ICover;
            const result = await uploadImage(cover.tempFilePath as string);
            formation.cover = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };

            fs.unlink(cover.tempFilePath, (err) => {
                if (err) throw err;
            });
        }

        formation.title = title || formation.title;
        formation.description = description || formation.description;
        formation.type = type || formation.type;
        formation.price = price || formation.price;
        formation.duration = duration || formation.duration;
        formation.location = location || formation.location;
        formation.category = category || formation.category;
        formation.tags = tags || formation.tags;
        formation.initialDate = initialDate || formation.initialDate;
        formation.paypalButton = paypalButton || formation.paypalButton;
        formation.videoUrl = videoUrl || formation.videoUrl;

        await formation.save();

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
        const formation: IFormation | null = await Formation.findByIdAndDelete(
            id
        );

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
