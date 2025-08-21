import React, { useState } from "react";
import { Sliding } from "../common/Sliding";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section className="flex flex-col w-full h-screen lg:pl-[500px] items-center justify-center">
      <Sliding />
      {/* Form Path */}
      <div className="w-full max-w-md px-4">
        <h1 className="mb-6 text-xl font-bold text-center sm:text-2xl sm:mb-8">
          User Sign-In
        </h1>
        <form className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-500"
            >
              Email Address
            </label>
            <input
              type="email"
              className={` w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#36d7b7]`}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-500"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className={` w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#36d7b7]`}
              />
              <span
                className="absolute text-gray-500 transform cursor-pointer right-5 top-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button className="w-full px-5 py-3 mt-4 text-white rounded-md bg-[#36d7b7] text-lg font-bold hover:bg-[#2ebfa1]">
            Login
          </button>
        </form>

        <p className="mt-3 text-sm text-center text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className=" text-[#36d7b7] hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signin;
