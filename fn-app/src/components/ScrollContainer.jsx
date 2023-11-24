import React from 'react'

const ScrollContainer = ({children}) => {
  return (
    <div className='overflow-y-scroll w-full p-3 overflow-x-hidden flex justify-center items-center flex-col' style={{height:'80vh'}} >
        {children}
    </div>
  )
}

export default ScrollContainer