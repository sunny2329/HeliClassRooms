import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const StudentNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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
                    <NavLink
                        to="/logout"
                        className={({ isActive }) => isActive ? "block px-4 py-2 text-white bg-blue-700 md:bg-transparent font-bold" : "block px-4 py-2 text-white hover:bg-blue-700 md:hover:bg-transparent"}
                    >
                        Logout
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default StudentNavbar;
