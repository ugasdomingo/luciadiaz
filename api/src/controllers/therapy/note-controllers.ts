//Import tools
import { Note_model, INote } from '../../models/therapy/NoteModel';
import {
    Medical_record_model,
    IMedicalRecord,
} from '../../models/MedicalRecordModel';
import { client_response, internal_response } from '../../utils/responses';
import { add_therapy_note_id } from '../medical-record-controllers';
import { encrypt, decrypt } from '../../utils/encrpt';

//Create a new note
export const create_note = async (req: any, res: any) => {
    try {
        const { uid, reason, notes, medical_record } = req.body;

        //Encrypt the notes and reason
        const reason_encrypted = encrypt(reason);
        const notes_encrypted = encrypt(notes);

        //Create the note
        const new_note: INote = new Note_model({
            uid,
            reason: reason_encrypted,
            notes: notes_encrypted,
        });

        //Save the note
        await new_note.save();

        //Add the note to the medical record
        await add_therapy_note_id(medical_record, new_note._id);

        return client_response(res, 201, 'Nota agregada correctamente');
    } catch (error) {
        internal_response('Error while creating the note', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get notes by medical record
export const get_notes = async (req: any, res: any) => {
    try {
        const { medical_record } = req.params;

        //Find the medical record
        const medical_record_data: IMedicalRecord | null =
            await Medical_record_model.findOne({ medical_record }).lean();

        if (!medical_record_data)
            return client_response(res, 404, 'Medical record not found');

        //Find the notes
        const notes: INote[] = await Note_model.find({
            _id: { $in: medical_record_data.therapies_notes },
        });

        //Decrypt the notes and reason
        notes.forEach((note) => {
            note.reason = decrypt(note.reason);
            note.notes = decrypt(note.notes);
        });

        return client_response(res, 200, 'Correcto', {
            notes,
        });
    } catch (error) {
        internal_response('Error while getting the notes', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Edit a note
export const edit_note = async (req: any, res: any) => {
    try {
        const { note_id, reason, notes } = req.body;

        //Encrypt the notes and reason
        const reason_encrypted = encrypt(reason);
        const notes_encrypted = encrypt(notes);

        //Find the note
        const note: INote | null = await Note_model.findById(note_id);

        if (!note) return client_response(res, 404, 'Nota no encontrada');

        //Update the note
        note.reason = reason_encrypted;
        note.notes = notes_encrypted;

        await note.save();

        return client_response(res, 200, 'Nota actualizada correctamente');
    } catch (error) {
        internal_response('Error while updating the note', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};
