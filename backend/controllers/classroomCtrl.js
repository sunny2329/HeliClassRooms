import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler'
import { Classroom } from '../models/Classroom.model.js';


export const classroomController = {
    //! Get all classrooms
    getAllClassrooms: asyncHandler(async (req,res) => {
        const classrooms = await Classroom.find({});
        if(!classrooms){
            res.json({message:"No classrooms found"});
        }
        res.json(classrooms);
    }),
    //! Get classroom by teacher id
    getClassroomsByTeacher: asyncHandler(async (req,res) => {
        const {teacherId} = req.body;
        const classrooms = await Classroom.find({assignedTeacher:teacherId});
        if(!classrooms){
            res.json({message:"No classrooms found for this teacher"});
        }
        res.json(classrooms);
    }),
    //! Get a single classroom by id
    getClassroom : asyncHandler(async (req,res) => {
        const {id} = req.params;
        const classroom = await Classroom.findById(id);
        if(!classroom){
            throw new Error("Classroom not found");
        }
        res.json(classroom);
    }),
    //! Create a new classroom
    createClassroom: asyncHandler(async (req,res) => {
        const {classroomName, classroomCode, schedule, assignedTeacher,subjects} = req.body;
        const classroom = await Classroom.create({
            classroomName,
            classroomCode,
            schedule,
            assignedTeacher,
            subjects
        });
        //! Send the response
        res.json({
            message: 'Classroom created successfully',
            classroom
        })
    })
}