import axios from 'axios'

const productsApi = axios.create({
    baseURL: "https://storeandres-backend.onrender.com/menu/api/v1"
})

export const createProduct = ( data ) => {
    console.log('data', data)
    return productsApi.post('/products/', data)
}

export const getAllCategories = () => {
    return productsApi.get('/categories')
}

export const getProductByCategory = (category) => {
    return productsApi.get(`/products/?category=${category}`)
}

export const editProduct = ( id, product ) => {
    return productsApi.put(`/products/${id}/`, product)
}

export const deleteProduct = ( id ) => {
    return productsApi.delete(`/products/${id}/`)
}