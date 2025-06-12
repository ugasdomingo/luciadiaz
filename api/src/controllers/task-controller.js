import { Therapy_task } from "../models/Therapy-task-model.js";
import { client_response } from "../utils/responses.js";

export const create_task = async (req, res, next) => {
    try {
        const { task, status, observations } = req.body;
        const { user_id } = req.params;
        const new_task = new Therapy_task({ task, status, observations, user_id });
        await new_task.save();
        return client_response(res, 201, 'Tarea creada');
    } catch (error) {
        next(error);
    }
}

export const update_task = async (req, res, next) => {
    try {
        const { task_id } = req.params;
        const task = await Therapy_task.findById(task_id);
        if (!task) {
            throw new Error('Tarea no encontrada');
        }
        task.task = req.body.task || task.task;
        task.status = req.body.status || task.status;
        task.observations = req.body.observations || task.observations;
        await task.save();
        return client_response(res, 200, 'Tarea actualizada');
    } catch (error) {
        next(error);
    }
}

export const delete_task = async (req, res, next) => {
    try {
        const { task_id } = req.params;
        const task = await Therapy_task.findByIdAndDelete(task_id);
        if (!task) {
            throw new Error('Tarea no encontrada');
        }
        return client_response(res, 200, 'Tarea eliminada');
    } catch (error) {
        next(error);
    }
}

export const complete_task = async (req, res, next) => {
    try {
        const { task_id } = req.params;
        const task = await Therapy_task.findById(task_id);
        if (!task) {
            throw new Error('Tarea no encontrada');
        }
        if (task.user_id !== req.user_id) {
            throw new Error('No tienes permiso para completar esta tarea');
        }
        task.status = 'completed';
        await task.save();
        return client_response(res, 200, 'Tarea completada');
    } catch (error) {
        next(error);
    }
}

