import React from 'react'
import { Link } from 'react-router-dom'

export const Navigation = () => {
  return (
    <nav className="relative bg-gray-700 after:pointer-events-none   after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Navegación principal */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch justify-start gap-2">
            <div className="flex shrink-0 items-center">
              <img
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
                className="h-8 w-auto"
              />
            </div>

           <div className="sm:ml-6 sm:block">
            <div className="flex space-x-4">
              <Link
                to="/menu"
                aria-current="page"
                className="rounded-md bg-gray-950/50 px-3 py-2 text-sm font-medium text-white"
              >
                Inicio
              </Link>
            </div>
          </div>
          </div>

          {/* Notificaciones y usuario */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Dropdown */}
            <div className="relative ml-3">
              <button className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
