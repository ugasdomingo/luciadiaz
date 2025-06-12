import { Schema, model } from "mongoose";

const therapyNoteSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reason: {
            type: String, // Crypto
            required: true,
        },
        notes: {
            type: String, // Crypto
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const Therapy_note = model('TherapyNote', therapyNoteSchema);
