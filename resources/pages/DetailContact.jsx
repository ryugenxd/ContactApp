import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import AxiosClient from '../client/AxiosClient';
import NotFound from './NotFound';
import { toast } from 'react-toastify';
// import AddAddressContact from '../components/AddAddressContact';

const DetailContact = () => {
  const [loading,setLoading] = useState(false);
  const [ notFound,setNotFound] = useState(false);
  const [update,setUpdate] = useState(false);
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const notifS = (m)=>toast.success(m);
  const notfE = (m)=>toast.error(m);
  

  let {id} = useParams();

  const save = ()=>{
    setLoading(true);
    AxiosClient.put(`/contacts/${id}`,{
      first_name:firstName,
      last_name:lastName,
      email,
      phone
    })
    .then(({data})=>{
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setPhone(data.phone);
      notifS('Saved');
      setLoading(false);
      setUpdate(false);
    }).catch(err=>{
      console.log(err);
      notfE('Not Connect to Server')
      setLoading(false);
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setPhone(phone);
    });
  }

  const getProfile = (id) =>{
    setLoading(true);
    AxiosClient.get(`/contacts/${id}`)
    .then(({data})=>{
     setFirstName(data.first_name);
     setLastName(data.last_name);
     setEmail(data.email);
     setPhone(data.phone);
     setLoading(false);
    }).catch(err=>{
      if(err.response.status === 404) setNotFound(true);
    })
  }
  
  useEffect(()=>{
    getProfile(id);
  },[id]);

  if(notFound){
    return (<NotFound/>)
  }else{
    if(loading) return (
      <div className='p-3'>
        <p className='text-center font-bold uppercase'>Loading ....</p>
      </div>
    );
    return (
      <div className='mb-3 p-3  w-full'>
        <div className='px-0 py-3 mb-4'>
            <Link to='/' className='p-2 bg-green-500 font-bold rounded-md flex items-center justify-center w-12'> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline font-extrabold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            </Link>
        </div>
        <div className={`grid place-items-center place-content-center w-full ${update? 'text-white': 'text-gray-400'}`} style={{height:'70vh'}}>
            <div className='p-3 rounded-xl'>
                <div className='w-full p-2 mb-2 flex justify-end items-center'>
                  <Link to={`/contact/${id}/addresses`} className='bg-slate-900 p-2 rounded-md'>Show List Address</Link>
                </div>
                <div className='flex justify-center items-center p-3'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 inline-block">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className='flex justify-end items-end p-3'>
                  <button onClick={()=>setUpdate(!update)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                </div>
                <div className='p-2 mb-2 w-full'>
                    <input onChange={(e)=>setFirstName(e.target.value)} className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text"  placeholder='first name'  autoComplete="nope" value={firstName?firstName:''} disabled={update?false:true}/>
                </div>
                <div className='p-2 mb-2 w-full'>
                    <input onChange={(e)=>setLastName(e.target.value)}  className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text" placeholder='last name (optional)'  autoComplete="nope" value={lastName?lastName:''} disabled={update?false:true}/>
                </div>
                <div className='p-2 mb-2 w-full'>
                    <input onChange={(e)=>setEmail(e.target.value)} className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="email" placeholder='email (optional)'  autoComplete="nope" value={email?email:''} disabled={update?false:true}/>
                </div>
                <div className='p-2 mb-2 w-full'>
                    <input onChange={(e)=>setPhone(e.target.value)}  className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="number" placeholder='phone'  autoComplete="nope" value={phone?phone:''} disabled={update?false:true}/>
                </div>
                <div  className={`justify-end items-end w-full ${update?'flex':'hidden'}`}>
                    <button onClick={save}  className='p-2 bg-green-500 font-extrabold rounded-md'>Save
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default DetailContact