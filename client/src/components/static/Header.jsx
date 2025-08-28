import React, { useState } from "react";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between w-full h-20 px-5 shadow-lg md:px-14">
      <div className="text-xl font-semibold">LOGO</div>
      <nav className="hidden md:block" role="navigation">
        <ul className="flex gap-3">
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
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <FaSearch size={20} className="cursor-pointer" />
          <FaShoppingBag size={20} className="cursor-pointer" />
        </div>
        <Link
          to="/selectpath"
          className="px-4 py-2 bg-[#36d7b7] text-white rounded-md text-xs hidden md:block"
        >
          Get Started
        </Link>
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
          className={`absolute left-0 w-full bg-white shadow-lg top-20 md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
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
            <li>
              <Link
                to="/selectpath"
                className="px-4 py-2 bg-[#36d7b7] text-white rounded-md text-xs"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;