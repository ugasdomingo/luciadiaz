//Import tools
import { Schema, model, Document } from 'mongoose';

//Export the interface
export interface IVideo extends Document {
    _id: string;
    title: string;
    instructions: string;
    serves_for: string;
    video_url: string;
    cover_image: {
        public_id: string;
        secure_url: string;
    };
    categorys: string[];
    likes: number;
    createdAt: Date;
    updatedAt: Date;
}

//Create the schema
const videoSchema = new Schema<IVideo>(
    {
        title: {
            type: String,
            required: true,
        },
        instructions: {
            type: String,
            required: true,
        },
        serves_for: {
            type: String,
            required: true,
        },
        video_url: {
            type: String,
            required: true,
        },
        cover_image: {
            public_id: {
                type: String,
            },
            secure_url: {
                type: String,
            },
        },
        categorys: [
            {
                type: String,
            },
        ],
        likes: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
export const Video_model = model<IVideo>('Video', videoSchema);
