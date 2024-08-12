import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ component: Component, roles, ...rest }) {
    const user = useSelector((state) => state.auth.user);
    if (!user) {
        return <Navigate to='/login' />
    }
    if (roles && !roles.includes(user.role)) {
        return <Navigate to='/' />
    }
    return <Component {...rest} />
}

export default ProtectedRoute
