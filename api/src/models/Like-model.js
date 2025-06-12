import { Schema, model } from "mongoose";

const likeSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        email: {
            type: String,
        },
        item_type: {
            type: String,
            enum: ['Post', 'Video', 'Formation'],
            required: true,
        },
        item_id: {
            type: Schema.Types.ObjectId,
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const Like = model('Like', likeSchema);
