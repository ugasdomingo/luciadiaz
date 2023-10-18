//Import Tools
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

//Import Routes
import userRouter from './src/routes/userRouter';
import testResultRouter from './src/routes/testResultRouter';
import bookRouter from './src/routes/bookRouter';
import sellBookRouter from './src/routes/sellBookRouter';
import postRouter from './src/routes/postRouter';
import formationRouter from './src/routes/formationRouter';
import enrollmentRouter from './src/routes/enrollmentRouter';

//Define app
const app = express();

const allowedOrigins = [
    process.env.ORIGIN1 as string,
    process.env.ORIGIN2 as string,
    process.env.ORIGIN3 as string,
];

//Middleware
app.use(
    cors({
        origin: function (origin: any, callback: any) {
            if (allowedOrigins.includes(origin)) {
                return callback(null, origin);
            }
            return callback(
                'Error CORS, origin: ' + origin + ', No autorizado'
            );
        },
        credentials: true,
    })
);
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/v1', userRouter);
app.use('/api/v1/test-results', testResultRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/sell-books', sellBookRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/formations', formationRouter);
app.use('/api/v1/enrollments', enrollmentRouter);

//Export app
export default app;
