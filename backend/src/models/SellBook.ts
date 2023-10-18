//Import tools
import { Schema, model, Document } from 'mongoose';

//Define Schema
const sellBookSchema = new Schema(
    {
        book_id: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
        uid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        paymentRef: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pendiente', 'Aprobado', 'Rechazado'],
            default: 'Pendiente',
        },
    },
    {
        timestamps: true,
    }
);

//Export model
export interface ISellBook extends Document {
    book_id: string;
    uid: string;
    paymentRef: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export const SellBook = model<ISellBook>('SellBook', sellBookSchema);
