//Import tools
import { Schema, model, Document } from 'mongoose';

//Export the interface
export interface INumber extends Document {
    _id: string;
    last_historical_number: number;
    createdAt: Date;
    updatedAt: Date;
}

//Create the schema
const historicalSchema = new Schema<INumber>(
    {
        last_historical_number: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
export const Historical_model = model<INumber>('Historical', historicalSchema);
