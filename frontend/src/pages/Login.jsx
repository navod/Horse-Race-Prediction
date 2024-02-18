import React from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg-hero-pattern h-screen w-full bg-cover bg-no-repeat bg-center flex justify-center items-center">
      <div className=" backdrop-blur-md border-2 rounded-lg  shadow-login-shadow flex flex-col items-center px-8 py-8 border-white sm:w-2/3 lg:w-1/3">
        <h1 className="text-black font-bold text-2xl">Login</h1>

        <div className="flex flex-col gap-10 w-full mt-6">
          <div className="w-full flex justify-between items-center">
            <input
              id="input"
              type="text"
              className="border-b-2 placeholder:text-gray-800 p-0 pb-2 border-0 bg-transparent w-full focus:outline-none font-semibold
            "
              placeholder="Email"
            />
            <MdEmail className="absolute right-10" />
          </div>

          <div className="w-full flex justify-between items-center">
            <input
              id="input"
              type="password"
              className="border-b-2 placeholder:text-gray-800 p-0 pb-2 border-0 bg-transparent w-full focus:outline-none font-semibold
            "
              placeholder="Password"
            />
            <FaLock className="absolute right-10" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-center w-full mt-5">
          <div>
            <span className="text-sm">Remember me</span>
          </div>
          <span className="font-bold underline cursor-pointer text-sm">
            Forgot Password?
          </span>
        </div>

        <button
          type="button"
          className="rounded-md mt-10 shadow-md bg-[#0B60B0] h-fit font-bold text-lg text-white py-2 w-full"
        >
          Login
        </button>

        <div className="mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="font-bold">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
