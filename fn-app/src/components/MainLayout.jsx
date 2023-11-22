import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import {useStateContext} from '../contexts/ContextProvider'
import AxiosClient from '../client/AxiosClient';
const MainLayout = () => {
    const {token,setToken,user,setUser} = useStateContext()
    if(!token){
      return <Navigate to="/login"/>
    }

    const Logout = ()=>{
      AxiosClient.delete('/users/logout')
      .then((response)=>{
        const {data} = response.data;
        if(data){
          setToken(null);
          setUser(null);
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  return (
    <div>
      <nav className='p-3'>
        <span>{user.name}</span>
        <button onClick={Logout}>Logout</button>
      </nav>
        <Outlet/>
    </div>
  )
}

export default MainLayout