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
        // "http://localhost:5173",
        "https://heli-class-rooms.vercel.app/"
        // careers@betterhalf.ai
    ],
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://heli-class-rooms.vercel.app");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(express.json());
app.use(cookieParser());
app.use('/', userRouter);
app.use('/', classroomRouter);


app.get('/', (req, res) => {
    res.json({
        msg: 'Backend'
    })
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('Server is running on port 4000');
})