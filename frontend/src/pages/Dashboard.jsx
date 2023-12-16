import React from 'react'
import ButtonAdd from '../components/ButtonAdd'
import EachItems from '../components/EachItems'
import Search from '../components/Search'

const Dashboard = () => {
  return (
    <div>
      <Search/>
      <div className='w-full flex justify-end items-end mt-4'>
        <div className='p-3'>
          <ButtonAdd to="/create" className="flex justify-center items-center gap-2 bg-green-500 p-2 outline outline-cyan-500 outline-1 rounded-xl font-bold" text="ADD CONTACT" />
        </div>
      </div>
      <div className='p-3 w-full flex justify-center items-center bg-dark-500 rounded-md'>
        <EachItems/>
      </div>
    </div>
  )
}

export default Dashboard
