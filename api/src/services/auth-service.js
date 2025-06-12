import { generate_token, generate_refresh_token } from "../utils/tokens.js";
//Import Models
import { User } from "../models/User-model.js";
import { Therapy_note } from "../models/Therapy-note-model.js";
import { Therapy_task } from "../models/Therapy-task-model.js";
import { Patient_history } from "../models/Patient-history-model.js";
import { Test_result } from "../models/Test-result-model.js";
import { Enrollment } from "../models/Enrollment-model.js";
import { Like } from "../models/Like-model.js";

//Helpers
export const admin_get_user_data = async (uid) => {
    try {
        const promises = [
            User.findById(uid).select('-password -reset_password_token -login_token').lean(),
            Therapy_note.find({ uid }).select('-uid').lean(),
            Therapy_task.find({ uid }).select('-uid').lean(),
            Patient_history.find({ uid }).select('-uid').lean(),
            Test_result.find({ uid }).select('-uid').lean(),
            Enrollment.find({ uid }).select('-uid').lean(),
            Like.find({ uid }).select('-uid').lean(),
        ]
        const [user, therapy_notes, therapy_tasks, patient_histories, test_results, enrollments, likes] = await Promise.all(promises);

        const user_data = {
            user,
            notes: therapy_notes,
            tasks: therapy_tasks,
            history: patient_histories,
            tests: test_results,
            enrollments,
            likes,
        }

        return user_data;
    } catch (error) {
        throw error;
    }
}

export const get_login_user_data = async (uid) => {
    try {
        const promises = [
            User.findById(uid).select('-password -reset_password_token -login_token').lean(),
            Therapy_task.find({ uid }).select('-uid').lean(),
            Patient_history.find({ uid }).select('-uid').lean(),
            Test_result.find({ uid }).select('-uid').lean(),
        ]
        const [user, therapy_tasks, patient_histories, test_results] = await Promise.all(promises);

        const user_data = {
            user,
            tasks: therapy_tasks,
            history: patient_histories,
            tests: test_results,
        }

        const token = generate_token(user._id);
        const refresh_token = generate_refresh_token(user._id);

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
