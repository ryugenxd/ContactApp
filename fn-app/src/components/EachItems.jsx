import React, { useEffect, useState } from 'react'
import FrameItem from './FrameItem';
import AxiosClient from '../client/AxiosClient';
import ScrollContainer from './ScrollContainer';
import { toast } from 'react-toastify';

const EachItems = () => {
    const [items,setItems] = useState([]);
    const [loading,setLoading] = useState(false);
    const Notify = (m)=>toast.error(m);

    useEffect(()=>{
      getDataContact();
      console.log(items??items);
    },[]);

    const deleteData = (id) =>{
      setLoading(true);
      AxiosClient.delete(`/contacts/${id}`)
      .then(({data})=>{
        getDataContact();
        if(data){
          return Notify('Data Berhasil Di Hapus');
        }
      })
      .catch(err=>{
        console.log(err);
      })
      console.log(id);
    }

    const getDataContact = () => {
      setLoading(true);
      AxiosClient.get('/contacts')
      .then(({data})=>{
        setLoading(false);
        setItems(data);
      })
      .catch(err=>{
        console.log(err);
      })
    }

  return (
    <div className='flex flex-col justify-center items-center gap-3 w-full'>
      {loading&&<span className='font-bold'>Loading ...</span>}
      <ScrollContainer>
      {items.data && items.data.map((item)=>(
            <FrameItem key={item.id} item={item} deleteH={deleteData}/>
      ))}
      </ScrollContainer>
    </div>
  )
}

export default EachItems