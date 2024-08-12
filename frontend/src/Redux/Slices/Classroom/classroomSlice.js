import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Cookies, withCookies } from 'react-cookie'


const base_url = "https://heliclassrooms-1.onrender.com";

export const getClassroomByTeacher = createAsyncThunk(
    'getClassroomByTeacher',
    async ({ teacherId }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${base_url}/api/v1/classrooms/getClassroom`,{
                teacherId,
            }, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

const classroomSlice = createSlice({
    name:'classroom',
    initialState:{
        classrooms:[],
        loading:false,
    },
    reducers:{
        clearClassrooms: (state) => {
            state.classrooms = [];
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClassroomByTeacher.pending, (state) => {
                state.loading = true;
            })
            .addCase(getClassroomByTeacher.fulfilled, (state, action) => {
                state.loading = false;
                state.classrooms = action.payload;
            })
            .addCase(getClassroomByTeacher.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload);
            });
    }
})

export const { clearClassrooms } = classroomSlice.actions;

export default classroomSlice.reducer;