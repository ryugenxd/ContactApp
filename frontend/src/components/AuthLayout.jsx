import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {useStateContext} from '../contexts/ContextProvider'
import Navbar from './Navbar';
const AuthLayout = () => {
  const {token} = useStateContext();

  if(token){
    return <Navigate to="/"/>
  }

  return (
    <div>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default AuthLayout