import { IProductVariant} from './../../types/productVariant';
import { createSlice } from "@reduxjs/toolkit";
import { addProductVariant, deleteProductVariant, updateProductVariant, getProductVariant} from "../../services/productVariantServices";

interface ProductVariantState {
    list: {
        isLoading: boolean;
        status: string;
        values: IProductVariant[]; 
    };
    save: {
        isSaving: boolean;
        isDeleting: boolean;
    };
}

const initialState: ProductVariantState = {
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

export const productVariantsSlice = createSlice({
    name: "productVariants",
    initialState,
    reducers: {
        clearSuccessMessage: () => {
            // TODO: Update state to clear success message
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductVariant.pending, (state) => {
                state.list.status = "pending";
                state.list.isLoading = true;
            })
            .addCase(getProductVariant.fulfilled, (state, action) => {
                state.list.status = "success";
                state.list.values = action.payload;
                state.list.isLoading = false;
            })
            .addCase(getProductVariant.rejected, (state) => {
                state.list.status = "failed";
                state.list.isLoading = false;
            })
            .addCase(addProductVariant.pending, (state) => {
                state.save.isSaving = true;
            })
            .addCase(addProductVariant.fulfilled, (state) => {
                state.save.isSaving = false;
            })
            .addCase(addProductVariant.rejected, (state) => {
                state.save.isSaving = false;
            })
            .addCase(updateProductVariant.pending, (state) => {
                state.save.isSaving = true;
            })
            .addCase(updateProductVariant.fulfilled, (state) => {
                state.save.isSaving = false;
            })
            .addCase(updateProductVariant.rejected, (state) => {
                state.save.isSaving = false;
            })
            .addCase(deleteProductVariant.pending, (state) => {
                state.save.isDeleting = true;
            })
            .addCase(deleteProductVariant.fulfilled, (state) => {
                state.save.isDeleting = false;
            })
            .addCase(deleteProductVariant.rejected, (state) => {
                state.save.isDeleting = false;
            });
    }
});

export const { clearSuccessMessage } = productVariantsSlice.actions;

export default productVariantsSlice.reducer;