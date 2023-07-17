import React from 'react'
import {Route,Routes} from "react-router-dom"
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import PrivateRoute from './PrivateRoute'
import Adduser from '../pages/Adduser'

const Allroutes = () => {
  return (
    <Routes>
        <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/adduser' element={<Adduser/>} />
    </Routes>
  )
}

export default Allroutes