import { Schema, model } from "mongoose";

const testResultSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        test_name: {
            type: String,
            required: true,
        },
        results: {
            type: String, // Crypto
            required: true,
        },
        expiresAt: {
            type: Date,
            default: Date.now() + 180 * 24 * 60 * 60 * 1000,
        },
    },
    {
        timestamps: true
    }
)

export const Test_result = model('TestResult', testResultSchema);
