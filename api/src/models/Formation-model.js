import { Schema, model } from "mongoose";

const formationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['presencial', 'webinar', 'en_linea'], 
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
        start_date: {
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
        formation_cover: {
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
        timestamps: true
    }
)

export const Formation = model('Formation', formationSchema);
