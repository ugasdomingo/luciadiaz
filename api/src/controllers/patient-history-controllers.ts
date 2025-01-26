//Import tools
import {
    Patient_history_model,
    IPatientHistory,
} from '../models/PatientHistoryModel';
import {
    Medical_record_model,
    IMedicalRecord,
} from '../models/MedicalRecordModel';
import { add_patient_history_id } from './medical-record-controllers';
import { client_response, internal_response } from '../utils/responses';
import { encrypt, decrypt } from '../utils/encrpt';

//Create a new patient history
export const create_patient_history = async (req: any, res: any) => {
    try {
        const { title, answers, medical_record } = req.body;
        const uid = req.uid;

        //Encrypt the answers
        const encrypted_answers = encrypt(JSON.stringify(answers));

        //Create the patient history
        const new_patient_history: IPatientHistory = new Patient_history_model({
            uid,
            title,
            answers: encrypted_answers,
        });

        //Save the patient history
        await new_patient_history.save();

        //Add the patient history to the medical record
        await add_patient_history_id(medical_record, new_patient_history._id);

        return client_response(res, 201, 'Historia agregada correctamente');
    } catch (error) {
        internal_response('Error while creating the patient history', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//User get the patient history
export const user_get_patient_history = async (req: any, res: any) => {
    try {
        const { medical_record } = req.params;

        //Find the medical record
        const medical_record_data: IMedicalRecord | null =
            await Medical_record_model.findOne({ medical_record }).lean();

        if (!medical_record_data)
            return client_response(res, 404, 'Medical record not found');

        //Is the user allowed to see the test results?
        if (medical_record_data.uid !== req.uid)
            return client_response(res, 403, 'No autorizado');

        //Find the patient history
        const patient_history: IPatientHistory[] =
            await Patient_history_model.find({
                _id: { $in: medical_record_data.patient_history },
            });

        //Decrypt the answers
        patient_history.forEach((history) => {
            history.answers = JSON.parse(decrypt(history.answers as string));
        });

        return client_response(res, 200, 'Correcto', {
            patient_history,
        });
    } catch (error) {
        internal_response('Error while getting the patient history', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Admin get the patient history
export const admin_get_patient_history = async (req: any, res: any) => {
    try {
        const { medical_record } = req.params;

        //Find the medical record
        const medical_record_data: IMedicalRecord | null =
            await Medical_record_model.findOne({ medical_record }).lean();

        if (!medical_record_data)
            return client_response(res, 404, 'Medical record not found');

        //Find the patient history
        const patient_history: IPatientHistory[] =
            await Patient_history_model.find({
                _id: { $in: medical_record_data.patient_history },
            });

        //Decrypt the answers
        patient_history.forEach((history) => {
            history.answers = JSON.parse(decrypt(history.answers as string));
        });

        return client_response(res, 200, 'Correcto', {
            patient_history,
        });
    } catch (error) {
        internal_response('Error while getting the patient history', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};
