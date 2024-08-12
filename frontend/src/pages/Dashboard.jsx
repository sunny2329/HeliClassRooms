import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { clearUser } from '../Redux/Slices/Auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Redux/Slices/Auth/authSlice';
import PrincipalDash from '../components/PrincipalDash';

function Dashboard() {
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
        <>
            <PrincipalDash/>
        </>
    )
}

export default Dashboard
