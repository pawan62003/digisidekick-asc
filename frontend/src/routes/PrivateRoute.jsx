import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const auth = localStorage.getItem("digi-asc")
    console.log(auth.length)
    if(auth.length===0){
       return <Navigate to={'/signup'} />
    }
    
  return children;
}

export default PrivateRoute