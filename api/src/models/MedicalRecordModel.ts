//Import tools
import { Schema, model, Document } from 'mongoose';

//Export the interface
export interface IMedicalRecord extends Document {
    _id: string;
    uid: Schema.Types.ObjectId;
    medical_record: string;
    patient_history: Schema.Types.ObjectId[] | string[];
    history_completed: boolean;
    test_results: Schema.Types.ObjectId[] | string[];
    send_audio_tests: boolean;
    liked_posts: Schema.Types.ObjectId[] | string[];
    liked_formations: Schema.Types.ObjectId[] | string[];
    liked_videos: Schema.Types.ObjectId[] | string[];
    therapies_notes: Schema.Types.ObjectId[] | string[];
    formations_enrolled: Schema.Types.ObjectId[] | string[];
    assigned_tasks: Schema.Types.ObjectId[] | string[];
    createdAt: Date;
    updatedAt: Date;
}

//Create the schema
const medicalRecordSchema = new Schema<IMedicalRecord>(
    {
        uid: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        medical_record: {
            type: String,
            required: true,
            unique: true,
        },
        patient_history: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'PatientHistory',
                },
            ],
        },
        history_completed: {
            type: Boolean,
            default: false,
        },
        test_results: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'TestResult',
                },
            ],
        },
        send_audio_tests: {
            type: Boolean,
            default: false,
        },
        liked_posts: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Post',
                },
            ],
        },
        liked_formations: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Formation',
                },
            ],
        },
        liked_videos: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Audio',
                },
            ],
        },
        therapies_notes: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'TherapyNote',
                },
            ],
        },
        formations_enrolled: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Formation',
                },
            ],
        },
        assigned_tasks: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Task',
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

//Export the model
export const Medical_record_model = model<IMedicalRecord>(
    'MedicalRecord',
    medicalRecordSchema
);
