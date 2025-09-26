import { generate_token, generate_refresh_token } from "../utils/tokens.js";
import { decrypt } from "../utils/encrypt.js";
//Import Models
import { User } from "../models/User-model.js";
import { Therapy_note } from "../models/Therapy-note-model.js";
import { Therapy_task } from "../models/Therapy-task-model.js";
import { Patient_history } from "../models/Patient-history-model.js";
import { Test_result } from "../models/Test-result-model.js";
import { Enrollment } from "../models/Enrollment-model.js";
import { Like } from "../models/Like-model.js";

//Helpers
export const admin_get_user_data = async (user_id) => {
    try {

        const promises = [
            User.findById(user_id).select('-password -reset_password_token -login_token -_id').lean(),
            Patient_history.find({ user_id: user_id.toString() }).select('-user_id').lean(),
            Therapy_note.find({ user_id: user_id.toString() }).select('-user_id').lean(),
            Therapy_task.find({ user_id: user_id.toString() }).select('-user_id').lean(),
            Test_result.find({ user_id: user_id.toString() }).select('-user_id').lean(),
            Enrollment.find({ user_id: user_id.toString() }).select('-user_id').lean(),
            Like.find({ user_id: user_id.toString() }).select('-user_id').lean(),
        ]
        const [user, patient_histories, therapy_notes, therapy_tasks, test_results, enrollments, likes] = await Promise.all(promises);

        //Decrypt data
        patient_histories.forEach((history) => {
            history.answers = JSON.parse(decrypt(history.answers));
        });
        therapy_notes.forEach((note) => {
            note.notes = decrypt(note.notes);
            note.reason = decrypt(note.reason);
        });
        therapy_tasks.forEach((task) => {
            task.task = JSON.parse(decrypt(task.task));
            task.observations = JSON.parse(decrypt(task.observations));
        });
        test_results.forEach((result) => {
            result.results = JSON.parse(decrypt(result.results));
        });

        const user_data = {
            user,
            history: patient_histories || [],
            therapy_notes: therapy_notes || [],
            therapy_tasks: therapy_tasks || [],
            test_results: test_results || [],
            enrollments: enrollments || [],
            likes: likes || [],
        }

        return user_data;
    } catch (error) {
        throw error;
    }
}

export const get_login_user_data = async (user_id) => {
    try {
        const promises = [
            User.findById(user_id).select('-password -reset_password_token -login_token -_id').lean(),
            Patient_history.find({ user_id: user_id.toString() }).select('-user_id').lean(),
            Therapy_task.find({ user_id: user_id.toString() }).select('-user_id').lean(),
            Test_result.find({ user_id: user_id.toString() }).select('-user_id').lean(),
            Enrollment.find({ user_id: user_id.toString() }).select('-user_id').lean(),
            Like.find({ user_id: user_id.toString() }).select('-user_id').lean(),
        ]
        const [user, patient_histories, therapy_tasks, test_results, enrollments, likes] = await Promise.all(promises);

        //Decrypt data
        if (patient_histories.length > 0) {
            patient_histories.forEach((history) => {
                history.answers = JSON.parse(decrypt(history.answers));
            });
        }
        if (therapy_tasks.length > 0) {
            therapy_tasks.forEach((task) => {
                task.task = JSON.parse(decrypt(task.task));
                task.observations = JSON.parse(decrypt(task.observations));
            });
        }
        if (test_results.length > 0) {
            test_results.forEach((result) => {
                result.results = JSON.parse(decrypt(result.results));
            });
        }

        const user_data = {
            user,
            history: patient_histories || [],
            therapy_tasks: therapy_tasks || [],
            test_results: test_results || [],
            enrollments: enrollments || [],
            likes: likes || [],
        }

        const token = generate_token(user_id);
        const refresh_token = generate_refresh_token(user_id);

        return {
            user_data,
            token,
            refresh_token,
        }
    } catch (error) {
        throw error;
    }
}

export const unify_email_activity = async (uid, email) => {
    try {
        const update_likes_promise = Like.updateMany({ email }, { $set: { uid } })
        const update_enrollments_promise = Enrollment.updateMany({ email }, { $set: { uid } })
        const update_test_results_promise = Test_result.updateMany({ email }, { $set: { uid } })

        const promises = [
            update_likes_promise,
            update_enrollments_promise,
            update_test_results_promise,
        ]
        await Promise.all(promises)

        return true;
    } catch (error) {
        throw error;
    }
}
