//Import tools
import { Schema, model, Document } from 'mongoose';

export interface IPatientHistory extends Document {
    _id: string;
    uid: Schema.Types.ObjectId;
    title: string;
    answers: string | object;
    createdAt: Date;
    updatedAt: Date;
}

//Create the schema
const patientHistorySchema = new Schema<IPatientHistory>(
    {
        uid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        answers: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
export const Patient_history_model = model<IPatientHistory>(
    'PatientHistory',
    patientHistorySchema
);
