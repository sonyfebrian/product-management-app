import React, { useEffect, useState } from "react";
import Navbar from "@/Navbar";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { getProduct, updateProduct, addProduct, deleteProduct } from "../services/product";
import { IProduct } from "../types/product";
import { IProductCategory } from "../types/productCategory";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { getProductCategory } from "../services/productCategoryService";
// import * as AuthService from "../services/auth";

const Product = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getProduct());
        dispatch(getProductCategory());
    }, [dispatch]);

    const [selectedCategory, setSelectedCategory] = useState<IProductCategory | null>(null);

    const productList = useSelector(
        (state: RootState) => state.product.list.values
    );

    const productCategoryList = useSelector(
        (state: RootState) => state.productCategories.list.values
    );

    const isLoadingTable = useSelector(
        (state: RootState) => state.product.list.isLoading
    );

    const isSaving = useSelector(
        (state: RootState) => state.product.save.isSaving
    );

    const isDeleting = useSelector(
        (state: RootState) => state.product.save.isDeleting
    );

    const [product, setProduct] = useState<IProduct>({
        id: 0,
        plu: "",
        name: "",
        product_category_id: 0,
        active: false,
        created_user: "admin",
    });

    const isCategorySelected = selectedCategory !== null;

    const [showValidation, setShowValidation] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: name === "active" ? checked : value,
        }));
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedCategory = productCategoryList[selectedIndex];
        setSelectedCategory(selectedCategory);
        setProduct((prevState) => ({
            ...prevState,
            product_category_id: selectedCategory.id,
            name: selectedCategory.name,
        }));
    };

    const removeProduct = (id: number) => {
        if (id) {
            dispatch(deleteProduct(id))
                .unwrap()
                .then((response) => {
                    Swal.fire({
                        icon: "success",
                        text: response.message,
                    });
                    dispatch(getProduct());
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        text: error.message,
                    });
                });
        }
    };

    const resetForm = () => {
        setProduct({
            id: 0,
            plu: "",
            name: "",
            product_category_id: 0,
            active: false,
            created_user: "",
        });
        setShowValidation(false);
    };

    const selectProduct = (d: IProduct) => {
        setShowValidation(false);
        setProduct({
            id: d.id,
            plu: d.plu,
            name: d.name,
            product_category_id: d.product_category_id,
            active: d.active,
            created_user: d.created_user,
        });
    };

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!isCategorySelected) {
            Swal.fire({
                icon: "error",
                text: "Please select a category",
            });
            return;
        }

        const action =
            product.id === 0
                ? addProduct(product)
                : updateProduct(product);

        dispatch(action)
            .unwrap()
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    text: response.message,
                });
                resetForm();
                dispatch(getProduct());
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    text: error.message,
                });
            });
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Master Data Product</h2>
                    <Tabs defaultValue="product" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="product">Product</TabsTrigger>
                            <TabsTrigger value="product-variant">
                                Product Variant
                            </TabsTrigger>

                        </TabsList>
                        <TabsContent value="product" className="space-y-4">
                            <Card className="w-full">
                                <CardHeader>
                                    {product.id !== 0 ? (
                                        <CardDescription>Edit Product </CardDescription>
                                    ) : <CardDescription>Create Product </CardDescription>}

                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <div className="grid w-full items-center gap-4">
                                            <Input
                                                type="text"
                                                title="PLU"
                                                name="plu"
                                                placeholder="Enter PLU here"
                                                value={product.plu}
                                                inputChange={handleInputChange}
                                                showValidation={showValidation}
                                                isRequired={true}
                                            />
                                            <label className="block text-sm font-medium text-gray-700">Product Category</label>
                                            <select name="name" defaultValue={product.name} onChange={handleSelectChange} className="w-[180px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                {productCategoryList.map((category: IProductCategory, index: number) => (
                                                    <option key={index} value={category.id}>{category.name}</option>
                                                ))}
                                            </select>
                                            <Checkbox title="Active" name="active" inputChange={handleInputChange} value={product.active} />
                                        </div>
                                    </form>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button onClick={submit} disabled={isSaving || isDeleting} className="bg-blue-600">Submit</Button>
                                    {product.id !== 0 && (
                                        <Button onClick={resetForm} disabled={isSaving || isDeleting} className="bg-red-800">Cancel </Button>
                                    )}
                                </CardFooter>
                            </Card>
                            <div className="mt-4">
                                <div className="mt-2 flex flex-col">
                                    <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                {isLoadingTable && (
                                                    <h1 className="text-xl font-semibold">Loading...</h1>
                                                )}
                                                <Table className="min-w-full divide-y divide-gray-200">
                                                    <TableHeader className="bg-gray-50">
                                                        <TableRow>
                                                            <TableHead>Product</TableHead>
                                                            <TableHead>PLU</TableHead>
                                                            <TableHead>Status</TableHead>

                                                            <TableHead></TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody className="bg-white divide-y divide-gray-200">
                                                        {productList?.map((d: IProduct, index: number) => {
                                                            console.log('Product:', d);
                                                            return (
                                                                <TableRow key={index}>
                                                                    <TableCell className="px-6 py-4 whitespace-nowrap">{d.name}</TableCell>
                                                                    <TableCell>{d.plu}</TableCell>
                                                                    <TableCell className="px-6 py-4 whitespace-nowrap">{d.active ? "Active" : "Inactive"}</TableCell>

                                                                    <TableCell className="space-x-3">
                                                                        <Button onClick={() => removeProduct(d.id)} disabled={isSaving || isDeleting} className="bg-red-800">Delete</Button>
                                                                        <Button onClick={() => selectProduct(d)} disabled={isSaving || isDeleting} className="bg-orange-400">Edit</Button>
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="product-variant" className="space-y-4">Product Variant</TabsContent>
                    </Tabs>

                </main>
            </div>
        </>
    );
};

export default Product;
