import { Therapy_note } from "../models/Therapy-note-model.js";
import { client_response } from "../utils/responses.js";
import { encrypt } from "../utils/encrypt.js";

export const get_all_notes = async (req, res, next) => {
    try {
        const notes = await Therapy_note.find().populate('user_id').sort({ createdAt: -1 }).lean();
        return client_response(res, 200, 'OK', notes);
    } catch (error) {
        next(error);
    }
}

export const create_note = async (req, res, next) => {
    try {
        const { user_id, reason, notes } = req.body;
        const encrypted_notes = encrypt(notes);
        const encrypted_reason = encrypt(reason);
        const note = new Therapy_note({ reason: encrypted_reason, notes: encrypted_notes, user_id });
        await note.save();
        return client_response(res, 201, 'Nota creada');
    } catch (error) {
        next(error);
    }
}

export const update_note = async (req, res, next) => {
    try {
        const { note_id } = req.params;
        const note = await Therapy_note.findById(note_id);
        if (!note) {
            throw new Error('Nota no encontrada');
        }
        note.reason = req.body.reason || note.reason;
        note.notes = encrypt(req.body.notes || note.notes);
        await note.save();
        return client_response(res, 200, 'Nota actualizada');
    } catch (error) {
        next(error);
    }
}

export const delete_note = async (req, res, next) => {
    try {
        const { note_id } = req.params;
        const note = await Therapy_note.findByIdAndDelete(note_id);
        if (!note) {
            throw new Error('Nota no encontrada');
        }
        return client_response(res, 200, 'Nota eliminada');
    } catch (error) {
        next(error);
    }
}
