
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
import { useSelector } from "react-redux"
import { createProduct, editProduct } from "../api/products.api"
import { Button } from "primereact/button"

export const ModalFormProduct = ({dataSelected}) => {

    const { categoriesData } =  useSelector( (state) => state.categories)
    const { register, handleSubmit, formState: {errors}, setValue } = useForm()

    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate()
    const params = useParams()

    const onSubmit = handleSubmit( async data => {
        if( params.categoryId ){
            await editProduct( params.categoryId, data )
            toast.success('Producto Actualizado', {
                position: "top-right"
            })
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        } else {
            await createProduct( data )
            toast.success('Producto Agregado', {
                position: "top-right"
            })

            setTimeout(() => {
                navigate('/menu'); // primero navega a la lista general
                setTimeout(() => {
                    navigate(`/menu/${params.id}`); // luego vuelve al detalle
                }, 50);
            }, 1000);

            }
        })

    useEffect(() => {
        const loadCategory = () => {
            if( params.id ){
                setValue('category', params.id)
            }
        }
        loadCategory()
    }, [])
    
    useEffect(() => {
        setValue('name',dataSelected.name)
        setValue('price',dataSelected.price)
        setValue('barcode',dataSelected.barcode)
    }, [dataSelected])
    


    return (
        <div className="card p-6 rounded-2xl shadow-md bg-gray-700 mt-4">
            <h2 className="text-xl font-semibold mb-4">Agregar producto</h2>

            <form 
                onSubmit={ onSubmit }
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium mb-1">Nombre</label>
                    <InputText
                        type="text" 
                        placeholder="Nombre del producto"
                        {...register("name", {required: true})}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="category" className="text-sm font-medium mb-1">Categoría</label>
                    <InputText
                        type="text" 
                        placeholder="Categoria"
                        disabled
                        {...register("category", {required: true})}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="price" className="text-sm font-medium mb-1">Precio</label>
                    <InputText 
                        type="text"
                        step="0.01"
                        min="0" 
                        placeholder="$0.00"
                        {...register("price", {required: true})}
                        onInput={(e) => {
                            e.target.value = e.target.value
                                .replace(/[^0-9.]/g, '')   
                                .replace(/(\..*?)\..*/g, '$1');
                        }}
                        onBlur={(e) => {
                            let value = e.target.value.replace(/[^0-9.]/g, '');
                            if (value === '') return;
                            if (!value.includes('.')) value += '.00';
                            else if (/^\d+\.$/.test(value)) value += '00';
                            else if (/^\d+\.\d$/.test(value)) value += '0';
                            e.target.value = '$' + value;
                        }}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="barcode" className="text-sm font-medium mb-1">Código de barras(opcional)</label>
                    <div className="flex gap-2 w-full">
                        <InputText 
                            type="text"
                            placeholder="Ej. 123456789"
                            {...register("barcode", {required: false})} 
                            className="flex-1"
                        />
                        <Button icon="pi pi-camera" className="p-button-primary" tooltip="camara" onClick={() => document.getElementById('barcodeCamera').click()} />
                    </div>
                </div>

                <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    id="barcodeCamera" 
                    style={{ display: 'none' }} 
                    onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                        // Aquí podrías procesar la imagen, ej: leer código de barras
                        console.log(file);
                        }
                    }}
                />


                <div className="col-span-full flex justify-end mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    )
}
