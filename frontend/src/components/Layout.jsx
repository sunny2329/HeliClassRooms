import React from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import PrincipalNavbar from './PrincipalNavbar';
import { useSelector } from 'react-redux';
import TeacherNavbar from './TeacherNavbar';
import StudentNavbar from './StudentsNavbar';

const Layout = () => {
    const user = useSelector((state) => state.auth.user);


    const renderNavbar = () => {
        if (!user) return null;

        switch (user.role) {
            case 'principal':
                return <PrincipalNavbar />;
            case 'teacher':
                return <TeacherNavbar />;
            case 'student':
                return <StudentNavbar />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {renderNavbar()}
            <div className="flex-grow mt-6 px-2">
                <Outlet />
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
