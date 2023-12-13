import React, { useEffect, useState } from 'react'
import ButtonPagination from './ButtonPagination';

const Pagination = ({meta}) => {
  const [links,setLinks] = useState(null);
  useEffect(()=>{
    if(meta)setLinks(meta.links);
  },[meta]);

  return (
    <div>
      {links&&links.map((item,index)=>(
        <ButtonPagination key={index} item={item}/>
      ))}
    </div>
  )
}

export default Pagination
