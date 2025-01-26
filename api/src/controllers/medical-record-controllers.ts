//Import tools
import {
    Medical_record_model,
    IMedicalRecord,
} from '../models/MedicalRecordModel';
import { client_response, internal_response } from '../utils/responses';

//Get all the medical records
export const get_all_medical_records = async (req: any, res: any) => {
    try {
        const medical_records: IMedicalRecord[] =
            await Medical_record_model.find();
        return client_response(res, 200, 'Correcto', medical_records);
    } catch (error) {
        internal_response('Error while getting the medical records', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get the medical record by user
export const get_medical_record_by_user = async (req: any, res: any) => {
    try {
        const uid = req.uid;
        const medical_record: IMedicalRecord | null =
            await Medical_record_model.findById(uid);
        if (!medical_record)
            return client_response(res, 404, 'Medical record not found');
        return client_response(res, 200, 'Correcto', medical_record);
    } catch (error) {
        internal_response('Error while getting the medical record', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get a medical record by medical record
export const get_medical_record_by_medical_record = async (
    req: any,
    res: any
) => {
    try {
        const { medical_record } = req.params;
        const medical_record_data: IMedicalRecord | null =
            await Medical_record_model.findOne({ medical_record });
        if (!medical_record_data)
            return client_response(res, 404, 'Medical record not found');
        return client_response(res, 200, 'Correcto', medical_record_data);
    } catch (error) {
        internal_response('Error while getting the medical record', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Create a medical record
export const create_medical_record = async (
    medical_record: string,
    uid: string,
    res: any
) => {
    try {
        const new_medical_record = new Medical_record_model({
            uid,
            medical_record,
        });
        await new_medical_record.save();
    } catch (error) {
        internal_response('Error while creating the medical record', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Add a patient history id to the medical record
export const add_patient_history_id = async (
    medical_record: string,
    patient_history_id: string
) => {
    try {
        await Medical_record_model.findOneAndUpdate(
            { medical_record },
            { $push: { patient_history: patient_history_id } }
        );

        return true;
    } catch (error) {
        internal_response('Error while adding the patient history', error);
        return false;
    }
};

//Add a test result id to the medical record
export const add_test_result_id = async (
    medical_record: string,
    test_result_id: string
) => {
    try {
        await Medical_record_model.findOneAndUpdate(
            { medical_record },
            { $push: { test_results: test_result_id } }
        );

        return true;
    } catch (error) {
        internal_response('Error while adding the test result', error);
        return false;
    }
};

//Add a liked post id to the medical record
export const add_liked_post_id = async (
    medical_record: string,
    liked_post_id: string
) => {
    try {
        await Medical_record_model.findOneAndUpdate(
            { medical_record },
            { $push: { liked_posts: liked_post_id } }
        );

        return true;
    } catch (error) {
        internal_response('Error while adding the liked post', error);
        return false;
    }
};

//Add a liked formation id to the medical record
export const add_liked_formation_id = async (
    medical_record: string,
    liked_formation_id: string
) => {
    try {
        await Medical_record_model.findOneAndUpdate(
            { medical_record },
            { $push: { liked_formations: liked_formation_id } }
        );

        return true;
    } catch (error) {
        internal_response('Error while adding the liked formation', error);
        return false;
    }
};

//Add a liked audio id to the medical record
export const add_liked_video_id = async (
    medical_record: string,
    liked_audio_id: string
) => {
    try {
        await Medical_record_model.findOneAndUpdate(
            { medical_record },
            { $push: { liked_audios: liked_audio_id } }
        );

        return true;
    } catch (error) {
        internal_response('Error while adding the liked audio', error);
        return false;
    }
};

//Add a therapy note id to the medical record
export const add_therapy_note_id = async (
    medical_record: string,
    therapy_note_id: string
) => {
    try {
        await Medical_record_model.findOneAndUpdate(
            { medical_record },
            { $push: { therapies_notes: therapy_note_id } }
        );

        return true;
    } catch (error) {
        internal_response('Error while adding the therapy note', error);
        return false;
    }
};

//Add a formation enrolled id to the medical record
export const add_formation_enrolled_id = async (
    medical_record: string,
    formation_enrolled_id: string
) => {
    try {
        await Medical_record_model.findOneAndUpdate(
            { medical_record },
            { $push: { formations_enrolled: formation_enrolled_id } }
        );

        return true;
    } catch (error) {
        internal_response('Error while adding the formation enrolled', error);
        return false;
    }
};

//Add an assigned task id to the medical record
export const add_assigned_task_id = async (
    medical_record: string,
    assigned_task_id: string
) => {
    try {
        await Medical_record_model.findOneAndUpdate(
            { medical_record },
            { $push: { assigned_tasks: assigned_task_id } }
        );

        return true;
    } catch (error) {
        internal_response('Error while adding the assigned task', error);
        return false;
    }
};
