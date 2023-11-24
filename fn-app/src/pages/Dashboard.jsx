import React, { useEffect } from 'react'
import ButtonAdd from '../components/ButtonAdd'
import EachItems from '../components/EachItems'

const Dashboard = () => {
  useEffect(()=>{
    console.log('yahooo');
  },[]);
  return (
    <div>
      <div className='w-full flex justify-end items-end mt-4'>
        <div className='p-3'>
          <ButtonAdd to="/create" className="flex justify-center items-center gap-2 bg-green-500 p-2 outline outline-cyan-500 outline-1 rounded-xl font-bold" />
        </div>
      </div>
      <div className='p-3 w-full flex justify-center items-center bg-dark-500 rounded-md outline outline-cyan-500 outline-1'>
        <EachItems/>
      </div>
    </div>
  )
}

export default Dashboard