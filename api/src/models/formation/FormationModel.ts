//Import tools
import { Schema, model, Document } from 'mongoose';

//Export the interface
export interface IFormation extends Document {
    _id: string;
    title: string;
    landing_page: string;
    type: string;
    content: string;
    description: string;
    duration: string;
    location: string;
    price: number;
    date: Date;
    categorys: string[];
    video_url: string;
    cover_image: {
        public_id: string;
        secure_url: string;
    };
    paypal_button: string;
    status: string;
    users_enrolled: string[];
    likes: number;
    createdAt: Date;
    updatedAt: Date;
}

//Create the schema
const formationSchema = new Schema<IFormation>(
    {
        title: {
            type: String,
            required: true,
        },
        landing_page: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
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
        paypal_button: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['inactive', 'active', 'draft'],
            required: true,
        },
        users_enrolled: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
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
export const Formation_model = model<IFormation>('Formation', formationSchema);
