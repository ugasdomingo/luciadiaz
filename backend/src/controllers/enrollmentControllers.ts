//Import tools
import { Request, Response } from 'express';
import { IRequest } from '../interfaces/IRequest';
import { Enrollment, IEnrollment } from '../models/Enrollment';

// Create --> Line 14
// getAllEnrollments --> Line 76
// getEnrollmentById --> Line 93
// Update --> Line 118

//Create
export const createEnrollment = async (req: Request, res: Response) => {
    const { formation_id, uid, status } = req.body;

    try {
        //Create post
        const enrollment: IEnrollment = new Enrollment({
            formation_id,
            uid,
            status,
        });

        await enrollment.save();

        res.status(201).json({
            msg: 'Enrollment created',
            enrollment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error',
        });
    }
};

//getAllEnrollments
export const getAllEnrollments = async (req: Request, res: Response) => {
    try {
        const enrollments = await Enrollment.find();

        res.status(200).json({
            msg: 'All enrollments',
            enrollments,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error',
        });
    }
};

//getEnrollmentById
export const getEnrollmentById = async (req: IRequest, res: Response) => {
    const { id } = req.params;

    try {
        const enrollment = await Enrollment.findById(id);

        if (!enrollment) {
            return res.status(404).json({
                msg: 'Enrollment not found',
            });
        }

        res.status(200).json({
            msg: 'Enrollment encontrado',
            enrollment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error',
        });
    }
};

//Update
export const updateEnrollment = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const enrollment: IEnrollment | null =
            await Enrollment.findByIdAndUpdate(id, req.body, {
                new: true,
            });

        if (!enrollment) {
            return res.status(404).json({
                msg: 'Enrollment not found',
            });
        }

        res.status(200).json({
            msg: 'Enrollment updated',
            enrollment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error',
        });
    }
};
