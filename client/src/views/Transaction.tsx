import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { ITransaction } from "../types/transaction";
import { ITransactionDetail } from "../types/transactionDetail";
import { getTransaction } from "../services/transaction";
import { getTransactionDetail } from "../services/transaction";
import Navbar from "@/Navbar";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Modal from "../components/Modal";




const Transaction = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleOpenModal = (id: number) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedId(null);
    };

    useEffect(() => {
        dispatch(getTransaction());
        dispatch(getTransactionDetail());
    }, [dispatch]);

    const transactionList = useSelector(
        (state: RootState) => state.transaction.list.values
    );

    const transactionDetailList = useSelector(
        (state: RootState) => state.transactionDetail.list.values
    );



    const isLoadingTable = useSelector(
        (state: RootState) => state.transaction.list.isLoading
    );

    const formatCurrency = (value: number): string => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    };



    return (
        <> <Navbar />
            <div className="container px-5 py-10 mx-auto flex flex-wrap">
                <div className="lg:w-2/3 mx-auto">
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
                                                    <TableHead>No Transaction</TableHead>
                                                    <TableHead>Total Amount</TableHead>
                                                    <TableHead>Status</TableHead>

                                                    <TableHead></TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody className="bg-white divide-y divide-gray-200">
                                                {transactionList?.map((d: ITransaction, index: number) => {
                                                    console.log("tr", d, index);
                                                    return (
                                                        <>
                                                            <TableRow key={index}>
                                                                <TableCell className="px-6 py-4 whitespace-nowrap">{d.transaction_no}</TableCell>
                                                                <TableCell>{formatCurrency(d.total_amount)}</TableCell>
                                                                <TableCell className="px-6 py-4 whitespace-nowrap">{d.active ? "Active" : "Inactive"}</TableCell>

                                                                <TableCell className="space-x-3">
                                                                    <Button className="bg-red-800" onClick={() => handleOpenModal(d.id)}>Detail</Button>
                                                                </TableCell>
                                                            </TableRow>

                                                        </>

                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                        {selectedId !== null && (
                                            <Modal open={open} onClose={handleCloseModal}>
                                                {transactionDetailList?.map((d: ITransactionDetail, index: number) => {
                                                    console.log("product", d, index);
                                                    return (
                                                        <>
                                                            <div className="flex flex-col gap-4 mt-5">
                                                                {selectedId === d.product_variant.product_variant_id && (
                                                                    <>
                                                                        <div className="flex items-start justify-between">
                                                                            <div className="-my-6 divide-y divide-gray-200">
                                                                                <div className="flex py-6">
                                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                                        <img className="h-full w-full object-cover object-center" src={d.product_variant.image_location} alt="" />
                                                                                    </div>
                                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                                        <div className="flex justify-between text-base font-medium text-gray-900">

                                                                                            <p>{d.product_variant.name}</p>
                                                                                            <p className="ml-4">{formatCurrency(d.product_variant.price)}</p>
                                                                                        </div>
                                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                                            <p className="text-gray-500">Qty {d.qty} </p>
                                                                                        </div>
                                                                                        {/* {transactionDetailList?.map((d: ITransactionDetail, index: number) => {
                                                                                            console.log("product", d, index);
                                                                                            return (
                                                                                                <>
                                                                                                    <div key={index} className="flex justify-between text-base font-medium text-gray-900">
                                                                                                        {selectedId === d.product_variant.product_variant_id && (
                                                                                                            <>
                                                                                                                <p>{d.product_variant.name}</p>
                                                                                                                <p className="ml-4">{d.product_variant.price}</p>
                                                                                                            </>

                                                                                                        )}
                                                                                                    </div>
                                                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                                                        <p className="text-gray-500">Qty {d.qty} </p>
                                                                                                    </div>

                                                                                                </>
                                                                                            );
                                                                                        })} */}
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-2">
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <p>Subtotal</p>
                                                                                <p>{formatCurrency(d.subtotal)}</p>
                                                                            </div>
                                                                        </div>

                                                                    </>
                                                                )}
                                                            </div>

                                                        </>
                                                    );
                                                })}
                                            </Modal>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default Transaction