import React, { useState } from 'react'
import { useParams,Link } from 'react-router-dom';
import AxiosClient from '../client/AxiosClient';
import { toast } from 'react-toastify';

const CreateAddress = () => {
  const [ street,setStreet] = useState('');
  const [city,setCity] = useState('');
  const [province,setProvince] = useState('');
  const [country,setCountry] = useState('');
  const [postal_code,setPostalCode] = useState('');
  const notifS =(message)=> toast.success(message);
  let {contactId} = useParams();
  const createHandler = ()=>{
    AxiosClient.post(`/contacts/${contactId}/addresses`,{
      street,
      city,
      province,
      country,
      postal_code
    })
    .then(({data})=>{
      notifS("Saved");
    })
    .catch((err)=>{
      console.log(err);
    });
  }
  return (
    <div className='px-0 py-3'>
        <div className='px-0 py-3 mb-4'>
            <Link to={`/contact/${contactId}/addresses`} className='p-2 bg-green-500 font-bold rounded-md flex items-center justify-center w-12'> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline font-extrabold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            </Link>
        </div>
        <div className='grid place-items-center place-content-center w-full' style={{height:'70vh'}}>
            <div className='p-3 outline outline-cyan-500 outline-1 rounded-xl'>
                <div className='p-2 mb-2 w-full'>
                    <input onChange={(e)=>setStreet(e.target.value)} className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text"  placeholder='street (optional)' value={street} autoComplete="nope"/>
                </div>
                <div className='p-2 mb-2 w-full'>
                    <input onChange={(e)=>setCity(e.target.value)} className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text" placeholder='city (optional)' value={city} autoComplete="nope"/>
                </div>
                <div className='p-2 mb-2 w-full'>
                    <input onChange={(e)=>setProvince(e.target.value)} className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text" placeholder='province (optional)' value={province} autoComplete="nope"/>
                </div>
                <div className='p-2 mb-2 w-full'>
                    <input onChange={(e)=>setCountry(e.target.value)} className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text" placeholder='country' value={country} autoComplete="nope"/>
                </div>
                <div className='p-2 mb-2 w-full'>
                    <input onChange={(e)=>setPostalCode(e.target.value)} className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text" placeholder='postal code (optional)' value={postal_code} autoComplete="nope"/>
                </div>
                <div className='flex justify-end items-end w-full'>
                    <button onClick={createHandler} className='p-2 bg-green-500 font-extrabold rounded-md'>Save
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

export default CreateAddress