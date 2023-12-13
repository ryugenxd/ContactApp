import React, { useEffect, useState } from 'react'
import FrameItem from './FrameItem';
import AxiosClient from '../client/AxiosClient';
import ScrollContainer from './ScrollContainer';
import { toast } from 'react-toastify';
import Pagination from './Pagination';

const EachItems = () => {
    const [items,setItems] = useState([]);
    const [loading,setLoading] = useState(false);
    const Notify = (m)=>toast.error(m);

    useEffect(()=>{
      getDataContact();
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
      });
    }

    const getDataContact = () => {
      setLoading(true);
      AxiosClient.get('/contacts')
      .then(({data})=>{
        setLoading(false);
        setItems(data);
      })
      .catch(err=>{
        Notify('Not Connect To Server');
        console.log(err);
      })
    }

  return (
    <div className='flex flex-col justify-center items-start gap-3 w-full'>
      {loading&&(
        <p className='text-center font-bold uppercase w-full'>
          Loading ...
        </p>
      )}
      <ScrollContainer>
      {items.data && items.data.map((item)=>(
            <FrameItem key={item.id} item={item} deleteH={deleteData}/>
      ))}
      </ScrollContainer>
      <Pagination meta={items.meta}/>
    </div>
  )
}

export default EachItems
