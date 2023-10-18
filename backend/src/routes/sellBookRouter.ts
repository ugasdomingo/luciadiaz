//Import tools
import { Router } from 'express';
import { userOrAdminAuth } from '../middlewares/userOrAdminAuth';
import { userAuth } from '../middlewares/userAuth';
import { adminAuth } from '../middlewares/adminAuth';
import {
    createSellBook,
    getAllSellBooks,
    getAllSellBooksByUserId,
    updateSellBook,
} from '../controllers/sellBookControllers';

//Define router
const sellBookRouter = Router();

//Routes
sellBookRouter.post('/', userAuth, createSellBook);

sellBookRouter.get('/', adminAuth, getAllSellBooks);

sellBookRouter.get('/:uid', userOrAdminAuth, getAllSellBooksByUserId);

sellBookRouter.put('/', adminAuth, updateSellBook);

//Export router
export default sellBookRouter;
