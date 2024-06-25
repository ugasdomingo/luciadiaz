//Import tools
import { Schema, model, Document } from 'mongoose';

//Define Schema
const formationsSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        type: {
            type: String,
            required: true,
        },
        cover: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        duration: {
            type: Number, //in hours
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        initialDate: {
            type: Date,
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
        paypalButton: {
            type: String,
            required: true,
        },
        videoUrl: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

//Export model
export interface IFormations extends Document {
    title: string;
    description: string;
    type: string;
    cover: string;
    price: number;
    duration: number;
    location: string;
    initialDate: Date;
    category: string;
    tags: string[];
    paypalButton: string;
    videoUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export const Formations = model<IFormations>('Formations', formationsSchema);
