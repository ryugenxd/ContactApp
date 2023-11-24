import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AxiosClient from '../client/AxiosClient';
import NotFound from './NotFound';
import { toast } from 'react-toastify';

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
    }).catch(err=>{
      console.log(err);
      notfE('Not Connect to Server')
      setLoading(false);
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setPhone(phone);
    });
    setUpdate(false);
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
      <div className='mb-3 p-3'>
        <div className='flex justify-end items-end p-3'>
          <button onClick={()=>setUpdate(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
        </div>
        <div className={`grid place-items-center place-content-center w-full ${update? 'text-white': 'text-gray-400'}`} style={{height:'70vh'}}>
            <div className='p-3 outline outline-cyan-500 outline-1 rounded-xl'>
                <div className='p-2 mb-2 w-full'>
                    <input onChange={(e)=>setFirstName(e.target.value)} className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text"  placeholder='first name'  autoComplete="nope" value={firstName} disabled={update?false:true}/>
                </div>
                <div className='p-2 mb-2 w-full'>
                    <input onChange={(e)=>setLastName(e.target.value)}  className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text" placeholder='last name'  autoComplete="nope" value={lastName} disabled={update?false:true}/>
                </div>
                <div className='p-2 mb-2 w-full'>
                    <input onChange={(e)=>setEmail(e.target.value)} className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="email" placeholder='email'  autoComplete="nope" value={email} disabled={update?false:true}/>
                </div>
                <div className='p-2 mb-2 w-full'>
                    <input onChange={(e)=>setPhone(e.target.value)}  className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="number" placeholder='phone'  autoComplete="nope" value={phone} disabled={update?false:true}/>
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