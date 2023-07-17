import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import PrivateRoute from './PrivateRoute'

const Allroutes = () => {
  return (
    <Routes>
        <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route path='/signup' element={<Signup/>} />
    </Routes>
  )
}

export default Allroutes