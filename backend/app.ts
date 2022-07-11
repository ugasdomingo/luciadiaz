//Import Tools
import express from "express";
import cors from "cors";
import morgan from "morgan";
import blogRouter from "./routes/blogRouter";
import registerRouter from "./routes/registerRouter"; 

//Define app
const app = express()

//Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api/blog', blogRouter);
app.use('/api/self-register', registerRouter);

//Export app
export default app