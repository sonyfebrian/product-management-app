import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";
import authHeader from "./auth-header";
import { IProduct } from '../types/product';

export const getProduct = createAsyncThunk("product/getProduct", async () => {
    try {
        const response = await API.get("products",  { headers: authHeader() })
        
        return response.data.products
    } catch (error) {
        console.log(error)
    }
})

export const addProduct = createAsyncThunk("product/addProduct", async (productCategories: IProduct) => {
    try {
        const response = await API.post("products", productCategories, { headers: authHeader() })
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateProduct = createAsyncThunk("product/updateProduct",
    async (product: IProduct) => {
        try {
            const response = await API.put(`products/${product.id}`, product, { headers: authHeader() });
            return response.data
        } catch (error) {
            console.log(error)
        }
    }) 

    export const deleteProduct = createAsyncThunk("product/deleteProduct", async (id: number) => {
        try {
            const response = await API.delete(`products/${id}`, { headers: authHeader() })
            return response.data
        } catch (error) {
            console.log(error)
        }
    })
