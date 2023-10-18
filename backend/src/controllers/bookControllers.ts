//Import tools
import { Request, Response } from 'express';
import { Book, IBook } from '../models/Book';
import { ICover } from '../interfaces/ICover';
import fs from 'fs-extra';
import { uploadImage, deleteImage } from '../utils/cloudinary';

// Create --> Line 14
// getAllBooks --> Line 76
// getBookById --> Line 93
// Update --> Line 118
// Delete --> Line 149

//Create
export const createBook = async (req: Request, res: Response) => {
    const {
        title,
        type,
        price,
        sellUrl,
        description,
        author,
        category,
        tags,
        notes,
    } = req.body;

    try {
        //Create post
        const book: IBook = new Book({
            title,
            type,
            price,
            sellUrl,
            description,
            author,
            category,
            tags,
            notes,
        });

        if (req.files) {
            const cover = req.files.cover as ICover;

            const result = await uploadImage(cover.tempFilePath as string);
            book.cover = {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };

            fs.unlink(cover.tempFilePath, (err) => {
                if (err) throw err;
            });
        }

        await book.save();

        res.status(201).json({
            msg: 'Book created',
            book,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error creating book',
        });
    }
};

//getAllBooks
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books: IBook[] = await Book.find();

        res.status(200).json({
            msg: 'All books',
            books,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error getting books',
        });
    }
};

//getBookById
export const getBookById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const book: IBook | null = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                msg: 'Book not found',
            });
        }

        res.status(200).json({
            msg: 'Book encontrado',
            book,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error getting book',
        });
    }
};

//Update
export const updateBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const book: IBook | null = await Book.findByIdAndUpdate(id, req.body);

        if (!book) {
            return res.status(404).json({
                msg: 'Book not found',
            });
        }

        res.status(200).json({
            msg: 'Book updated',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error updating book',
        });
    }
};

//Delete
export const deleteBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const book: IBook | null = await Book.findByIdAndDelete(id);

        if (!book) {
            return res.status(404).json({
                msg: 'Book not found',
            });
        }

        if (book.cover) {
            await deleteImage(book.cover);
        }

        res.status(200).json({
            msg: 'Book deleted',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error deleting book',
        });
    }
};
