import React, { useState } from 'react'
import AxiosClient from '../client/AxiosClient';
import {Link} from 'react-router-dom';
const Search = () => {
  const [status,setStatus] = useState(false);
  const [response,setResponse] = useState([]);
  const [notFound,setNotFound] = useState(false);

  const search = (keyword)=>{
    setStatus(true);
    if(keyword == '' || keyword == null) {
      keyword = '';
      setResponse(null);
    }
    AxiosClient.get('/contacts?name='+keyword)
    .then((response)=>{
      setResponse(response.data.data);
      if(response.data.data.length === 0){
        setNotFound(true)
      }else{
        setNotFound(false)
      }
    }).finally(()=>{
      if(keyword == '' || keyword == null) {
        setResponse(null);
        setStatus(false);
      };
    })
    keyword = keyword;
  }

  return (
    <div className='p-3'>
      <input onChange={(e)=>search(e.target.value)} className='p-2 outline-none border-b-2 w-full bg-transparent' type='text' placeholder='Search...' autoComplete='off'/>
      <div className={`absolute left-0 w-full p-3 bg-slate-900 ${status?'flex flex-col':'hidden'} overflow-y-scroll overflow-x-hidden`} style={{maxHeight:'30vh'}}>
        {response&&response.map((val,index)=>(
          <Link key={index} to={`/contact/${val.id}`}>
            <p className='p-2 hover:bg-green-500 rounded-sm w-full'>{val.first_name}</p>
          </Link>
        ))}
        {notFound&&<p className='text-center'>Not Found</p>}
      </div>
    </div>
  )
}

export default Search
