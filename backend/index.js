import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser'
import classroomRouter from './routes/classroomRoute.js';
import cors from 'cors'
const app = express();
import dotenv from 'dotenv';
dotenv.config();


mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((e) => console.error(e));

//! Cors config
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "https://heli-class-rooms.vercel.app/"
    ],
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use('/', userRouter);
app.use('/',classroomRouter);


app.get('/', (req, res) => {
    res.json({
        msg: 'hello word'
    })
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('Server is running on port 4000');
})