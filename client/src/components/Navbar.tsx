import { useState, useEffect } from "react";
// import { GiHamburgerMenu } from "react-icons/gi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";
import IUser from "../types/user";
import EventBus from "../common/EventBus";
import * as AuthService from "../services/auth";


const Navbar = () => {
    const [showCustomerBoard, setShowCustomerBoard] = useState<boolean>(false);
    const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowCustomerBoard(user.roles.includes("ROLE_CUSTOMER"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMINISTRATOR"));
        }

        EventBus.on("logout", logOut);

        return () => {
            EventBus.remove("logout", logOut);
        };
    }, []);


    const logOut = () => {
        AuthService.logout();
        setShowCustomerBoard(false);
        setShowAdminBoard(false);
        setCurrentUser(undefined);
    };
    return (
        <>

            <header className="bg-blue-500 text-white body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">

                    {showAdminBoard ? (

                        <span className="ml-3 text-xl"> Welcome Admin </span>
                    ) : (<span className="ml-3 text-xl"> Welcome Customer </span>)}
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">

                        {showAdminBoard && (
                            <>
                                <Link to="" className="mr-5 hover:text-gray-900">Home</Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="mr-5 hover:text-gray-900" >Master Data</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <Link to="/product-categories"><DropdownMenuItem>Product Category</DropdownMenuItem></Link>
                                        <Link to="/product">
                                            <DropdownMenuItem>Product</DropdownMenuItem>
                                        </Link>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Link to="">Manage Transaksi</Link>


                            </>

                        )}
                        {showCustomerBoard && (
                            <>
                                <Link to="/product-categories">Transaksi</Link>

                            </>

                        )}
                    </nav>
                    <DropdownMenu >
                        <DropdownMenuTrigger className="mr-5 hover:text-gray-900" >{currentUser?.username}</DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Link to="/" onClick={logOut}>
                                <DropdownMenuItem>Log Out</DropdownMenuItem></Link>

                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </header>
        </>
    )
}

export default Navbar