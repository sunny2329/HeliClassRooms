import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { logout } from '../Redux/Slices/Auth/authSlice';
import { clearUser } from '../Redux/Slices/Auth/authSlice';

const TeacherNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await dispatch(logout());
        await dispatch(clearUser());
    }
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user])
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold">
                    <NavLink to="/">MyApp</NavLink>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
                <div className={`flex flex-col md:flex-row md:items-center md:space-x-4 absolute md:relative w-full md:w-auto bg-blue-600 md:bg-transparent z-20 left-0 md:left-auto top-16 md:top-auto ${isOpen ? 'block' : 'hidden md:flex'}`}>
                    <NavLink
                        to="/register/student"
                        className={({ isActive }) => isActive ? "block px-4 py-2 text-white bg-blue-700 md:bg-transparent font-bold" : "block px-4 py-2 text-white hover:bg-blue-700 md:hover:bg-transparent"}
                    >
                        Register Student
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) => isActive ? "block px-4 py-2 text-white bg-blue-700 md:bg-transparent font-bold" : "block px-4 py-2 text-white hover:bg-blue-700 md:hover:bg-transparent"}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to="/classrooms"
                        className={({ isActive }) => isActive ? "block px-4 py-2 text-white bg-blue-700 md:bg-transparent font-bold" : "block px-4 py-2 text-white hover:bg-blue-700 md:hover:bg-transparent"}
                    >
                        Classrooms
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="rounded-xl bg-purple-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-purple-600 active:bg-purple-700 dark:bg-purple-400 dark:text-white dark:hover:bg-purple-300 dark:active:bg-purple-200">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default TeacherNavbar;
