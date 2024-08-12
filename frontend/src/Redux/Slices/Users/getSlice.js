import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import axios from 'axios'
import { Cookies, withCookies } from 'react-cookie'


const base_url = "https://heliclassrooms-1.onrender.com";
const cookies = new Cookies();
export const getTeachers = createAsyncThunk(
    'getTeachers',
    async(_,{rejectWithValue}) => {
        try {
            const response = await axios.get(`${base_url}/api/v1/users/getTeachers`,{
                headers:{
                    'Content-Type' : 'application/json'
                },
                withCredentials:true
            });
            const data = await response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);


export const getStudents = createAsyncThunk(
    'getStudents',
    async(_,{rejectWithValue}) => {
        try {
            const response = await axios.get(`${base_url}/api/v1/users/getStudents`,{
                headers:{
                    'Content-Type' : 'application/json'
                },
                withCredentials:true
            });
            const data = await response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
)

export const createClassroom = createAsyncThunk(
    'createClassroom',
    async({classroomName,classroomCode, schedule,subjects, assignedTeacher},{rejectWithValue}) => {
        try {
            const token = cookies.get('token');
            const response = await axios.post(`${base_url}/api/v1/classrooms/create`,{
                classroomName,
                classroomCode,
                schedule,
                subjects,
                assignedTeacher
            },{
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
)

export const getAllClass = createAsyncThunk(
    'getAllClass',
    async(_,{rejectWithValue}) => {
        try {
            const token = cookies.get('token');
            const response = await axios.get(`${base_url}/api/v1/classrooms/getAllClassrooms`,{
                headers:{
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);



const getSlice = createSlice({
    name:'get',
    initialState:{
        teachers:[],
        loading:false,
        students:[],
        classrooms:[],
        updateId: null
    },
    reducers:{
        clearData: (state) => {
            state.teachers = [];
            state.students = [];
        },
        updateId: (state, action) => {
            state.updateId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTeachers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getTeachers.fulfilled, (state, action) => {
                state.loading = false;
                state.teachers = action.payload;
            })
            .addCase(getTeachers.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload);
            })
            .addCase(getAllClass.fulfilled,(state,action) => {
                state.loading = false;
                state.classrooms = action.payload;
            })
            .addCase(getAllClass.rejected,(state,action) => {
                state.loading = false;
                console.log(action.payload);
            })
            .addCase(getAllClass.pending,(state,action) => {
                state.loading = true;
            })
            .addCase(getStudents.pending, (state) => {
                state.loading = true;
            })
            .addCase(getStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload;
            })
            .addCase(getStudents.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload);
            })
    }
})

export const {clearData,updateId} = getSlice.actions;
export default getSlice.reducer