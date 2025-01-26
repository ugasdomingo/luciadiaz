//Import tools
import {
    Medical_record_model,
    IMedicalRecord,
} from '../models/MedicalRecordModel';
import { User_model, IUser } from '../models/UserModel';
import { Test_result_model } from '../models/TestResultsModel';
import { Patient_history_model } from '../models/PatientHistoryModel';
import { Task_model } from '../models/therapy/TaskModel';
import { Note_model } from '../models/therapy/NoteModel';
import { Formation_model } from '../models/formation/FormationModel';
import { Enrollment_model } from '../models/formation/EnrollmentModel';
import { Video_model } from '../models/content/VideoModel';
import { Post_model } from '../models/content/PostModel';
import { client_response, internal_response } from '../utils/responses';
import { encrypt, decrypt } from '../utils/encrpt';

//Get all the medical records by user
export const get_all_medical_data_by_user = async (req: any, res: any) => {
    try {
        const uid = req.uid;

        //Get medical record
        const medical_record: IMedicalRecord | null =
            await Medical_record_model.findOne({ uid });
        if (!medical_record)
            return client_response(
                res,
                404,
                'No se encontraron registros médicos'
            );

        //Get user data
        const user: IUser | null = await User_model.findById(uid);
        if (!user)
            return client_response(res, 404, 'No se encontró el usuario');

        //Get all the patient history
        const patient_history = await Patient_history_model.find({
            _id: { $in: medical_record.patient_history },
        });
        //decrypt the answers
        const decrypted_patient_history = patient_history.map((history) => {
            return {
                title: history.title,
                answers: JSON.parse(decrypt(history.answers as string)),
            };
        });

        //Get all the test results
        const test_results = await Test_result_model.find({
            _id: { $in: medical_record.test_results },
        });
        //decrypt the results
        const decrypted_test_results = test_results.map((test) => {
            return {
                title: test.title,
                results: JSON.parse(decrypt(test.results as string)),
            };
        });

        //Get all the liked posts
        const liked_posts = await Post_model.find({
            _id: { $in: medical_record.liked_posts },
        });

        //Get all the liked formations
        const liked_formations = await Formation_model.find({
            _id: { $in: medical_record.liked_formations },
        });

        //Get all the liked videos
        const liked_videos = await Video_model.find({
            _id: { $in: medical_record.liked_videos },
        });

        //Get all the therapies notes
        const therapies_notes = await Note_model.find({
            _id: { $in: medical_record.therapies_notes },
        });
        //decrypt the notes
        const decrypted_therapies_notes = therapies_notes.map((note) => {
            return {
                title: decrypt(note.reason),
                content: decrypt(note.notes as string),
            };
        });

        //Get all the formations enrolled
        const formations_enrolled = await Enrollment_model.find({
            _id: { $in: medical_record.formations_enrolled },
        });

        //Get all the assigned tasks
        const assigned_tasks = await Task_model.find({
            _id: { $in: medical_record.assigned_tasks },
        });
        //decrypt the tasks
        const decrypted_assigned_tasks = assigned_tasks.map((task) => {
            return {
                task: decrypt(task.task),
                status: task.status,
            };
        });

        return client_response(res, 200, 'Correcto', {
            user_name: user.name,
            user_email: user.email,
            user_phone: user.phone,
            patient_history: decrypted_patient_history,
            test_results: decrypted_test_results,
            liked_posts,
            liked_formations,
            liked_videos,
            therapies_notes: decrypted_therapies_notes,
            formations_enrolled,
            assigned_tasks: decrypted_assigned_tasks,
        });
    } catch (error) {
        internal_response('Error while getting the medical records', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get all the medical records by Admin
export const get_all_medical_data_by_admin = async (req: any, res: any) => {
    try {
        const uid = req.params.id;

        //Get medical record
        const medical_record: IMedicalRecord | null =
            await Medical_record_model.findOne({ uid });
        if (!medical_record)
            return client_response(
                res,
                404,
                'No se encontraron registros médicos'
            );

        //Get user data
        const user: IUser | null = await User_model.findById(uid);
        if (!user)
            return client_response(res, 404, 'No se encontró el usuario');

        //Get all the patient history
        const patient_history = await Patient_history_model.find({
            _id: { $in: medical_record.patient_history },
        });
        //decrypt the answers
        const decrypted_patient_history = patient_history.map((history) => {
            return {
                title: history.title,
                answers: JSON.parse(decrypt(history.answers as string)),
            };
        });

        //Get all the test results
        const test_results = await Test_result_model.find({
            _id: { $in: medical_record.test_results },
        });
        //decrypt the answers
        const decrypted_test_results = test_results.map((test) => {
            return {
                title: test.title,
                results: JSON.parse(decrypt(test.results as string)),
            };
        });

        //Get all the liked posts
        const liked_posts = await Post_model.find({
            _id: { $in: medical_record.liked_posts },
        });

        //Get all the liked formations
        const liked_formations = await Formation_model.find({
            _id: { $in: medical_record.liked_formations },
        });

        //Get all the liked videos
        const liked_videos = await Video_model.find({
            _id: { $in: medical_record.liked_videos },
        });

        //Get all the therapies notes
        const therapies_notes = await Note_model.find({
            _id: { $in: medical_record.therapies_notes },
        });
        //decrypt the notes
        const decrypted_therapies_notes = therapies_notes.map((note) => {
            return {
                title: decrypt(note.reason),
                content: decrypt(note.notes as string),
            };
        });

        //Get all the formations enrolled
        const formations_enrolled = await Enrollment_model.find({
            _id: { $in: medical_record.formations_enrolled },
        });

        //Get all the assigned tasks
        const assigned_tasks = await Task_model.find({
            _id: { $in: medical_record.assigned_tasks },
        });
        //decrypt the tasks
        const decrypted_assigned_tasks = assigned_tasks.map((task) => {
            return {
                task: decrypt(task.task),
                status: task.status,
            };
        });

        return client_response(res, 200, 'Correcto', {
            user_name: user.name,
            user_email: user.email,
            user_phone: user.phone,
            patient_history: decrypted_patient_history,
            test_results: decrypted_test_results,
            liked_posts,
            liked_formations,
            liked_videos,
            therapies_notes: decrypted_therapies_notes,
            formations_enrolled,
            assigned_tasks: decrypted_assigned_tasks,
        });
    } catch (error) {
        internal_response('Error while getting the medical records', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};
