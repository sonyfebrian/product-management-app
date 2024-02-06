import { GiHamburgerMenu } from "react-icons/gi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";



const Navbar = () => {
    return (
        <><nav className="bg-blue-500 p-4 md:flex md:delil-antara md:item-center">


            {/*Menu Hamburg*/}
            <div className="md:hidden">
                <button className="text-white">
                    <GiHamburgerMenu />
                </button>
            </div>

            {/* Navigation links */}
            <div className="hidden md:flex items-center space-x-4 text-white text-lg">
                <a href="#" >Home</a>
                {/* <div className="relative">
                    <a href="#" className="text-gray-800 hover:text-blue-600 text-lg">Master Data Product</a>
                    <div className="absolute top-full left-0 w-max bg-white border border-gray-300 rounded-lg shadow-md py-2">
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:text-blue-600">Category</a>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:text-blue-600">Subcategory</a>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:text-blue-600">Brand</a>
                    </div>
                </div> */}
                <DropdownMenu>
                    <DropdownMenuTrigger >Master Data</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <Link to="/product-categories"><DropdownMenuItem>Product Category</DropdownMenuItem></Link>

                        <DropdownMenuItem>Product</DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>

                <a href="#" >Manage Transaksi</a>
            </div>

        </nav></>
    )
}

export default Navbar