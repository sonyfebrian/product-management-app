import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";
import authHeader from "./auth-header";
import { IProductVariant } from '../types/productVariant';


export const getProductVariant = createAsyncThunk("productVariant/getProductVariants", async () => {
    try {
        const response = await API.get("product-variants",  { headers: authHeader() })
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const addProductVariant = createAsyncThunk("productVariant/addProductVariants", async (productVariants: IProductVariant) => {
    try {
        const response = await API.post("product-variants", productVariants, { headers: authHeader() })
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const updateProductVariant = createAsyncThunk("productVariant/updateProductVariants",
    async (productVariants: IProductVariant) => {
        try {
            const response = await API.put(`product-variants/${productVariants.id}`, productVariants, { headers: authHeader() });
            return response.data
        } catch (error) {
            console.log(error)
        }
    }) 

    export const deleteProductVariant = createAsyncThunk("productVariant/deleteProductVariants", async (id: number) => {
        try {
            const response = await API.delete(`product-variants/${id}`, { headers: authHeader() })
            return response.data
        } catch (error) {
            console.log(error)
        }
    })

