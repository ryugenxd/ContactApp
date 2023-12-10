import React, { useEffect, useState } from 'react'
import { useStateContext } from '../contexts/ContextProvider'
import AxiosClient from '../client/AxiosClient';
import { ToastContainer,toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const User = () => {
  const {user,setUser} = useStateContext();
  const [newname,setNewname] = useState('');
  const [newpass,setNewpass] = useState('');
  const [cpass,setCpass] = useState('');
  let {id} = useParams(); 
  const success = (message)=> toast.success(message);
  const notify = (message) => toast.warning(message);

  const UpdateProfile = ()=>{
    const data = {};
    if(newname){
      if(newname.length >= 3 ){
        data.name = newname;
      }else{
        return notify("nama minimal 3 karakter");
      }
    }
    if(newpass){
      if(newpass.length >= 8 && cpass.length >= 8){
        if(newpass != cpass){
          return notify("konfirmasi password salah");
        }
        data.password = newpass;
      }else{
        return notify("password minimal 8 karakter")
      }
    }

    AxiosClient.patch('/users/current',data).then(({data})=>{
      setUser(data);
      setNewname('');
      setNewpass('');
      setCpass('');
      if(data.name != user.name || data.password != user.password){
        return success('Updated');
      }
    }).catch(err=>{
      console.log(err);
      setNewname('');
      setNewpass('');
      setCpass('');
      return notify("Not Connect to Server");
    })
  }


  if(id){
    useEffect(()=>{
      getProfile(id);
    },[])
    return (
      <div className='p-3 grid place-items-center place-content-center min-h-screen'>
        <ToastContainer theme='dark'/>
        <div className='bg-slate-950 p-3 rounded-md'>
          <div className='p-2 mb-2'>
            <input onChange={(e)=>setNewname(e.target.value)}  className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text"  placeholder={user.name}  value={newname}/>
          </div>
          <div className='p-2 mb-2'>
            <input onChange={(e)=>setNewpass(e.target.value)} className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text"  placeholder='new password' value={newpass} />
          </div>
          <div className='p-2 mb-2'>
            <input onChange={(e)=>setCpass(e.target.value)} className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text"  placeholder='confirmation password' value={cpass}/>
          </div>
          <div className='flex w-full justify-end items-center'>
            <button onClick={UpdateProfile} className='p-2 bg-green-500 font-extrabold rounded-md'>Save</button>
          </div>
        </div>
      </div>
    )
  }else{
  return (
    <div className='p-3 grid place-items-center place-content-center min-h-screen'>
      <ToastContainer theme='dark'/>
      <div className='bg-slate-950 p-3 rounded-md'>
        <div className='p-2 mb-2'>
          <input onChange={(e)=>setNewname(e.target.value)}  className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text"  placeholder={user.name}  value={newname}/>
        </div>
        <div className='p-2 mb-2'>
          <input onChange={(e)=>setNewpass(e.target.value)} className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text"  placeholder='new password' value={newpass} />
        </div>
        <div className='p-2 mb-2'>
          <input onChange={(e)=>setCpass(e.target.value)} className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text"  placeholder='confirmation password' value={cpass}/>
        </div>
        <div className='flex w-full justify-end items-center'>
          <button onClick={UpdateProfile} className='p-2 bg-green-500 font-extrabold rounded-md'>Save</button>
        </div>
      </div>
    </div>
  )
  }
}

export default User