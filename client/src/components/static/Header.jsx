import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUser, FaStore } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoMdLogOut, IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setUserLogout } from "../../redux/slices/userSlices";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  
  const user = useSelector((state) => state.user?.user || null);
  const seller = useSelector((state) => state.seller?.seller || null);
  const cartItems = useSelector((state) => state.cart.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Safe access to user and seller properties
  const userInitial = user?.username?.charAt(0)?.toUpperCase() || "U";
  const sellerInitial = seller?.storeName?.charAt(0)?.toUpperCase() || "S";

  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target) && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen]);

  const handleLogout = () => {
    dispatch(setUserLogout());
    setIsMenuOpen(false);
    navigate("/selectpath");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navigation = [
    { name: "Home", path: "/", current: location.pathname === "/" },
    { name: "Shop", path: "/shop", current: location.pathname === "/shop" },
    { name: "About", path: "/about", current: location.pathname === "/about" },
    { name: "Contact", path: "/contact", current: location.pathname === "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-lg backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-emerald-600 transition-colors"
          >
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FH</span>
            </div>
            <span>FashionHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-medium transition-colors duration-200 ${
                  item.current
                    ? "text-emerald-600 border-b-2 border-emerald-600"
                    : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              {isSearchOpen ? (
                <form 
                  onSubmit={handleSearch}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-lg p-2 min-w-64"
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <IoMdClose size={18} />
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100"
                  aria-label="Search"
                >
                  <FaSearch size={18} />
                </button>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100"
              aria-label="Shopping Cart"
            >
              <FaShoppingCart size={20} />
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 text-xs text-white bg-emerald-600 rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-sm">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* User/Seller Profile */}
            {seller ? (
              <div className="hidden sm:flex items-center space-x-3">
                <Link
                  to="/seller"
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {sellerInitial}
                  </div>
                  <span className="hidden md:block text-sm font-medium">Seller Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100"
                  aria-label="Logout"
                >
                  <IoMdLogOut size={18} />
                </button>
              </div>
            ) : user ? (
              <div className="hidden sm:flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {userInitial}
                  </div>
                  <span className="hidden md:block text-sm font-medium">My Account</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100"
                  aria-label="Logout"
                >
                  <IoMdLogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-3">
                <Link
                  to="/selectpath"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              ref={menuRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <HiMenuAlt3 size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 w-full bg-white shadow-xl border-t border-gray-200">
            <div className="container mx-auto px-4 py-4">
              {/* Mobile Navigation */}
              <nav className="mb-6">
                <ul className="space-y-2">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                          item.current
                            ? "bg-emerald-50 text-emerald-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 pt-4">
                {seller ? (
                  <div className="space-y-3">
                    <Link
                      to="/seller"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <FaStore className="text-purple-600" size={18} />
                      <span>Seller Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <IoMdLogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : user ? (
                  <div className="space-y-3">
                    <Link
                      to="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <FaUser className="text-emerald-600" size={18} />
                      <span>My Account</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <IoMdLogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/selectpath"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;