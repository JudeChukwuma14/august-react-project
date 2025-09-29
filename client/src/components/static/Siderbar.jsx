import {
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  NewspaperIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  LogOutIcon,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSellerLogout } from "../../redux/slices/sellerSlices";

export const Siderbar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [productsOpen, setProductsOpen] = useState(false);
  const [contentOpen, setContentOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setSellerLogout());
    toast.success("Logged out successfully");
    navigate("/seller-login");
    setSidebarOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-20 bg-opacity-50 transition-opacity md:hidden ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <div
        className={`fixed inset-y-0 left-0 z-30 w-56 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:w-64 md:translate-x-0 md:static md:inset-0 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex-1">
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <Link to="/">
              <h1 className="text-xl font-bold">FashionHub™</h1>
            </Link>
          </div>

          <nav className="px-2 mt-5">
            <Link
              to="/seller"
              className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                location.pathname === "/seller"
                  ? "bg-[#85f3dd] text-white"
                  : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#36d7b7]"
              }`}
            >
              <HomeIcon className="w-6 h-6 mr-3" />
              Dashboard
            </Link>

            <div className="mt-1">
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className={`w-full group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  location.pathname.includes("/post-product")
                    ? "bg-[#85f3dd] text-white"
                    : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#36d7b7]"
                }`}
                aria-expanded={productsOpen}
              >
                <ShoppingBagIcon className="w-6 h-6 mr-3" />
                Products
                {productsOpen ? (
                  <ChevronUpIcon className="w-5 h-5 ml-auto" />
                ) : (
                  <ChevronDownIcon className="w-5 h-5 ml-auto" />
                )}
              </button>
              {productsOpen && (
                <div className="pl-10 pr-2 mt-1 space-y-1">
                  <Link
                    to="/seller/product"
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      location.pathname === "/seller/products"
                        ? "bg-[#85f3dd] text-white"
                        : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#36d7b7]"
                    }`}
                  >
                    Product List
                  </Link>
                  <Link
                    to="/seller/post-product"
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      location.pathname === "/seller/post-product"
                        ? "bg-[#85f3dd] text-white"
                        : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#36d7b7]"
                    }`}
                  >
                    Create Product
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/seller/seller-orders"
              className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                location.pathname.includes("/seller/seller-orders")
                  ? "bg-[#85f3dd] text-white"
                  : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#36d7b7]"
              }`}
            >
              <ShoppingCartIcon className="w-6 h-6 mr-3" />
              Orders
            </Link>

            <Link
              to="/seller/seller-profile"
              className={`mt-1 group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                location.pathname.includes("/seller/seller-profile")
                  ? "bg-[#85f3dd] text-white"
                  : "text-gray-600 hover:bg-[#F7F7F7] hover:text-[#36d7b7]"
              }`}
            >
              <Settings className="w-6 h-6 mr-3" />
              Profile Setting
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-[#F7F7F7] hover:text-[#36d7b7]"
          >
            <LogOutIcon className="w-6 h-6 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
