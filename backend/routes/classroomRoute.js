import express from 'express';
import { classroomController } from '../controllers/classroomCtrl.js';
import isAuthPrincipal from '../middlewares/isAuthPrinci.js';


const classroomRouter = express.Router();

//! Create a new classroom

classroomRouter.post('/api/v1/classrooms/create',classroomController.createClassroom);


classroomRouter.get('/api/v1/classrooms/getClassroom',classroomController.getClassroomsByTeacher);


classroomRouter.get('/api/v1/classrooms/getAllClassrooms',classroomController.getAllClassrooms);


export default classroomRouter;