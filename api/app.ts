//Import tools
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

//Import routes
import auth_router from './src/routes/user-router';
import test_result_router from './src/routes/test-result-router';
import patient_history_router from './src/routes/patient-history-router';
import medical_record_router from './src/routes/medical-record-router';
import medical_data_router from './src//routes/medical-data-router';
import task_router from './src/routes/therapy/task-router';
import note_router from './src/routes/therapy/note-router';
import formation_router from './src/routes/formation/formation-router';
import enrollment_router from './src/routes/formation/enrollment-router';
import video_router from './src/routes/content/video-router';
import post_router from './src/routes/content/post-router';

//Initialize app
const app = express();

const allowedOrigins = [
    process.env.ORIGIN1 as string,
    process.env.ORIGIN2 as string,
];

//Middlewares
app.use(
    cors({
        origin: function (origin: any, callback: any) {
            if (allowedOrigins.includes(origin)) {
                return callback(null, origin);
            }
            return callback('Error CORS, origin:' + origin + ' not allowed');
        },
        credentials: true,
    })
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/api/v1/auth', auth_router);
app.use('/api/v1/test-result', test_result_router);
app.use('/api/v1/patient-history', patient_history_router);
app.use('/api/v1/medical-record', medical_record_router);
app.use('/api/v1/medical-data', medical_data_router);
app.use('/api/v1/therapy/task', task_router);
app.use('/api/v1/therapy/note', note_router);
app.use('/api/v1/formation', formation_router);
app.use('/api/v1/enrollment', enrollment_router);
app.use('/api/v1/content/video', video_router);
app.use('/api/v1/content/post', post_router);

//Export app
export default app;
