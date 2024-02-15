import Navbar from "@/Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Chart from "../components/Chart";
import { useState, useEffect } from "react";
import * as AuthService from "../services/auth";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { IProductVariant } from "../types/productVariant";
import { getProductVariant } from "../services/productVariantServices";
import { Button } from "@/components/ui/button";
import formatCurrency from "../utils/formatCurrency";
import useLocalStorageState from "use-local-storage-state";
// import ListChart from "@/ListCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface CartProps {
  [productId: string]: IProductVariant;
}

const Home = () => {
  const dispatch = useAppDispatch();

  const [showCustomerBoard, setShowCustomerBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [products, setProducts] = useState<IProductVariant[]>([]);

  const getProductVariantList = useSelector(
    (state: RootState) => state.productVariant.list.values
  );

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowCustomerBoard(user.roles.includes("ROLE_CUSTOMER"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMINISTRATOR"));
    }
    dispatch(getProductVariant());
  }, [dispatch]);

  useEffect(() => {
    setProducts(getProductVariantList);
  }, [getProductVariantList]);

  const [cart, setCart] = useLocalStorageState<CartProps>("cart", {});

  const addToCart = (product: IProductVariant): void => {
    product.qty = 1;

    setCart((prevCart) => ({
      ...prevCart,
      [product.id]: product,
    }));
  };

  const isInCart = (productId: number): boolean =>
    Object.keys(cart || {}).includes(productId.toString());

  return (
    <>
      <Navbar />
      {showAdminBoard && <Chart />}
      {showCustomerBoard && (
        <>
          <section className="text-gray-600  body-font">
            <div className="container px-5 py-24 mx-auto ">
              <div className="flex flex-wrap  space-x-8">
                {products?.map((d: IProductVariant, index: number) => (
                  <div
                    key={index}
                    className="lg:w-1/4 md:w-1/2 p-4 w-full rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <a className="block relative h-48 rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object-cover object-center w-full h-full block"
                        src={d.image_location}
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        CATEGORY
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {d.name}
                      </h2>
                      <span className="flex  justify-between mt-1">
                        <p className="mt-1">{formatCurrency(d.price)}</p>{" "}
                        <Button
                          disabled={isInCart(d.id)}
                          onClick={() => addToCart(d)}
                        >
                          Buy
                        </Button>{" "}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;
