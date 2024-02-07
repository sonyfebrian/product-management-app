import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";
import authHeader from "./auth-header";
import { IProductCategory } from '../types/productCategory';

export const getProductCategory = createAsyncThunk("productCategory/getProductCategories", async () => {
    try {
        const response = await API.get("products-categories",  { headers: authHeader() })
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const addProductCategory = createAsyncThunk("productCategory/addProductCategories", async (productCategories: IProductCategory) => {
    try {
        const response = await API.post("products-categories", productCategories, { headers: authHeader() })
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateProductCategory = createAsyncThunk("productCategory/updateProductCategories",
    async (productCategories: IProductCategory) => {
        try {
            const response = await API.put(`products-categories/${productCategories.id}`, productCategories, { headers: authHeader() });
            return response.data
        } catch (error) {
            console.log(error)
        }
    }) 

    export const deleteProductCategory = createAsyncThunk("productCategory/deleteProductCategories", async (id: number) => {
        try {
            const response = await API.delete(`products-categories/${id}`, { headers: authHeader() })
            return response.data
        } catch (error) {
            console.log(error)
        }
    })

