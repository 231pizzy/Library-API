import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import logger from 'morgan'
import {connectDatabase} from './config/database'
import userRoutes from './routes/userRoutes'

dotenv.config()
const app = express();

connectDatabase();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(logger('dev'));
app.use('/users', userRoutes)

app.listen(process.env.PORT || 4000, ()=>{
   console.log(`listening at ${process.env.PORT || 4000}`)
});

export default app;
