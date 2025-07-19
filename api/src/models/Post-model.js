import { Schema, model } from "mongoose";

const postSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        post_cover: {
            public_id: {
                type: String,
                required: true,
            },
            secure_url: {
                type: String,
                required: true,
            },
        },
        category: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: String,
                required: true,
            },
        ],
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
        likes:
        {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true
    }
)

export const Post = model('Post', postSchema);
