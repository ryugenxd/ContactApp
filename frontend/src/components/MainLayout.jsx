import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {useStateContext} from '../contexts/ContextProvider'
import Navbar from './Navbar';;




const MainLayout = () => {
    const {token} = useStateContext();
    if(!token){
      return <Navigate to="/login"/>
    }

  return (
    <div className='p-3 text-white font-gen min-h-screen'>
      <Navbar/>
      <Outlet/>
    </div>
  )
}

export default MainLayout
