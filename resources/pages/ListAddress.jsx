import React, { useEffect, useState } from 'react'
import { useParams ,Link} from 'react-router-dom'
import AxiosClient from '../client/AxiosClient';
import { useStateContext } from '../contexts/ContextProvider';
import AddressItem from '../components/AddressItem';
import ButtonAdd from '../components/ButtonAdd';

const ListAddress = () => {
  const {contactId} = useParams();
  const [loading,setLoading] = useState(false);
  const {addresses,setAddresses} = useStateContext();

  const DeleteAddress = (id)=>{
    setLoading(true);
    AxiosClient.delete(`/contacts/${contactId}/addresses/${id}`)
    .then((response)=>{
      console.log(response);
    }).catch(err=>{
      console.log(err);
    });
    getInfoAddresses();
  }

  const getInfoAddresses = ()=>{
    AxiosClient.get(`/contacts/${contactId}/addresses`)
    .then((response)=>{
      setLoading(false);
      const {data} = response.data;
      setAddresses(data);
    }).catch(err=>{
      console.log(err);
    })

  }

  useEffect(()=>{
    setLoading(true);
    getInfoAddresses();
  },[]);


  
  if(loading){
    return (
      <p className='text-center p-3 font-extrabold uppercase'>Loading ....</p>
    )
  }else{
    return (
      <div className='mb-2 px-0 py-3 relative flex justify-center items-center flex-col w-full'>
        <div className='px-0 py-3 mb-4 flex justify-start items-center w-full'>
            <Link to={`/contact/${contactId}`} className='p-2 bg-green-500 font-bold rounded-md flex items-center justify-center w-12'> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline font-extrabold">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            </Link>
        </div>
        <div className='w-full flex justify-end items-center'>
          <div className='p-3'>
            <ButtonAdd to={`/contact/address/create/${contactId}`} className="flex justify-center items-center gap-2 bg-green-500 p-2 outline outline-cyan-500 outline-1 rounded-xl font-bold" text="ADD ADDRESS" />
          </div>
        </div>
          {addresses&&addresses.map((item,index)=>(
           <AddressItem  key={item.id} item={item} contactId={contactId}  deleteHandler={DeleteAddress}/>
          ))} 
      </div>
    )
  }
}

export default ListAddress