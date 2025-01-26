//Import tools
import {
    Enrollment_model,
    IEnrollment,
} from '../../models/formation/EnrollmentModel';
import { client_response, internal_response } from '../../utils/responses';
import { upload_payment } from '../../utils/cloudinary';
import { add_formation_enrolled_id } from '../medical-record-controllers';
import fs from 'fs-extra';

//Create a new enrollment
export const create_enrollment = async (req: any, res: any) => {
    try {
        const { fid, payment_method, payment_status, medical_record } =
            req.body;
        const uid = req.uid;

        //Check if the user is already enrolled in the formation
        const enrollment = await Enrollment_model.findOne({
            uid,
            fid,
        });

        if (enrollment) {
            return client_response(
                res,
                400,
                'Ya estás inscrito en esta formación'
            );
        }

        //Create the new enrollment
        const new_enrollment: IEnrollment = new Enrollment_model({
            uid,
            fid,
            payment_method,
            payment_status,
        });

        if (req.files?.payment_proof) {
            const payment_proof = await upload_payment(req.files.payment_proof);
            new_enrollment.payment_proof = {
                public_id: payment_proof.public_id,
                secure_url: payment_proof.secure_url,
            };

            await fs.unlink(req.files.payment_proof.path);
        }

        //Save the enrollment
        await new_enrollment.save();

        //Add the formation to the user's medical record
        await add_formation_enrolled_id(medical_record, new_enrollment._id);

        return client_response(res, 201, 'Inscripción realizada correctamente');
    } catch (error) {
        internal_response('Error while creating the enrollment', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get all the enrollments
export const get_enrollments = async (req: any, res: any) => {
    try {
        const enrollments = await Enrollment_model.find();

        return client_response(res, 200, 'Correcto', enrollments);
    } catch (error) {
        internal_response('Error while getting the enrollments', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get a single enrollment
export const get_enrollment = async (req: any, res: any) => {
    try {
        const enrollment: IEnrollment | null = await Enrollment_model.findById(
            req.params.id
        );

        if (!enrollment) {
            return client_response(res, 404, 'Inscripción no encontrada');
        }

        return client_response(res, 200, 'Correcto', enrollment);
    } catch (error) {
        internal_response('Error while getting the enrollment', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Update enrollment status
export const update_enrollment_status = async (req: any, res: any) => {
    try {
        const { payment_status } = req.body;

        await Enrollment_model.findByIdAndUpdate(req.params.id, {
            payment_status,
        });

        return client_response(res, 200, 'Inscripción actualizada');
    } catch (error) {
        internal_response('Error while updating the enrollment status', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};
