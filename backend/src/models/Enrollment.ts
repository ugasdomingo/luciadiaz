//Import tools
import { Schema, model, Document } from 'mongoose';

//Define Schema
const enrollmentSchema = new Schema(
    {
        formation_id: {
            type: Schema.Types.ObjectId,
            ref: 'Formation',
            required: true,
        },
        uid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['Pendiente', 'Aprobado', 'Rechazado'],
            default: 'Pendiente',
        },
        paymentRef: {
            type: String,
        },
        notes: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

//Export model
export interface IEnrollment extends Document {
    formation_id: string;
    uid: string;
    status: string;
    paymentRef: string;
    notes: string[];
    createdAt: Date;
    updatedAt: Date;
}

export const Enrollment = model<IEnrollment>('Enrollment', enrollmentSchema);
