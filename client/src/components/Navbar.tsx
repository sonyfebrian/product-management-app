import { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaCartShopping } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import IUser from "../types/user";
import EventBus from "../common/EventBus";
import * as AuthService from "../services/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [showCustomerBoard, setShowCustomerBoard] = useState<boolean>(false);
  const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

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
      <div className=" rounded-md text-white bg-blue-700 border-b shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]  relative m-auto p-3 flex justify-between items-center">
        {showAdminBoard ? (
          <h1 className="font-xl font-bold ">{currentUser?.username}</h1>
        ) : (
          <h1 className="font-xl font-bold ">{currentUser?.username}</h1>
        )}

        <nav className={isOpen ? "flex" : " hidden md:flex"}>
          <ul className="flex  absolute md:relative flex-col md:flex-row w-full shadow space-x-4 md:shadow-none text-center top-12 left-0 md:top-0 md:flex">
            {showCustomerBoard && (
              <div className="relative py-2">
                <div className="absolute left-3 top-0">
                  <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                    3
                  </p>
                </div>
                <FaCartShopping className=" h-5 w-5" />
              </div>
            )}
            {showAdminBoard && (
              <>
                <Link to="/home" className="mt-1 hover:text-slate-800">
                  Home
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger className="hover:text-slate-600">
                    Master Data
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link to="/product-categories">
                      <DropdownMenuItem>Product Category</DropdownMenuItem>
                    </Link>
                    <Link to="/product">
                      <DropdownMenuItem>Product</DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Link to="/transaction" className="mt-1 hover:text-slate-600">
                  Manage Transaksi
                </Link>
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="logo"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">customer</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      m@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                <Link to="/" onClick={logOut}>
                  <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </ul>
        </nav>
        <div className="md:hidden">
          <button
            className="flex justify-center items-center"
            onClick={toggleNavbar}
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>
      {/* <header className="bg-blue-500 text-white body-font">
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
            </header> */}
    </>
  );
};

export default Navbar;
