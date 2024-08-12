import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'

const base_url = "https://heliclassrooms-1.onrender.com";

export const registerTeacher = createAsyncThunk(
    'registerTeacher',
    async ({name,email,password},{rejectWithValue}) => {
        try {
            const response = await axios.post(`${base_url}/api/v1/users/register/student`,{
                name,
                email,
                password,
                role:'teacher'
            },{
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            const data = await response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
);

export const registerStudent = createAsyncThunk(
    'registerStudent',
    async ({name,email,password},{rejectWithValue}) => {
        try {
            const response = await axios.post(`${base_url}/api/v1/users/register/student`,{
                name,
                email,
                password,
                role:'student'
            },{
                headers:{
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            const data = await response.data;
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
)

const registerSlice = createSlice({
    name:'users',
    initialState:{
        teachers:[],
        students:[],
        loading:false,
    }
})