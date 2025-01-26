//Import tools
import { Schema, model, Document } from 'mongoose';

//Export the interface
export interface IEnrollment extends Document {
    _id: string;
    uid: Schema.Types.ObjectId;
    fid: Schema.Types.ObjectId;
    payment_method: string;
    payment_status: string;
    payment_proof: {
        public_id: string;
        secure_url: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

//Create the schema
const enrollmentSchema = new Schema<IEnrollment>(
    {
        uid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        fid: {
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
        timestamps: true,
    }
);

//Export the model
export const Enrollment_model = model<IEnrollment>(
    'Enrollment',
    enrollmentSchema
);
