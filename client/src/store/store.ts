import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productCategorySlices from "./slices/productCategorySlices";
import productSlices from "./slices/productSlices";

export const store = configureStore({
    reducer: {
        productCategories: productCategorySlices,
        product:productSlices
    },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>