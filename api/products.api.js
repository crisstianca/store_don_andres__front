import axios from 'axios'

const productsApi = axios.create({
    baseURL: "http://localhost:8000/menu/api/v1/"
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
    console.log('jijij', id, product)
    return productsApi.put(`/products/${id}/`, product)
}

export const deleteProduct = ( id ) => {
    return productsApi.delete(`/products/${id}/`)
}