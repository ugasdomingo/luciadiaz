import { Enrollment } from "../models/Enrollment-model.js";
import { client_response } from "../utils/responses.js";
import fs from 'fs-extra';
import { upload_offline_payment, delete_image } from "../utils/cloudinary.js";

export const create_enrollment = async (req, res, next) => {
    try {
        const { formation_id, payment_method, payment_status } = req.body;
        const user_id = req.user_id;
        if (await Enrollment.findOne({ user_id, formation_id })) {
            throw new Error('You are already enrolled in this formation');
        }
        const enrollment = new Enrollment({ user_id, formation_id, payment_method, payment_status });
        if (req.file?.payment_proof) {
            const result = await upload_offline_payment(req.file.payment_proof);
            enrollment.payment_proof = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };
            await fs.remove(req.file.payment_proof.tempFilePath);
        }

        await enrollment.save();

        return client_response(res, 201, 'Enrollment created successfully');
    } catch (error) {
        next(error);
    }
}

export const add_payment_proof = async (req, res, next) => {
    try {
        const { enrollment_id } = req.params;
        const enrollment = await Enrollment.findById(enrollment_id);
        if (!enrollment) {
            throw new Error('Enrollment not found');
        }
        if (enrollment.payment_proof) {
            throw new Error('Payment proof already added');
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
            throw new Error('Enrollment not found');
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
        const enrollments = await Enrollment.find().lean();
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
            throw new Error('Enrollment not found');
        }
        return client_response(res, 200, 'OK', enrollment);
    } catch (error) {
        next(error);
    }
}
