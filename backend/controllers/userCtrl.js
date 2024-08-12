import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { User } from '../models/User.model.js';


export const userController = {
    //! register
    signup: asyncHandler(async (req, res) => {
        const { name, email,role, password } = req.body;
        console.log(req.body);
        //! hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        //! create a new user 
        const user = await User.create({
            name,
            role,
            email,
            password: hashedPassword
        })

        //! send the response
        res.json({
            message: 'User registered successfully',
            user
        })
    }),
    //! login
    login: asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        //! check if email is valid 
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid login credentials");
        }
        //! compare the user password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid login credentials");
        }
        //! Generate a token 
        const token = await jwt.sign({ id: user._id, email: user.email, name: user.name, role: user.role }, process.env.JWT_KEY, {
            expiresIn: "30d",
        })

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })


        res.json({
            message: "Login Success",
            token,
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role
        })
    }),

    //! logout 
    logout: asyncHandler(async (req, res) => {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'Lax',
        });
        res.json({ message: 'Logout successful' });
    }),


    //! Get the user
    getUser: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User not found");
        }
        res.json(user);
    }),

    //! Get all teachers
    getTeachers: asyncHandler(async (req, res) => {
        const teachers = await User.find({ role: 'teacher' });
        res.json(teachers);
    }),

    //! Get all students
    getStudents: asyncHandler(async (req,res) => {
        const students = await User.find({role:'student'});
        res.json(students);
    }),

    //! Profile
    profile: asyncHandler(async (req, res) => {
        res.json({
            message: 'User profile',
            user: req.user
        })
    }),
    //! Update the user
    updateUser: asyncHandler(async (req, res) => {
        const {id} = req.params;
        const { name, email, password } = req.body;
        const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
        if (!user) {
            throw new Error("User not found");
        }
        res.json(user);
    }),
}