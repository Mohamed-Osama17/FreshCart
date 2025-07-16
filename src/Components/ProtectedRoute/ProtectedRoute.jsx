import React from 'react'
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute({ children }) {

    // console.log(children);
    if (localStorage.getItem('userToken')) {
        return children;

    } else {
        return <Navigate to={'/login'} />
    }

}
