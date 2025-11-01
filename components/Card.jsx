import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Card = ({ producto }) => {

    const navigate = useNavigate()

  return (
    <div 
        className='bg-blue-400 shadow-lg p-3 hover:bg-blue-500 hover:cursor-pointer rounded-lg flex flex-col items-center justify-center h-20'
        onClick={ () => {
            navigate(`/menu/${ producto.value }`)
        }}
    >
        <h2>{ producto.value }</h2>
    </div>
  )
}
