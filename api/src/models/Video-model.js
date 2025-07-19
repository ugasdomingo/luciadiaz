import { Schema, model } from "mongoose";

const VideoSchema = new Schema(
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
        brief: {
            type: String,
            required: true,
        },
        video_url: {
            type: String,
            required: true,
        },
        video_cover: {
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

export const Video = model('Video', VideoSchema);