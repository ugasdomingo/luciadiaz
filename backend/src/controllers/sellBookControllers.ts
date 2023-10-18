//Import tools
import { Request, Response } from 'express';
import { IRequest } from '../interfaces/IRequest';
import { SellBook, ISellBook } from '../models/SellBook';

// Create --> Line 14
// getAllSellBooksByBookId --> Line 37
// getAllSellBooksByUserId --> Line 57
// Update --> Line 80

//Create
export const createSellBook = async (req: IRequest, res: Response) => {
    const { book_id, status } = req.body;

    try {
        //Create sell book
        const sellBook: ISellBook = new SellBook({
            uid: req.uid,
            book_id,
            status,
        });

        await sellBook.save();

        return res.status(201).json({
            msg: 'Venta de Libro creada',
            sellBook,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al crear el libro',
        });
    }
};

//getAllSellBooksByBookId
export const getAllSellBooks = async (req: Request, res: Response) => {
    const { book_id } = req.body;

    try {
        const sellBooks: ISellBook[] = await SellBook.find({
            book_id,
        });

        return res.status(200).json({
            msg: 'Ventas de Libros obtenidos',
            sellBooks,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al obtener las ventas de libros',
        });
    }
};

//getAllSellBooksByUserId
export const getAllSellBooksByUserId = async (req: IRequest, res: Response) => {
    try {
        const sellBooks: ISellBook[] = await SellBook.find({
            uid: req.uid,
        });

        return res.status(200).json({
            msg: 'Ventas de Libros obtenidos',
            sellBooks,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al obtener las ventas de libros',
        });
    }
};

//Update
export const updateSellBook = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { status } = req.body;

    try {
        await SellBook.findByIdAndUpdate(id, {
            status,
        });

        return res.status(200).json({
            msg: 'Venta de Libro actualizada',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error al actualizar la venta de libro',
        });
    }
};
