import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { deleteProduct, getProductByCategory } from '../api/products.api';
import { useNavigate, useParams } from 'react-router-dom';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { ModalFormProduct } from './ModalFormProduct';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { toast } from "react-hot-toast"

export const TableExample = ({ category }) => {
    const params = useParams()
    const navigate = useNavigate()
    const [customers, setCustomers] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [newProduct, setNewProduct] = useState(false);
    const [ dataSelected, setDataSelected ] = useState('')

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    useEffect(() => {
        const loadData = async() => {
            const res = await getProductByCategory(params.id)
            setCustomers(res.data)
        }
        loadData()
    }, []);

    useEffect(() => {
        if (newProduct) {
            setTimeout(() => {
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }, [newProduct]);


    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

     const deleteSelectedProducts = () => {
        let _products = customers.filter((val) => !selectedProducts.includes(val));

        setCustomers(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 items-center justify-between">
                <h4 className="m-0">Productos</h4>
                
                <div className="ml-auto">
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search" />
                        <InputText
                            value={globalFilterValue}
                            onChange={onGlobalFilterChange}
                            placeholder="Buscar Producto"
                            className='input_search_table'
                        />
                    </IconField>
                </div>
            </div>
        );
    };
    
    const openNew = () => {
        setNewProduct(!newProduct)
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

     const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Agregar Producto" icon="pi pi-plus" severity="primary" onClick={openNew} className='custom-btn' />
                {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
            </div>
        );
    };

    const buttonEdit = ( rowData ) => {
        setNewProduct(true)
        setDataSelected( rowData )
        navigate(`/menu/${rowData.category}/${rowData.id}`)
    }
    
    const buttonDelete = ( rowData ) => {
        
        const accept = async() => {
            await deleteProduct( rowData.id )
            toast.success('Producto Eliminado', {
                position: "top-right"
            })
            setTimeout(() => {
                window.location.reload()
            }, 1000)
        }

         confirmDialog({
            message: 'Estas seguro que quieres eliminar el producto?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept
        });
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <div className='flex gap-4'>
                    <Button 
                        className="button_accion_table" 
                        icon="pi pi-pencil" 
                        tooltip="Editar" 
                        tooltipOptions={{
                            position: 'top',
                            className: 'small-tooltip',
                        }} 
                        rounded 
                        outlined 
                        severity="secondary" 
                        onClick={() => { buttonEdit(rowData) }} 
                        size='small'
                    />
                    <Button 
                        className="button_accion_table" 
                        icon="pi pi-trash" 
                        tooltip="Eliminar" 
                        tooltipOptions={{
                            position: 'top',
                            className: 'small-tooltip',
                        }} 
                        rounded 
                        outlined 
                        severity="danger" 
                        onClick={ () => buttonDelete(rowData)} 
                        size='small'
                    />
                </div>
            </React.Fragment>
        );
    }

    const header = renderHeader();

    return (
        <>
            <ConfirmDialog />
            <div className="card shadow-md">
                <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
                <DataTable
                    className='custom-table' 
                    value={customers} 
                    paginator 
                    header={header} 
                    rows={10}
                    tableStyle={{ minWidth: '50rem' }}
                    tableLayout="fixed"   // 👈 Hace que las columnas respeten el width
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]} 
                    dataKey="id" 
                    selectionMode="checkbox" 
                    selection={selectedCustomers} 
                    onSelectionChange={(e) => setSelectedCustomers(e.value)}
                    filters={filters} 
                    filterDisplay="menu" 
                    globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
                    emptyMessage="No se encontró ningún producto." 
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} entradas"
                >
                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} /> */}
                    <Column field="name" header="Nombre" sortable style={{ width: '8rem' }} />
                    <Column field="category" header="Categoría" style={{ width: '8rem' }} />
                    <Column field="price" header="Precio" style={{ width: '8rem' }} />
                    <Column field="barcode" header="Codigo de Barra" style={{ width: '8rem' }} />
                    <Column body={actionBodyTemplate} header="Acciones" style={{ textAlign: 'center', width: 'auto' }}  />
                </DataTable>

            </div>
           { newProduct ? <ModalFormProduct dataSelected={dataSelected} /> : null}

        </>
    );
}
        