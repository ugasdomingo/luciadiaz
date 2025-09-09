import { Schema, model } from "mongoose";


const patientHistorySchema = new Schema(
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
        answers: {
            type: String, // Crypto
            required: true,
        }
    },
    {
        timestamps: true
    }
)

export const Patient_history = model('PatientHistory', patientHistorySchema);
