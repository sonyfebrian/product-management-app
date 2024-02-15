import React, { useEffect, useState } from "react";
import Navbar from "@/Navbar";
import { useSelector } from "react-redux";
import { IProductCategory } from "../types/productCategory";
import { RootState, useAppDispatch } from "../store/store";
import { deleteProductCategory, getProductCategory, addProductCategory, updateProductCategory } from "../services/productCategoryService";
import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    // CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/Checkbox"
import { CustomInput } from "@/components/CustomInput";
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'


const ProductCategory = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getProductCategory());
    }, [dispatch]);

    const productCategoryList = useSelector(
        (state: RootState) => state.productCategories.list.values
    );



    const isLoadingTable = useSelector(
        (state: RootState) => state.productCategories.list.isLoading
    );

    const isSaving = useSelector(
        (state: RootState) => state.productCategories.save.isSaving
    );
    const isDeleting = useSelector(
        (state: RootState) => state.productCategories.save.isDeleting
    );
    const [productCategory, setProductCategory] = useState<IProductCategory>({
        id: 0,
        name: "",
        active: false,
        created_user: "admin",
    });

    const [showValidation, setShowValidation] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        setProductCategory((prevState) => ({
            ...prevState,
            [name]: name === "active" ? checked : value,
        }));
    };

    const selectProduct = (d: IProductCategory) => {
        setShowValidation(false);
        setProductCategory({
            id: d.id,
            name: d.name,
            active: d.active,
            created_user: d.created_user,
        });
    };

    const removeProduct = (id: number) => {
        if (id)
            dispatch(deleteProductCategory(id))
                .unwrap()
                .then((response) => {
                    Swal.fire({
                        icon: "success",
                        text: response.message,

                    });
                    console.log(response.message)
                    dispatch(getProductCategory());
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",

                        text: error.message,

                    });
                    console.log(error)
                });
    };

    const resetForm = () => {
        setProductCategory({
            id: 0,
            name: "",
            active: false,
            created_user: "",
        });
        setShowValidation(false);
    };

    const submit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (productCategory.name === "") {
            setShowValidation(true);
            return;
        }

        const action =
            productCategory.id === 0
                ? addProductCategory(productCategory)
                : updateProductCategory(productCategory);

        dispatch(action)
            .unwrap()
            .then((response) => {

                Swal.fire({
                    icon: "success",
                    text: response.message,
                });

                resetForm();
                dispatch(getProductCategory());
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    text: error.message,
                });

            });
    };



    return (
        <> <Navbar />
            <div className="min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                    <h2 className="text-3xl font-bold tracking-tight mb-2">Master Data Product Categories</h2>
                    <Card className="w-full">
                        <CardHeader>
                            {productCategory.id !== 0 ? (
                                <CardDescription>Edit Product Categories</CardDescription>
                            ) : <CardDescription>Create Product Categories</CardDescription>}

                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="grid w-full items-center gap-4">
                                    <CustomInput
                                        type="text"
                                        title="Name"
                                        name="name"
                                        placeholder="Enter name here"
                                        value={productCategory.name}
                                        inputChange={handleInputChange}
                                        showValidation={showValidation}
                                        isRequired={true}
                                    />



                                    <Checkbox title="Active"
                                        name="active" inputChange={handleInputChange} value={productCategory.active} />


                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex justify-between">

                            <Button onClick={submit}
                                disabled={isSaving || isDeleting} className="bg-blue-600" >Submit</Button>
                            {productCategory.id !== 0 && (
                                <Button
                                    className="bg-red-800"
                                    onClick={resetForm}
                                    disabled={isSaving || isDeleting}
                                >Cancel </Button>
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
                                            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                                            <TableHeader className="bg-gray-50">
                                                <TableRow >
                                                    <TableHead>Product Category</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Create User</TableHead>
                                                    <TableHead></TableHead>
                                                </TableRow>
                                            </TableHeader>

                                            <TableBody className="bg-white divide-y divide-gray-200">
                                                {productCategoryList?.map((d: IProductCategory, index: number) => {
                                                    return (
                                                        <TableRow key={index}>
                                                            <TableCell className="px-6 py-4 whitespace-nowrap">{d.name}</TableCell>
                                                            <TableCell className="px-6 py-4 whitespace-nowrap">{d.active ? "Active" : "Inactive"}</TableCell>
                                                            <TableCell>{d.created_user}</TableCell>
                                                            <TableCell className="space-x-3"><Button
                                                                onClick={() => removeProduct(d.id)}
                                                                disabled={isSaving || isDeleting} className="bg-red-800">Delete</Button><Button onClick={() => selectProduct(d)}
                                                                    disabled={isSaving || isDeleting} className="bg-orange-400">Edit</Button></TableCell>

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
                </main>
            </div>

        </>
    )
}

export default ProductCategory