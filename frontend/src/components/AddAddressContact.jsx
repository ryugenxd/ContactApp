import React from 'react'

const AddAddressContact = ({showAddress,setShowAddress}) => {
  return (
    <div className={`absolute bg-slate-950 outline outline-cyan-500 outline-1 rounded-xl w-full  ${showAddress?'block':'hidden'}`}>
          <div className='w-full p-2 bg-slate-900 flex justify-end items-center'>
            <div className='text-center w-full font-extrabold'>
              Address
            </div>
            <button className='p-2 text-red-500 font-extrabold' onClick={()=>setShowAddress(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          <div className='p-3'>
            <div className='p-2 mb-2 w-ful flex justify-center items-center'>
              <input  className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text"  placeholder='street'  autoComplete="nope"/>
            </div>
            <div className='p-2 mb-2 w-ful flex justify-center items-center'>
              <input  className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text"  placeholder='city'  autoComplete="nope"/>
            </div>
            <div className='p-2 mb-2 w-ful flex justify-center items-center'>
              <input  className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text"  placeholder='province'  autoComplete="nope"/>
            </div>
            <div className='p-2 mb-2 w-ful flex justify-center items-center'>
              <input  className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text"  placeholder='country'  autoComplete="nope"/>
            </div>
            <div className='p-2 mb-2 w-ful flex justify-center items-center'>
              <input  className='p-3 m-0 bg-slate-900 focus:outline-none rounded-md' type="text"  placeholder='postal code'  autoComplete="nope"/>
            </div>
            <div  className={`justify-end items-end w-full flex`}>
              <button  className='p-2 bg-green-500 font-extrabold rounded-md'>Set Address
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
  );
}

export default AddAddressContact