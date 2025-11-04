import React, { useEffect, useState } from 'react'
import { getAllCategories } from '../api/products.api'
import { FaCamera,FaSearch } from "react-icons/fa";
import { Card } from '../components/Card';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.min.css';    
import 'primereact/resources/themes/lara-light-blue/theme.css';
import { InputText } from 'primereact/inputtext';
import { useDispatch } from 'react-redux';
import { getCategories } from '../thunks/productsThunk';

export default function HomeMenu() {

  const [ products, setProducts] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {

    const loadProducts = async() => {
      const res = await getAllCategories()
      dispatch(getCategories(res.data))
      setProducts(res.data)
    }
    
    loadProducts()
  }, [])
  
  return (
    <div>
      <div className='bg-gray-700 mt-4 px-4 py-4 rounded-lg mx-2'>
        <h1 className='mb-2 text-xl text-center'> Buscar producto </h1>
        <div className='grid grid-cols-4 items-center gap-2'>
          <div className='col-span-2'>
            <InputText className='w-full' value={''} onChange={() => ''} placeholder="Agrega Serie o nombre del producto"  disabled/>
          </div>
          <div className='col-span-1'>
            <button
              disabled
              className="bg-indigo-500 p-3 rounded-lg w-full flex items-center justify-center hover:bg-indigo-400 hover:cursor-pointer"
            >
              Buscar <FaSearch className='ml-2' />
            </button>
          </div>
          <div className='col-span-1'>
            <button
              disabled
              className="bg-indigo-500 p-3 rounded-lg w-full flex items-center justify-center hover:bg-indigo-400 hover:cursor-pointer"
            >
              Camara <FaCamera className='ml-2' />
            </button>
          </div>
        </div>
      </div>
      <div className='mt-4 rounded-lg grid grid-cols-3 gap-4 mx-2'>
        {
          products.map( product => (
            <Card key={ product.label } producto={product}/>
          ))
        }
      </div>
    </div>
  )
}
