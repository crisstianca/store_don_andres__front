import React, { useEffect, useState } from 'react'
import { InfoCard } from './InfoCard';
import { getProductByCategory } from '../api/products.api';
import { TableExample } from './TableExample';
import { Button } from 'primereact/button';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";


export const TableProducts = () => {

    const navigate = useNavigate()
    const params = useParams()
    const [productsByCategory, setProductsByCategory] = useState([]);

    useEffect(() => {
        const loadData = async() => {
            const res = await getProductByCategory()
            setProductsByCategory(res.data)
        }
        loadData()
    }, []);

  return (
    <>  
        <div className='mt-4 mx-2'>
            <Button label='Regresar' className='custom-button-back shadow-lg' severity='secondary' icon='pi pi-arrow-left' rounded="lg" size='small' onClick={ () => navigate('/menu')}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mx-2">
            <InfoCard title={"Categoria:"} subTitle={params.id} iconTitle={'pi pi-shopping-cart'} bgCard={'bg-blue-100'} textCard={'text-blue-500'}/>
            <InfoCard title={"Apartado"} subTitle={"En stock"} iconTitle={'pi pi-check'} bgCard={'bg-green-100'} textCard={'text-blue-500'}/>
        </div>
        <div className='bg-zinc-200 mt-4 px-4 py-4 rounded-2xl shadow-md'>
            <TableExample category={productsByCategory.category}/>
        </div>
    </>
  )
}
