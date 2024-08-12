import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Cookies, withCookies } from 'react-cookie'

const base_url = "http://localhost:4000";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_url}/api/v1/users/login`, {
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            const data = await response.data;
            // Store user data and token in localStorage
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${base_url}/api/v1/users/logout`, {}, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data || error.message);
        }
    }
)


const cookies = new Cookies();

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        loading: null,
    },
    reducers: {
        clearUser: (state) => {
            cookies.remove('token', { path: '/', domain: 'localhost' });
            state.user = null;
            state.loading = null;
            localStorage.removeItem('user');

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                console.log(action.payload);
            })
    }
})

export const { clearUser } = authSlice.actions;
export default authSlice.reducer
