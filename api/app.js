import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import { client_response } from './src/utils/responses.js';

import user_router from './src/routes/user-router.js';
import formation_router from './src/routes/formation-router.js';
import enrollment_router from './src/routes/enrollment-router.js';
import test_result_router from './src/routes/test-result-router.js';
import history_router from './src/routes/history-router.js';
import auth_router from './src/routes/auth-router.js';
import like_router from './src/routes/like-router.js';
import note_router from './src/routes/note-router.js';
import task_router from './src/routes/task-router.js';
import video_router from './src/routes/video-router.js';
import post_router from './src/routes/post-router.js';

//App config
const app = express();

//Helpers
const allowedOrigins = [process.env.FRONTEND_URL, process.env.ORIGIN2];

//Middleware
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS: ${origin}`));
        }
    }
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/api/v3/user', user_router);
app.use('/api/v3/formation', formation_router);
app.use('/api/v3/enrollment', enrollment_router);
app.use('/api/v3/test_result', test_result_router);
app.use('/api/v3/history', history_router);
app.use('/api/v3/auth', auth_router);
app.use('/api/v3/like', like_router);
app.use('/api/v3/note', note_router);
app.use('/api/v3/task', task_router);
app.use('/api/v3/video', video_router);
app.use('/api/v3/post', post_router);

//Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    client_response(res, 500, 'Ha ocurrido un error, por favor intente más tarde');
});

//Export
export default app;


