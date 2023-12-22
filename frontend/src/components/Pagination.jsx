import React, { useEffect, useState } from 'react'
import ButtonPagination from './ButtonPagination';

const Pagination = ({meta,status}) => {
  const [links,setLinks] = useState(null);
  useEffect(()=>{
    if(meta)setLinks(meta.links);
  },[meta]);

  return (
    status&&<div className={status.length==0?'hidden':null}>
      {links&&links.map((item,index)=>(
        <ButtonPagination key={index} item={item}/>
      ))}
    </div>
  )
}

export default Pagination
