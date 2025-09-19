import { Schema, model } from "mongoose";

const formationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
            required: true,
        },
        type: {
            type: String,
            enum: ['presencial', 'live', 'online'],
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
        },
        status: {
            type: String,
            enum: ['inactive', 'active', 'draft'],
            required: true,
            default: 'inactive',
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
