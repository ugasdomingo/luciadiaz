//Import tools
import { Schema, model, Document } from 'mongoose';

//Export the interface
export interface INote extends Document {
    _id: string;
    uid: Schema.Types.ObjectId | string;
    reason: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}

//Create the schema
const noteSchema = new Schema<INote>(
    {
        uid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reason: {
            type: String,
            required: true,
        },
        notes: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
export const Note_model = model<INote>('Note', noteSchema);
