import React, { useState } from "react";
import { FaSearch, FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserLogout } from "../../redux/slices/userSlices";
import { IoMdLogOut } from "react-icons/io";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.user?.user || null);
  const seller = useSelector((state) => state.seller?.seller || null);

  // Safe access to user and seller properties
  const firstLetter = user?.username
    ? user.username.charAt(0).toUpperCase()
    : null;

  const sellerLetter = seller?.storeName
    ? seller.storeName.charAt(0).toUpperCase()
    : null;

  const cartItems = useSelector((state) => state.cart.items || []);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutUser = () => {
    dispatch(setUserLogout());
    navigate("/selectpath");
  };

  return (
    <header className="flex items-center justify-between w-full h-20 px-5 shadow-lg md:px-14">
      <div className="md:text-xl text-[20px] font-semibold">
        <Link to="/">FashionHub</Link>
      </div>
      <nav className="hidden md:block" role="navigation">
        <ul className="flex gap-8">
          <li className="font-semibold">
            <Link to="/" className="hover:text-[#36d7b7]">
              Home
            </Link>
          </li>
          <li className="font-semibold">
            <Link to="/shop" className="hover:text-[#36d7b7]">
              Shop
            </Link>
          </li>
          <li className="font-semibold">
            <Link to="/about" className="hover:text-[#36d7b7]">
              About
            </Link>
          </li>
          <li className="font-semibold">
            <Link to="/contact" className="hover:text-[#36d7b7]">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3">
          <FaSearch size={20} className="cursor-pointer" />
          <Link
            to="/cart"
            className="relative p-2 transition-colors duration-200 rounded-full"
            aria-label="Shopping Cart"
          >
            <FaShoppingCart size={20} />
            {totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 text-xs text-white bg-[#36d7b7] rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-md">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
        <div>
          {seller ? (
            <div className="flex items-center gap-3">
              <Link to="/seller">
                <h1 className="cursor-pointer font-bold text-lg bg-[#36d7b7] text-white rounded-full h-[30px] w-[30px] flex justify-center items-center ring-4">
                  {sellerLetter}
                </h1>
              </Link>
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              <Link to="">
                <h1 className="cursor-pointer font-bold text-lg bg-[#36d7b7] text-white rounded-full h-[30px] w-[30px] flex justify-center items-center ring-4">
                  {firstLetter}
                </h1>
              </Link>
              <IoMdLogOut
                onClick={handleLogoutUser}
                className="cursor-pointer"
                size={20}
              />
            </div>
          ) : (
            <Link
              to="/selectpath"
              className="px-4 py-2 bg-[#36d7b7] text-white rounded-md text-xs hidden md:block"
            >
              Get Started
            </Link>
          )}
        </div>

        <MdMenu
          size={25}
          className="block cursor-pointer md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        />
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`absolute left-0 w-full bg-white shadow-lg top-20 z-50 md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col items-center gap-3 p-4">
            <li className="font-semibold">
              <Link
                to="/"
                className="hover:text-[#36d7b7]"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="font-semibold">
              <Link
                to="/shop"
                className="hover:text-[#36d7b7]"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
            </li>
            <li className="font-semibold">
              <Link
                to="/about"
                className="hover:text-[#36d7b7]"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li className="font-semibold">
              <Link
                to="/contact"
                className="hover:text-[#36d7b7]"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            {!user && !seller && (
              <li>
                <Link
                  to="/selectpath"
                  className="px-4 py-2 bg-[#36d7b7] text-white rounded-md text-xs"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </li>
            )}
            {(user || seller) && (
              <li>
                <button
                  onClick={() => {
                    handleLogoutUser();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-[#36d7b7] text-white rounded-md text-xs"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;