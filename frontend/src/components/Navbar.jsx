import React ,{useState} from 'react'
import AxiosClient from '../client/AxiosClient';
import { ToastContainer,toast} from 'react-toastify';
import { useStateContext } from '../contexts/ContextProvider';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const {setToken,user,setUser} = useStateContext();
    const [message,setMessage] = useState();
    const notify = (message) => toast.warning(message);

    const Logout = ()=>{
        setMessage("Gagal terhubung dengan server !");
        AxiosClient.delete('/users/logout')
        .then((response)=>{
          const {data} = response.data;
          if(data){
            setToken(null);
            setUser(null);
            
          }
        })
        .catch((err)=>{
          notify(message);
          console.log(err);
        })
    }
    
 if(user){
    return (
        <div className='flex w-full justify-center items-center bg-slate-950 rounded-xl text-white'>
            <div className='flex-4 p-3 w-full rounded-md'>
              <Link to='/'>
              <h3 className='font-title cursor-pointer'>
                My Contact
                <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 inline">
                  <path  fillRule="evenodd" d="M3.75 4.5a.75.75 0 01.75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 01-.75-.75V4.5zm0 6.75a.75.75 0 01.75-.75h.75a8.25 8.25 0 018.25 8.25v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.75a6 6 0 00-6-6H4.5a.75.75 0 01-.75-.75v-.75zm0 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                </svg>
              </h3>
              </Link>
            </div>
            <div className='flex-2 p-3 w-full flex justify-end'>
              <Link to="/profile" className='inline-block p-2 capitalize cursor-pointer'>
                <span className='whitespace-nowrap'>{user.name}</span>
              </Link>
              <button className='p-2 bg-red-500 rounded-md font-bold' onClick={Logout}>Logout</button>
            </div>
              <ToastContainer theme="dark" />
        </div>
      )
 }else{
    return (
        <div className='flex w-full justify-center items-center text-white bg-slate-950'>
            <div className='flex-4 p-3 w-full rounded-md'>
              <h3 className='font-title font-extrabold'>My Contact <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 inline">
              <path  fillRule="evenodd" d="M3.75 4.5a.75.75 0 01.75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 01-.75-.75V4.5zm0 6.75a.75.75 0 01.75-.75h.75a8.25 8.25 0 018.25 8.25v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.75a6 6 0 00-6-6H4.5a.75.75 0 01-.75-.75v-.75zm0 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
            </svg></h3>
            </div>
            <div className='flex-2 p-3 w-full flex justify-end'>
               <Link className='p-2 bg-green-500 rounded-md uppercase font-bold m-2' to="/register">Signup</Link>
               <Link className='p-2 bg-blue-500 rounded-md uppercase font-bold m-2' to="/login">Signin</Link>
            </div>
        </div>
      )
 }

  
}

export default Navbar