import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { logo } from "../assets";

const Navbar = () => {
  return (
    <nav
      className={`${styles.paddingX} w-full bg-black items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to={"/"}
          className="flex items-center gap-2"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <img
            src={logo}
            alt=""
            className="w-9 h-9 object-contain bg-white rounded-full"
          />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            TurboRaceInsight &nbsp;
            {/* <span className="sm:block hidden">| Software Engineer</span> */}
          </p>
        </Link>

        <div className="flex gap-5">
          <div className="rounded-md cursor-pointer hover:bg-[#F2F2F2] font-semibold bg-white py-2 px-8">
            Login
          </div>
          <div className="rounded-md cursor-pointer hover:bg-[#F2F2F2] bg-gradient-to-r text-white font-semibold from-blue-500 via-purple-500 to-pink-500 py-2 px-8">
            Sign up
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
