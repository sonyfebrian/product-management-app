import { ITransactionDetail } from '../../types/transactionDetail';
import { createSlice } from "@reduxjs/toolkit";
import {  getTransactionDetail, } from "../../services/transaction";

interface TransactionDetailState {
    list: {
        isLoading: boolean;
        status: string;
        values: ITransactionDetail[]; 
    };
    save: {
        isSaving: boolean;
        isDeleting: boolean;
    };
}

const initialState: TransactionDetailState = {
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

export const transactionDetailSlice = createSlice({
    name: "transactionDetail",
    initialState,
    reducers: {
        clearSuccessMessage: () => {
            // TODO: Update state to clear success message
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransactionDetail.pending, (state) => {
                state.list.status = "pending";
                state.list.isLoading = true;
            })
            .addCase(getTransactionDetail.fulfilled, (state, action) => {
                state.list.status = "success";
                state.list.values = action.payload;
                state.list.isLoading = false;
            })
            .addCase(getTransactionDetail.rejected, (state) => {
                state.list.status = "failed";
                state.list.isLoading = false;
            })
          
        
    }
});

export const { clearSuccessMessage } = transactionDetailSlice.actions;

export default transactionDetailSlice.reducer;