import React, { useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import AxiosClient from '../client/AxiosClient';

const Register = () => {
    const {setToken,setUser} = useStateContext();
    const [name,setName] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmation,setConrifmation] = useState('');

    const RegisterHandler = ()=>{
      if(password != confirmation) return alert('not confirmation !');
      AxiosClient.post('/users',{
        name,
        username,
        password
      }).then(({data})=>{
        setToken(data.token);
        setUser(data);
      }).catch((error)=>{
          console.log(error);
      });
    }

    return (
        <div className='grid place-items-center place-content-center h-screen p-3 bg-slate-800 text-white font-gen'>
        <div className='p-3 bg-slate-900 rounded-md'>
          <h1 className="font-title w-full text-center p-3 font-extrabold uppercase bg-blue-600 rounded-md mb-3">
            My Contact <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 inline">
              <path  fillRule="evenodd" d="M3.75 4.5a.75.75 0 01.75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 01-.75-.75V4.5zm0 6.75a.75.75 0 01.75-.75h.75a8.25 8.25 0 018.25 8.25v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.75a6 6 0 00-6-6H4.5a.75.75 0 01-.75-.75v-.75zm0 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
            </svg>
          </h1>
          <div className='mb-3'>
            <input onChange={(e)=>setName(e.target.value)}  className="p-3 rounded-md bg-slate-800 focus:outline-none" type="text"  placeholder='name' value={name}/>
          </div>
          <div className='mb-3'>
            <input onChange={(e)=>setUsername(e.target.value)} className="p-3 rounded-md bg-slate-800 focus:outline-none" type="text"  placeholder='username' value={username}/>
          </div>
          <div className='mb-3'>
            <input onChange={(e)=>setPassword(e.target.value)} className="p-3 rounded-md bg-slate-800 focus:outline-none" type="password" placeholder='password' value={password}/>
          </div>
          <div className='mb-3'>
            <input onChange={(e)=>setConrifmation(e.target.value)} className="p-3 rounded-md bg-slate-800 focus:outline-none" type="password" placeholder='confirmation password' value={confirmation}/>
          </div>
          <div className='flex justify-end items-center w-full'>
            <button onClick={RegisterHandler} className='p-3 bg-blue-700 rounded-md uppercase font-title'>Signup</button>
          </div>
        </div>
      </div>
  )
}

export default Register