import express from 'express';
import { userController } from '../controllers/userCtrl.js';
import isAuthPrincipal from '../middlewares/isAuthPrinci.js';
import authToken from '../middlewares/authToken.js';
import isAuthTeacher from '../middlewares/isAuthTeacher.js';

const userRouter = express.Router();


//! Register Route
userRouter.post('/api/v1/users/register/student/',isAuthTeacher,userController.signup);
userRouter.post('/api/v1/users/register/teacher/',isAuthPrincipal,userController.signup);

//! Login Route
userRouter.post('/api/v1/users/login/',userController.login);

//! logout Route 
userRouter.post('/api/v1/users/logout/',userController.logout);

//! Get all teachers
userRouter.get('/api/v1/users/getTeachers/',userController.getTeachers);

//! Get all students
userRouter.get('/api/v1/users/getStudents/',userController.getStudents);

//! Profile Route
userRouter.get('/api/v1/users/profile/',authToken,userController.profile);

//! Get the user
userRouter.get('/api/v1/users/:id/',userController.getUser);

//! Update the user
userRouter.put('/api/v1/users/update/:id/',userController.updateUser)

export default userRouter;