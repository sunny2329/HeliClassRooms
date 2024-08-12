import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { loginUser } from "../Redux/Slices/Auth/authSlice";
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const [userInfo,setUserInfo] = useState({});
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if(user){
            navigate('/dashboard')
        }
    },[])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginUser(userInfo));
            if(result.payload){
                console.log("Login Success",result.payload);
                navigate('/dashboard')
            }
            console.log(result,'result');
        } catch (error) {
            console.log(error);
        }

    }


    console.log(userInfo,'info');

    return (
        <div className="flex items-center justify-center h-screen w-full px-5 sm:px-0">
            <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-md w-full">
                {/* <div
                    className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
                    style={{
                        backgroundImage: `url(https://www.tailwindtap.com//assets/components/form/userlogin/login_tailwindtap.jpg)`,
                    }}
                ></div> */}
                <div className="w-full p-8 lg:w-[100%]">
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Email Address
                        </label>
                        <input
                            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mt-4 flex flex-col justify-between">
                        <div className="flex justify-between">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                        </div>
                        <input
                            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                            type="password"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-8">
                        <button onClick={handleSubmit} className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
