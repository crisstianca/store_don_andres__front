import React from 'react'
import logo from '../src/assets/logo.png'
// import { FaGoogle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


export const Login = () => {

    const navigate = useNavigate()

  return (
    <div className="bg-blue-400 h-screen w-screen flex items-center justify-center">
        {/* Contenedor principal del login */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl grid grid-cols-2 gap-6 m-2">
            <div className="flex flex-col justify-center items-center">
                <img src={logo} alt="logo" />
                <h1 className="text-gray-700 text-3xl font-bold mb-4">¡Bienvenido!</h1>
                <p className="text-gray-700 text-center">
                    Ingresa tus credenciales para continuar.
                </p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <form className="flex flex-col gap-4 w-3/4">
                        <button
                            onClick={ () => navigate('/menu')}
                            type="submit"
                            className="bg-gray-700 text-white p-3 rounded hover:bg-gray-600 transition hover:cursor-pointer flex items-center gap-2 justify-center"
                        >
                            Entrar <FaUser />
                        </button>
                </form>
            </div>
        </div>
    </div>
  )
}
