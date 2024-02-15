import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productCategorySlices from "./slices/productCategorySlices";
import productSlices from "./slices/productSlices";
import productVariantSlice  from "./slices/productVariants";
import transactionSlices from "./slices/transaction.Slices";
import transactionDetailsSlice from "./slices/transactionDetailsSlice";

export const store = configureStore({
    reducer: {
        productCategories: productCategorySlices,
        product:productSlices,
        productVariant:productVariantSlice,
        transaction:transactionSlices,
        transactionDetail:transactionDetailsSlice,
    },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>