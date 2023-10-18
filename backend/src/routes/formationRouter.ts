//Import tools
import { Router } from 'express';
import { adminAuth } from '../middlewares/adminAuth';
import fs from 'fs-extra';
import fileUpload from 'express-fileupload';
import {
    createFormation,
    getAllFormations,
    getFormationById,
    updateFormation,
    deleteFormation,
} from '../controllers/formationControllers';

//Define router
const formationRouter = Router();

//routes
formationRouter.post(
    '/',
    fileUpload({ useTempFiles: true, tempFileDir: './upload' }),
    adminAuth,
    createFormation
);

formationRouter.get('/', getAllFormations);

formationRouter.get('/:id', getFormationById);

formationRouter.put(
    '/:id',
    fileUpload({ useTempFiles: true, tempFileDir: './upload' }),
    adminAuth,
    updateFormation
);

formationRouter.delete('/:id', adminAuth, deleteFormation);

//Export router
export default formationRouter;
