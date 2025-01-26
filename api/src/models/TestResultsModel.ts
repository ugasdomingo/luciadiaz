//Import tools
import { Schema, model, Document } from 'mongoose';

//Export the interface
export interface ITestResult extends Document {
    _id: string;
    uid: Schema.Types.ObjectId;
    title: string;
    results: string | object;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

//Create the schema
const testResultsSchema = new Schema<ITestResult>(
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
        results: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Date,
            default: Date.now() + 180 * 24 * 60 * 60 * 1000,
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
export const Test_result_model = model<ITestResult>(
    'TestResult',
    testResultsSchema
);
