import Navbar from "@/Navbar";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Chart from "../components/Chart"
import { useState, useEffect } from 'react';
import * as AuthService from "../services/auth"
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { IProductVariant } from "../types/productVariant";
import { getProductVariant } from "../services/productVariantServices";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Home = () => {
    const dispatch = useAppDispatch();

    const [showCustomerBoard, setShowCustomerBoard] = useState<boolean>(false);
    const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);


    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {

            setShowCustomerBoard(user.roles.includes("ROLE_CUSTOMER"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMINISTRATOR"));
        }
        dispatch(getProductVariant());
    }, [dispatch]);
    const productvariantList = useSelector(
        (state: RootState) => state.productVariant.list.values
    );

    return (
        <>
            <Navbar />
            {showAdminBoard && (
                <Chart />
            )}
            {showCustomerBoard && (
                <>
                    <section className="text-gray-600   body-font">
                        <div className="container px-5 py-24 mx-auto bg-gradient-to-r from-rose-100 to-teal-100">
                            <div className="flex flex-wrap  space-x-8">
                                {productvariantList?.map((d: IProductVariant, index: number) => (
                                    <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                                        <a className="block relative h-48 rounded overflow-hidden">
                                            <img
                                                alt="ecommerce"
                                                className="object-cover object-center w-full h-full block"
                                                src={d.image_location}
                                            />
                                        </a>
                                        <div className="mt-4">
                                            <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                            <h2 className="text-gray-900 title-font text-lg font-medium">{d.name}</h2>
                                            <p className="mt-1">{d.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </>

            )}
        </>
    )
}

export default Home;
