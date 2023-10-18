//Import tools
import { Schema, model, Document } from 'mongoose';

//Define Schema
const testResultsSchema = new Schema(
    {
        testTitle: {
            type: String,
            required: true,
        },
        answers: {
            type: Object,
            required: true,
        },
        uid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

//Export model
export interface ITestResult extends Document {
    testTitle: string;
    answers: object;
    uid: string;
    createdAt: Date;
    updatedAt: Date;
}

export const TestResult = model<ITestResult>('TestResults', testResultsSchema);
