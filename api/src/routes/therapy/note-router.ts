//Import tool
import { Router } from 'express';
import { admin_auth } from '../../middlewares/admin-auth';
import {
    create_note,
    get_notes,
    edit_note,
} from '../../controllers/therapy/note-controllers';

//Create the router
const note_router = Router();

//Routes
note_router.post('/', admin_auth, create_note);

note_router.get('/', admin_auth, get_notes);

note_router.put('/', admin_auth, edit_note);

//Export the router
export default note_router;
