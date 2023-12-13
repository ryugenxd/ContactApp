import React from 'react'

const ButtonPagination = ({item}) => {
  return (
    <button className={`p-2 ${item.active?'bg-green-600':'bg-slate-900'} text-lg whitespace-nowrap`} dangerouslySetInnerHTML={{ __html:item.label}}></button>
  )
}

export default ButtonPagination
