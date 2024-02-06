import { IProductCategory } from './../../types/productCategory';
import { createSlice } from "@reduxjs/toolkit";
import { addProductCategory, getProductCategory, deleteProductCategory, updateProductCategory } from "../../services/productCategoryService";


interface ProductCategoryState {
    list: {
        isLoading: boolean;
        status: string;
        values: IProductCategory[]; 
    };
    save: {
        isSaving: boolean;
        isDeleting: boolean;
    };
}

const initialState: ProductCategoryState = {
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

export const productCategorySlice = createSlice({
    name: "productCategory",
    initialState,
    reducers: {
        clearSuccessMessage: () => {
            // TODO: Update state to clear success message
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductCategory.pending, (state) => {
                state.list.status = "pending";
                state.list.isLoading = true;
            })
            .addCase(getProductCategory.fulfilled, (state, action) => {
                state.list.status = "success";
                state.list.values = action.payload;
                state.list.isLoading = false;
            })
            .addCase(getProductCategory.rejected, (state) => {
                state.list.status = "failed";
                state.list.isLoading = false;
            })
            .addCase(addProductCategory.pending, (state) => {
                state.save.isSaving = true;
            })
            .addCase(addProductCategory.fulfilled, (state) => {
                state.save.isSaving = false;
            })
            .addCase(addProductCategory.rejected, (state) => {
                state.save.isSaving = false;
            })
            .addCase(updateProductCategory.pending, (state) => {
                state.save.isSaving = true;
            })
            .addCase(updateProductCategory.fulfilled, (state) => {
                state.save.isSaving = false;
            })
            .addCase(updateProductCategory.rejected, (state) => {
                state.save.isSaving = false;
            })
            .addCase(deleteProductCategory.pending, (state) => {
                state.save.isDeleting = true;
            })
            .addCase(deleteProductCategory.fulfilled, (state) => {
                state.save.isDeleting = false;
            })
            .addCase(deleteProductCategory.rejected, (state) => {
                state.save.isDeleting = false;
            });
    }
});

export const { clearSuccessMessage } = productCategorySlice.actions;

export default productCategorySlice.reducer;
