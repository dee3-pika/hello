import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import { config } from 'dotenv';
import { dbConnection } from './database/dbConnection.js';
import jobRouter from './routes/jobRoutes.js';
import userRouter from './routes/userRoutes.js';
import applicationRouter from './routes/applicationRoutes.js';
import { errorMiddleware } from './middlewares/error.js';
import dotenv from 'dotenv';
dotenv.config();

config({ path: './config/config.env' });

const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/job', jobRouter);
app.use('/api/v1/application', applicationRouter);

app.use(errorMiddleware);

const mongoDB = process.env.MONGO_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;