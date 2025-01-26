//Import tools
import { Schema, model, Document } from 'mongoose';

//Export the interface
export interface ITask extends Document {
    _id: string;
    uid: Schema.Types.ObjectId | string;
    task: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

//Create the schema
const taskSchema = new Schema<ITask>(
    {
        uid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        task: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pendiente', 'Completada'],
            default: 'Pendiente',
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
export const Task_model = model<ITask>('Task', taskSchema);
