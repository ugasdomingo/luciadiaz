import { Schema, model } from "mongoose";

const formationSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
            required: true,
        },
        type: {
            type: String,
            enum: ['presencial', 'live', 'online'],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        start_date: {
            type: Date,
            required: true,
        },
        categorys: [
            {
                type: String,
                required: true,
            },
        ],
        video_url: {
            type: String,
        },
        formation_cover: {
            public_id: {
                type: String,
                required: true,
            },
            secure_url: {
                type: String,
                required: true,
            },
        },
        paypal_button: {
            type: String,
        },
        status: {
            type: String,
            enum: ['inactive', 'active', 'draft'],
            required: true,
            default: 'inactive',
        },
        users_enrolled: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        likes: {
            type: Number,
            default: 0,
        },
        curriculum: [
            {
                module_number: {
                    type: Number,
                    required: true,
                },
                module_title: {
                    type: String,
                    required: true,
                },
                lessons: [
                    {
                        lesson_number: {
                            type: Number,
                            required: true,
                        },
                        lesson_title: {
                            type: String,
                            required: true,
                        },
                        lesson_description: {
                            type: String,
                            default: '',
                        },
                        lesson_type: {
                            type: String,
                            enum: ['video', 'text', 'resource'],
                            default: 'video',
                        },

                        // Video data (OPCIONAL)
                        video_data: {
                            bunny_video_id: {
                                type: String,
                            },
                            bunny_stream_url: {
                                type: String,
                            },
                            duration_seconds: {
                                type: Number,
                            },
                            thumbnail_url: {
                                type: String,
                            },
                        },

                        is_free_preview: {
                            type: Boolean,
                            default: false,
                        },
                    },
                ],
            },
        ],
        downloadables: [
            {
                file_name: {
                    type: String,
                    required: true,
                },
                file_description: {
                    type: String,
                    default: '',
                },
                file_url: {
                    type: String,
                    required: true,
                },
                file_size: {
                    type: String,
                },
                file_type: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true
    }
)

export const Formation = model('Formation', formationSchema);
