import React from 'react'
import { useDispatch } from 'react-redux';
import { Link,NavLink, useNavigate } from 'react-router-dom'
import { clearUser } from '../Redux/Slices/Auth/authSlice';

function Home() {
    const navigate = useNavigate();
    
  return (
    <>
        <h1>Welcome to Classrooms</h1> 
        <button onClick={() => {
            navigate('/login')
        }}>Login</button>
    </>
  )
}

export default Home
