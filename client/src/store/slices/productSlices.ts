import { IProduct} from './../../types/product';
import { createSlice } from "@reduxjs/toolkit";
import { addProduct, updateProduct, deleteProduct, getProduct} from "../../services/product";

interface ProductState {
    list: {
        isLoading: boolean;
        status: string;
        values: IProduct[]; 
    };
    save: {
        isSaving: boolean;
        isDeleting: boolean;
    };
}

const initialState: ProductState = {
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

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        clearSuccessMessage: () => {
            // TODO: Update state to clear success message
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.pending, (state) => {
                state.list.status = "pending";
                state.list.isLoading = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.list.status = "success";
                state.list.values = action.payload;
                state.list.isLoading = false;
            })
            .addCase(getProduct.rejected, (state) => {
                state.list.status = "failed";
                state.list.isLoading = false;
            })
            .addCase(addProduct.pending, (state) => {
                state.save.isSaving = true;
            })
            .addCase(addProduct.fulfilled, (state) => {
                state.save.isSaving = false;
            })
            .addCase(addProduct.rejected, (state) => {
                state.save.isSaving = false;
            })
            .addCase(updateProduct.pending, (state) => {
                state.save.isSaving = true;
            })
            .addCase(updateProduct.fulfilled, (state) => {
                state.save.isSaving = false;
            })
            .addCase(updateProduct.rejected, (state) => {
                state.save.isSaving = false;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.save.isDeleting = true;
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.save.isDeleting = false;
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.save.isDeleting = false;
            });
    }
});

export const { clearSuccessMessage } = productSlice.actions;

export default productSlice.reducer;