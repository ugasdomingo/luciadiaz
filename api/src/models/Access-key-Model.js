import { Schema, model } from "mongoose";

const accessKeySchema = new Schema(
    {
        formation_id: {
            type: Schema.Types.ObjectId,
            ref: 'Formation',
            required: true,
        },
        key: {
            type: String,
            required: true,
            unique: true,
        },
        used: {
            type: Boolean,
            default: false,
        },
        used_by: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        expires_at: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true
    }
);


export const Access_key = model('AccessKey', accessKeySchema);