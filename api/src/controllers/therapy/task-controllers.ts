//Import tools
import { Task_model, ITask } from '../../models/therapy/TaskModel';
import {
    Medical_record_model,
    IMedicalRecord,
} from '../../models/MedicalRecordModel';
import { client_response, internal_response } from '../../utils/responses';
import { add_assigned_task_id } from '../medical-record-controllers';
import { encrypt, decrypt } from '../../utils/encrpt';

//Create a new task
export const create_task = async (req: any, res: any) => {
    try {
        const { uid, task, medical_record } = req.body;

        //Encrypt the task
        const task_encrypted = encrypt(task);

        //Create the task
        const new_task: ITask = new Task_model({
            uid,
            task: task_encrypted,
        });

        //Save the task
        await new_task.save();

        //Add the task to the medical record
        await add_assigned_task_id(medical_record, new_task._id);

        return client_response(res, 201, 'Tarea agregada correctamente');
    } catch (error) {
        internal_response('Error while creating the task', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//User get the tasks
export const user_get_tasks = async (req: any, res: any) => {
    try {
        const { medical_record } = req.params;

        //Find the medical record
        const medical_record_data: IMedicalRecord | null =
            await Medical_record_model.findOne({ medical_record }).lean();

        if (!medical_record_data)
            return client_response(res, 404, 'Medical record not found');

        //Is the user allowed to see the tasks?
        if (medical_record_data.uid !== req.uid)
            return client_response(res, 403, 'No autorizado');

        //Find the tasks
        const tasks: ITask[] = await Task_model.find({
            _id: { $in: medical_record_data.assigned_tasks },
        });

        //Decrypt the tasks
        tasks.forEach((task) => {
            task.task = decrypt(task.task);
        });

        return client_response(res, 200, 'Correcto', {
            tasks,
        });
    } catch (error) {
        internal_response('Error while getting the tasks', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Admin get the tasks
export const admin_get_tasks = async (req: any, res: any) => {
    try {
        const { medical_record } = req.params;

        //Find the medical record
        const medical_record_data: IMedicalRecord | null =
            await Medical_record_model.findOne({ medical_record }).lean();

        if (!medical_record_data)
            return client_response(res, 404, 'Medical record not found');

        //Find the tasks
        const tasks: ITask[] = await Task_model.find({
            _id: { $in: medical_record_data.assigned_tasks },
        });

        //Decrypt the tasks
        tasks.forEach((task) => {
            task.task = decrypt(task.task);
        });

        return client_response(res, 200, 'Correcto', {
            tasks,
        });
    } catch (error) {
        internal_response('Error while getting the tasks', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Update the task status
export const update_task_status = async (req: any, res: any) => {
    try {
        const { task_id, status } = req.body;

        //Find the task
        const task: ITask | null = await Task_model.findById(task_id);

        if (!task) return client_response(res, 404, 'Tarea no encontrada');

        //authorized to update the task?
        if (task.uid !== req.uid)
            return client_response(res, 403, 'No autorizado');

        //Update the task
        task.status = status;
        await task.save();

        return client_response(res, 200, 'Tarea actualizada correctamente');
    } catch (error) {
        internal_response('Error while updating the task status', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Edit the task
export const edit_task = async (req: any, res: any) => {
    try {
        const { task_id, task } = req.body;

        //Find the task
        const task_data: ITask | null = await Task_model.findById(task_id);

        if (!task_data) return client_response(res, 404, 'Tarea no encontrada');

        //Encrypt the task
        const task_encrypted = encrypt(task);

        //Update the task
        task_data.task = task_encrypted;
        await task_data.save();

        return client_response(res, 200, 'Tarea actualizada correctamente');
    } catch (error) {
        internal_response('Error while updating the task', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};
