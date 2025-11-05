import { Schema, model } from "mongoose";

const accessKeySchema = new Schema(
    {
        formation_id: {
            type: Schema.Types.ObjectId,
            ref: 'Formation',
            required: true,
        },
        key: {
            type: String,
            required: true,
            unique: true,
        },
        used: {
            type: Boolean,
            default: false,
        },
        used_by: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        expires_at: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

// Índice para búsquedas rápidas por clave
accessKeySchema.index({ key: 1 });

// Índice para búsquedas por formación
accessKeySchema.index({ formation_id: 1 });

export const Access_key = model('AccessKey', accessKeySchema);