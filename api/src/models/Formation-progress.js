import { Schema, model } from "mongoose";

const formationProgressSchema = new Schema(
    {
        enrollment_id: {
            type: Schema.Types.ObjectId,
            ref: 'Enrollment',
            required: true,
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        formation_id: {
            type: Schema.Types.ObjectId,
            ref: 'Formation',
            required: true,
        },

        // Registro de cada vez que el usuario accede al dashboard del curso
        access_log: [
            {
                accessed_at: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],

        // Progreso por lección
        lessons_progress: [
            {
                // Identificador único: "module_1_lesson_3"
                lesson_id: {
                    type: String,
                    required: true,
                },

                // Para videos
                video_progress: {
                    last_watched_second: {
                        type: Number,
                        default: 0,
                    },
                    total_watched_percentage: {
                        type: Number,
                        default: 0,
                        min: 0,
                        max: 100,
                    },
                    status: {
                        type: String,
                        enum: ['pendiente', 'comenzado', 'en progreso', 'completado'],
                        default: 'pendiente',
                    },
                    completed_at: {
                        type: Date,
                    },
                },

                // Para descargables (registro de cada descarga)
                downloads: [
                    {
                        downloaded_at: {
                            type: Date,
                            default: Date.now,
                        },
                    },
                ],
            },
        ],

        // Porcentaje general del curso (calculado automáticamente)
        overall_progress_percentage: {
            type: Number,
            default: 0,
            min: 0,
            max: 100,
        },

        // Última vez que accedió al curso
        last_accessed: {
            type: Date,
            default: Date.now,
        },

        // Fecha de completado total del curso
        completed_at: {
            type: Date,
        },
    },
    {
        timestamps: true
    }
);

// Índices para búsquedas rápidas
formationProgressSchema.index({ user_id: 1, formation_id: 1 });
formationProgressSchema.index({ enrollment_id: 1 });

export const Progress = model('Progress', formationProgressSchema);