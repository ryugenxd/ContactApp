import React from 'react'
import AxiosClient from '../client/AxiosClient';
import { useStateContext } from '../contexts/ContextProvider';

const ButtonPagination = ({item}) => {
  const {setContacs} = useStateContext();
  const getDataContact = () => {
    if(!item.url) return false;
    AxiosClient.get(`/${item.url.split('api/')[1]}`)
    .then(({data})=>{
      setContacs(data);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <button
    onClick={getDataContact}
    className={`p-2 ${item.active?'bg-green-600':'bg-slate-900'} text-lg whitespace-nowrap`}
    dangerouslySetInnerHTML={{ __html:item.label}}>
    </button>
  )
}

export default ButtonPagination
