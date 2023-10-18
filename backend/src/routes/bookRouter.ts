//Import tools
import { Router } from 'express';
import { userAuth } from '../middlewares/userAuth';
import { adminAuth } from '../middlewares/adminAuth';
import fs from 'fs-extra';
import fileUpload from 'express-fileupload';
import {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
} from '../controllers/bookControllers';

//Define router
const bookRouter = Router();

//Routes
bookRouter.post(
    '/',
    adminAuth,
    fileUpload({
        useTempFiles: true,
        tempFileDir: './uploads/',
    }),
    createBook
);

bookRouter.get('/', getAllBooks);

bookRouter.get('/:id', getBookById);

bookRouter.put('/', adminAuth, updateBook);

bookRouter.delete('/:id', adminAuth, deleteBook);

//Export router
export default bookRouter;
