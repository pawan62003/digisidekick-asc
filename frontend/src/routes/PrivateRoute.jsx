import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const auth = localStorage.getItem("digi-asc")
    if(!auth){
        <Navigate to={'/signup'} />
    }
    
  return children;
}

export default PrivateRoute