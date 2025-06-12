import { Router } from "express";
import { create_note, delete_note, update_note, get_all_pending_notes } from "../controllers/note-controller.js";
import { admin_auth } from "../middlewares/user_auth.js";

const note_router = Router();

note_router.get('/pending', admin_auth, get_all_pending_notes);
note_router.post('/', admin_auth, create_note);
note_router.put('/:note_id', admin_auth, update_note);
note_router.delete('/:note_id', admin_auth, delete_note);

export default note_router;