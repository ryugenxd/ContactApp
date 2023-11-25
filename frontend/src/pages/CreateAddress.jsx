import React from 'react'
import { useParams } from 'react-router-dom';

const CreateAddress = () => {
  let {contactId} = useParams();

  return (
    <div>CreateAddress {contactId}</div>
  )
}

export default CreateAddress