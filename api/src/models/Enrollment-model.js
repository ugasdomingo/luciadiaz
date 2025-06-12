import { Schema, model } from "mongoose";

const enrollmentSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        formation_id: {
            type: Schema.Types.ObjectId,
            ref: 'Formation',
            required: true,
        },
        payment_method: {
            type: String,
            required: true,
        },
        payment_status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            required: true,
        },
        payment_proof: {
            public_id: {
                type: String,
            },
            secure_url: {
                type: String,
            },
        },
    },
    {
        timestamps: true
    }
)

export const Enrollment = model('Enrollment', enrollmentSchema);
