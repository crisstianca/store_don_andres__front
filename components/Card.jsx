import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Card = ({ producto }) => {

    const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/menu/${producto.value}`)}
      className="
        bg-gradient-to-br from-blue-400 to-blue-600 
        hover:from-blue-500 hover:to-indigo-600
        transition-all duration-300
        shadow-md hover:shadow-lg 
        p-4 rounded-xl 
        flex flex-col items-center justify-center
        h-24 cursor-pointer
        text-white font-semibold text-lg select-none
      "
    >
      <h2 className="drop-shadow-sm">{producto.value}</h2>
    </div>
  )
}
