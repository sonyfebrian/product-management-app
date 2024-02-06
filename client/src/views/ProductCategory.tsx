import { useEffect, } from "react";
import Navbar from "@/Navbar";
import { useSelector } from "react-redux";
// import { IProductCategory } from "../types/productCategory";
import { RootState, useAppDispatch } from "../store/store";
import { getProductCategory, } from "../services/productCategoryService";

const ProductCategory = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getProductCategory());
    }, [dispatch]);

    const productCategoryList = useSelector(
        (state: RootState) => state.productCategories.list.values
    );

    console.log(productCategoryList)
    return (
        <> <Navbar /> Product</>
    )
}

export default ProductCategory