//Import tools
import { Schema, model, Document } from 'mongoose';

//Export the interface
export interface IPost extends Document {
    _id: string;
    title: string;
    content: string;
    cover_image: {
        public_id: string;
        secure_url: string;
    };
    categorys: string[];
    likes: number;
    video_url: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
}

//Create the schema
const postSchema = new Schema<IPost>(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        cover_image: {
            public_id: {
                type: String,
                required: true,
            },
            secure_url: {
                type: String,
                required: true,
            },
        },
        categorys: [
            {
                type: String,
                required: true,
            },
        ],
        video_url: {
            type: String,
        },
        likes: {
            type: Number,
            default: 0,
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

//Export the model
export const Post_model = model<IPost>('Post', postSchema);
