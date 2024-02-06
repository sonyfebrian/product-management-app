import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import productCategorySlices from "./slices/productCategorySlices";

export const store = configureStore({
    reducer: {
        productCategories: productCategorySlices
    },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>