import { ITransaction } from '../../types/transaction';
import { createSlice } from "@reduxjs/toolkit";
import {  getTransaction, } from "../../services/transaction";


interface TransactionState {
    list: {
        isLoading: boolean;
        status: string;
        values: ITransaction[]; 
    };
    save: {
        isSaving: boolean;
        isDeleting: boolean;
    };
}

const initialState: TransactionState = {
    list: {
        isLoading: false,
        status: "",
        values: []
    },
    save: {
        isSaving: false,
        isDeleting: false
    }
};

export const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        clearSuccessMessage: () => {
            // TODO: Update state to clear success message
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransaction.pending, (state) => {
                state.list.status = "pending";
                state.list.isLoading = true;
            })
            .addCase(getTransaction.fulfilled, (state, action) => {
                state.list.status = "success";
                state.list.values = action.payload;
                state.list.isLoading = false;
            })
            .addCase(getTransaction.rejected, (state) => {
                state.list.status = "failed";
                state.list.isLoading = false;
            })
           
        
    }
});

export const { clearSuccessMessage } = transactionSlice.actions;

export default transactionSlice.reducer;