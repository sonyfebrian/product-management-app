import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";
import authHeader from "./auth-header";
// import {ITransaction} from "../types/transaction"

export const getTransaction = createAsyncThunk("transaction/getTransaction", async () => {
    try {
        const response = await API.get("transactions",  { headers: authHeader() })
        
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const getTransactionDetail = createAsyncThunk("transactionDetail/getTransactionDetail", async () => {
    try {
        const response = await API.get("transactions-details",  { headers: authHeader() })
        
        return response.data
    } catch (error) {
        console.log(error)
    }
})