import React, { useEffect, useState } from "react";
import Navbar from "@/Navbar";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import {
  getProduct,
  updateProduct,
  addProduct,
  deleteProduct,
} from "../services/product";
import { IProduct } from "../types/product";
import { IProductCategory } from "../types/productCategory";
import { IProductVariant } from "../types/productVariant";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomInput } from "@/components/CustomInput";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { getProductCategory } from "../services/productCategoryService";
import {
  getProductVariant,
  addProductVariant,
  deleteProductVariant,
  updateProductVariant,
} from "../services/productVariantServices";
import formatCurrency from "../utils/formatCurrency";

// import * as AuthService from "../services/auth";

const Product = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getProductCategory());
    dispatch(getProductVariant());
  }, [dispatch]);
  // const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<IProductCategory | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const productList = useSelector(
    (state: RootState) => state.product.list.values
  );

  const productCategoryList = useSelector(
    (state: RootState) => state.productCategories.list.values
  );

  const productvariantList = useSelector(
    (state: RootState) => state.productVariant.list.values
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
    product_category_id: 1,
    active: false,
    created_user: "admin",
  });
  const [productVariant, setProductVarian] = useState<IProductVariant>({
    id: 0,
    product_id: 0,
    code: "",
    name: "",
    image_location: "",
    qty: 0,
    price: 0,
    active: false,
    created_user: "admin",
  });

  const isCategorySelected =
    selectedCategory !== null || selectedProduct !== null;

  const [showValidation, setShowValidation] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: name === "active" ? checked : value,
    }));
    setProductVarian((prevState) => ({
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

  const handleSelectProduct = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;

    const selectedProduct = productList[selectedIndex];

    setSelectedProduct(selectedProduct);
    setProductVarian((prevState) => ({
      ...prevState,
      product_id: selectedProduct?.id,
      name: selectedProduct?.name,
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
  const removeProductVariant = (id: number) => {
    if (id) {
      dispatch(deleteProductVariant(id))
        .unwrap()
        .then((response) => {
          Swal.fire({
            icon: "success",
            text: response.message,
          });
          dispatch(getProductVariant());
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
      product_category_id: 1,
      active: false,
      created_user: "",
    });
    setProductVarian({
      id: 0,
      product_id: 0,
      code: "",
      name: "",
      image_location: "",
      qty: 0,
      price: 0,
      active: false,
      created_user: "admin",
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

  const selectProductVariant = (d: IProductVariant) => {
    setShowValidation(false);
    setProductVarian({
      id: d.id,
      product_id: d.product_id,
      code: d.code,
      name: d.name,
      image_location: d.image_location,
      qty: d.qty,
      price: d.price,
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
      product.id === 0 ? addProduct(product) : updateProduct(product);

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
        console.error(error, "error");
        Swal.fire({
          icon: "error",
          text: "Invalid product category.",
        });
      });
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setProductVarian((prevProductVariant) => ({
        ...prevProductVariant,
        image_location: imageUrl,
      }));

      setSelectedFile(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      const response = await fetch("http://localhost:8080/api/v1/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result.result);
        // setImageUrl(result.result.image_url);
        const action =
          productVariant.id === 0
            ? addProductVariant(productVariant)
            : updateProductVariant(productVariant);
        dispatch(action)
          .unwrap()
          .then((response) => {
            Swal.fire({
              icon: "success",
              text: response.message,
            });
            resetForm();
            dispatch(getProductVariant());
          });
        resetForm();
        // Handle success, reset form, or navigate to a different page
      } else {
        const errorResult = await response.json();
        console.error("Error:", errorResult);

        // Handle errors, display error messages, etc.
      }
    } catch (error) {
      console.error("Error:", error);

      // Handle network errors, etc.
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <h2 className="text-2xl font-bold tracking-tight mb-2 text-sky-700">
            Master Data Product
          </h2>
          <Tabs defaultValue="product" className="space-y-4">
            <TabsList>
              <TabsTrigger value="product">Product</TabsTrigger>
              <TabsTrigger value="product-variant">Product Variant</TabsTrigger>
            </TabsList>
            <TabsContent value="product" className="space-y-4">
              <Card className="w-full">
                <CardHeader>
                  {product.id !== 0 ? (
                    <CardDescription>Edit Product </CardDescription>
                  ) : (
                    <CardDescription>Create Product </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <CustomInput
                        type="text"
                        title="PLU"
                        name="plu"
                        placeholder="Enter PLU here"
                        value={product.plu}
                        inputChange={handleInputChange}
                        showValidation={showValidation}
                        isRequired={true}
                      />
                      <label className="block text-sm font-medium text-gray-700">
                        Product Category
                      </label>
                      <select
                        name="name"
                        defaultValue={product.name}
                        onChange={handleSelectChange}
                        className="w-[180px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {productCategoryList.map(
                          (category: IProductCategory, index: number) => (
                            <option key={index} value={category.id}>
                              {category.name}
                            </option>
                          )
                        )}
                      </select>
                      <Checkbox
                        title="Active"
                        name="active"
                        inputChange={handleInputChange}
                        value={product.active}
                      />
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    onClick={submit}
                    disabled={isSaving || isDeleting}
                    className="bg-blue-600"
                  >
                    Submit
                  </Button>
                  {product.id !== 0 && (
                    <Button
                      onClick={resetForm}
                      disabled={isSaving || isDeleting}
                      className="bg-red-800"
                    >
                      Cancel{" "}
                    </Button>
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
                              return (
                                <TableRow key={index}>
                                  <TableCell className="px-6 py-4 whitespace-nowrap">
                                    {d.name}
                                  </TableCell>
                                  <TableCell>{d.plu}</TableCell>
                                  <TableCell className="px-6 py-4 whitespace-nowrap">
                                    {d.active ? "Active" : "Inactive"}
                                  </TableCell>

                                  <TableCell className="space-x-3">
                                    <Button
                                      onClick={() => removeProduct(d.id)}
                                      disabled={isSaving || isDeleting}
                                      className="bg-red-800"
                                    >
                                      Delete
                                    </Button>
                                    <Button
                                      onClick={() => selectProduct(d)}
                                      disabled={isSaving || isDeleting}
                                      className="bg-orange-400"
                                    >
                                      Edit
                                    </Button>
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
            <TabsContent value="product-variant" className="space-y-4">
              <Card className="w-full">
                <CardHeader>
                  {productVariant.id !== 0 ? (
                    <CardDescription>Edit Product Variant</CardDescription>
                  ) : (
                    <CardDescription>Create Product Variant </CardDescription>
                  )}
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <CustomInput
                        type="text"
                        title="Code"
                        name="code"
                        placeholder="Enter Code here"
                        value={productVariant.code}
                        inputChange={handleInputChange}
                        showValidation={showValidation}
                        isRequired={true}
                      />

                      <Label htmlFor="picture">Picture</Label>
                      <Input
                        id="picture"
                        type="file"
                        onChange={handleFileInput}
                      />
                      <Label htmlFor="picture">Product Variant Name</Label>
                      <select
                        name="name"
                        defaultValue={productVariant.name}
                        onChange={handleSelectProduct}
                        className="w-[180px] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {productList.map((product: IProduct, index: number) => (
                          <option key={index} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                      <CustomInput
                        type="number"
                        title="QTY"
                        name="qty"
                        placeholder="Enter QTY here"
                        value={productVariant.qty}
                        inputChange={handleInputChange}
                        showValidation={showValidation}
                        isRequired={true}
                      />
                      <CustomInput
                        type="number"
                        title="Price"
                        name="price"
                        placeholder="Enter Price here"
                        value={productVariant.price}
                        inputChange={handleInputChange}
                        showValidation={showValidation}
                        isRequired={true}
                      />

                      <Checkbox
                        title="Active"
                        name="active"
                        inputChange={handleInputChange}
                        value={product.active}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      type="submit"
                      disabled={isSaving || isDeleting}
                      className="bg-blue-600"
                    >
                      Submit
                    </Button>
                    {productVariant.id !== 0 && (
                      <Button
                        onClick={resetForm}
                        disabled={isSaving || isDeleting}
                        className="bg-red-800"
                      >
                        Cancel{" "}
                      </Button>
                    )}
                  </CardFooter>
                </form>
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
                              <TableHead>Code</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>Image</TableHead>
                              <TableHead>QTY</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="bg-white divide-y divide-gray-200">
                            {productvariantList?.map(
                              (d: IProductVariant, index: number) => {
                                return (
                                  <TableRow key={index}>
                                    <TableCell className="px-6 py-4 whitespace-nowrap">
                                      {d.code}
                                    </TableCell>
                                    <TableCell>{d.name}</TableCell>
                                    <TableCell>
                                      <img
                                        src={d.image_location}
                                        alt=""
                                        className="w-10 h-10"
                                      />
                                    </TableCell>
                                    <TableCell>{d.qty}</TableCell>
                                    <TableCell>
                                      {formatCurrency(d.price)}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 whitespace-nowrap">
                                      {d.active ? "Active" : "Inactive"}
                                    </TableCell>

                                    <TableCell className="space-x-3">
                                      <Button
                                        onClick={() =>
                                          removeProductVariant(d.id)
                                        }
                                        disabled={isSaving || isDeleting}
                                        className="bg-red-800"
                                      >
                                        Delete
                                      </Button>
                                      <Button
                                        onClick={() => selectProductVariant(d)}
                                        disabled={isSaving || isDeleting}
                                        className="bg-orange-400"
                                      >
                                        Edit
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                );
                              }
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default Product;
