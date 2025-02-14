//Import tools
import { Task_model, ITask } from '../../models/therapy/TaskModel';
import { User_model, IUser } from '../../models/UserModel';
import { client_response, internal_response } from '../../utils/responses';
import { add_assigned_task_id } from '../medical-record-controllers';
import { encrypt, decrypt } from '../../utils/encrpt';

//Create a new task
export const create_task = async (req: any, res: any) => {
    try {
        const { uid, task } = req.body;

        //Find the user
        const user: IUser | null = await User_model.findById(uid);

        if (!user) return client_response(res, 404, 'Usuario no encontrado');

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
        await add_assigned_task_id(user.medical_record, new_task._id);

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

//Update the task status
export const update_task_status = async (req: any, res: any) => {
    try {
        const { task_id, status } = req.body;

        //Find the task
        const task: ITask | null = await Task_model.findById(task_id);

        if (!task) return client_response(res, 404, 'Tarea no encontrada');

        //authorized to update the task?
        if (task.uid == req.uid)
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
