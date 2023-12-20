import React from 'react'
import { Link } from 'react-router-dom'

const ButtonAdd = ({className,to,text}) => {
  return (
    <Link to={to} className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className='w-6 h-6 inline font-bold'>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span> {text} </span>
    </Link>
  )
}

export default ButtonAdd