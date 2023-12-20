import React, { useEffect ,useState} from 'react'
import { useParams ,Link} from 'react-router-dom'
import AxiosClient from '../client/AxiosClient';
import { toast } from 'react-toastify';
const DetailAddress = () => {
  const [street,setStreet] = useState('');
  const [city,setCity] = useState('');
  const [province,setProvince] = useState('');
  const [country,setCountry] = useState('');
  const [postal_code,setPostalCode] = useState('');
  const [update,setUpdate] = useState(false);
  const {contactId} = useParams();
  const {addressId} = useParams();
  const notifS =(message)=> toast.success(message);


  const setAddress = ()=>{
    AxiosClient.put(`/contacts/${contactId}/addresses/${addressId}`,{
      street,
      city,
      province,
      country,
      postal_code
    })
    .then((response)=>{
      notifS('Updated');
      console.log(response);
      setUpdate(false);
    })
    .catch(err=>{
      console.log(err);
    })
  }
   

    useEffect(()=>{
      AxiosClient.get(`contacts/${contactId}/addresses/${addressId}`)
      .then((response)=>{
        //console.log(response);
        setStreet(response.data.street);
        setCity(response.data.city);
        setProvince(response.data.province);
        setCountry(response.data.country);
        setPostalCode(response.data.postal_code);
      })
      .catch((errors)=>{
        console.log(errors);
      })
    },[]);
    return (
      <div className={`bg-slate-950 rounded-xl w-full `}>
            <div className='w-full p-2 bg-slate-900 flex justify-end items-center'>
              <div className='text-center w-full font-extrabold'>
                Address
              </div>
              <Link to={`/contact/${contactId}/addresses`} className='p-2 text-red-500 font-extrabold'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>
            </div>
            <div className='p-3'>
              <div className='flex justify-end items-center w-full p-3'>
                <button onClick={()=>setUpdate(!update)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                </button> 
              </div>
              <div className='p-2 mb-2 w-full flex justify-center items-center'>
                <input  className={`p-3 m-0 bg-slate-900 focus:outline-none rounded-md  ${update? 'text-white': 'text-gray-400'}`} type="text"  onChange={(e)=>setStreet(e.target.value)} placeholder='street (optional)'  autoComplete="nope" value={street??''} disabled={update?false:true}/>
              </div>
              <div className='p-2 mb-2 w-full flex justify-center items-center'>
                <input  className={`p-3 m-0 bg-slate-900 focus:outline-none rounded-md  ${update? 'text-white': 'text-gray-400'}`} type="text" onChange={(e)=>setCity(e.target.value)} placeholder='city (optional)'  autoComplete="nope" value={city??''} disabled={update?false:true}/>
              </div>
              <div className='p-2 mb-2 w-full flex justify-center items-center'>
                <input  className={`p-3 m-0 bg-slate-900 focus:outline-none rounded-md  ${update? 'text-white': 'text-gray-400'}`} type="text" onChange={(e)=>setProvince(e.target.value)}  placeholder='province (optional)'  autoComplete="nope" value={province??''} disabled={update?false:true}/>
              </div>
              <div className='p-2 mb-2 w-full flex justify-center items-center'>
                <input   className={`p-3 m-0 bg-slate-900 focus:outline-none rounded-md  ${update? 'text-white': 'text-gray-400'}`} type="text" onChange={(e)=>setCountry(e.target.value)}  placeholder='country'  autoComplete="nope" value={country??''} disabled={update?false:true}/>
              </div>
              <div className='p-2 mb-2 w-full flex justify-center items-center'>
                <input  className={`p-3 m-0 bg-slate-900 focus:outline-none rounded-md  ${update? 'text-white': 'text-gray-400'}`} type="text" onChange={(e)=>setPostalCode(e.target.value)}  placeholder='postal code (optional)'  autoComplete="nope" value={postal_code??''} disabled={update?false:true}/>
              </div>
              <div  className={`justify-end items-end w-full ${update?'flex':'hidden'}` }>
                <button onClick={setAddress}   className='p-2 bg-green-500 font-extrabold rounded-md'>Set Address
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
    );
}

export default DetailAddress