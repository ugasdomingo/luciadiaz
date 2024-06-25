//Import tools
import { Schema, model, Document } from 'mongoose';

//Define Schema
const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['Físico', 'Digital'],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            requiered: true,
        },
        sellUrl: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        notes: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

//Export model
export interface IBook extends Document {
    title: string;
    type: string;
    description: string;
    price: number;
    sellUrl: string;
    cover: string;
    author: string;
    category: string;
    tags: string[];
    notes: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const Book = model<IBook>('Book', bookSchema);
