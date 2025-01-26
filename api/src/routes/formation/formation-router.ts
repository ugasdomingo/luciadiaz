//Import tools
import { Router } from 'express';
import { admin_auth } from '../../middlewares/admin-auth';
import { user_auth } from '../../middlewares/user-auth';
import fileUpload from 'express-fileupload';
import {
    create_formation,
    get_formations,
    get_formation,
    update_formation,
    add_like,
} from '../../controllers/formation/formation-controllers';

//Create the router
const formation_router = Router();

//Routes
formation_router.post(
    '/',
    admin_auth,
    fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads',
    }),
    create_formation
);

formation_router.get('/', get_formations);

formation_router.get('/:id', get_formation);

formation_router.put('/:id', admin_auth, update_formation);

formation_router.put('/like/:id', user_auth, add_like);

//Export router
export default formation_router;
