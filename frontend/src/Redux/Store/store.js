import {configureStore} from '@reduxjs/toolkit';
import authSlice from '../Slices/Auth/authSlice';
import getSlice from '../Slices/Users/getSlice.js'

const store = configureStore({
    reducer:{
        auth: authSlice,
        get: getSlice
    },
})

export default store;