//Import tools
import { Schema, model, Document } from 'mongoose';

//Define Schema
const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        cover: {
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
        author: {
            type: String,
            default: 'Lucia Diaz',
        },
    },
    {
        timestamps: true,
    }
);

//Export model
export interface IPost extends Document {
    title: string;
    content: string;
    cover: string;
    category: string;
    tags: string[];
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

export const Post = model<IPost>('Post', postSchema);
