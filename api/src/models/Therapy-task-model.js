import { Schema, model } from "mongoose";

const therapyTaskSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        task: {
            type: String, // Crypto
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'cancelled'],
            default: 'pending',
        },
        observations: {
            type: String, // Crypto
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const Therapy_task = model('TherapyTask', therapyTaskSchema);
