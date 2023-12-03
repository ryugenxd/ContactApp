import React from 'react'
import { useParams } from 'react-router-dom'
const DetailAddress = () => {
    const {addressId} = useParams();
  return (
    <div>
        DetailAddress {addressId}
    </div>
  )
}

export default DetailAddress