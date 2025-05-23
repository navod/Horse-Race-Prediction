import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logo, userpng } from "../assets";
import local_storageService from "../services/local_storage.service";
import { useSelector } from "react-redux";
import { isEmptyObject } from "../utils/Utility-func";
import authService from "../services/auth.service";
import ReactLoading from "react-loading";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
const Nav = () => {
  const { userData } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    await authService
      .logout()
      .then(() => {
        local_storageService.removeStorageData();
        setLoading(false);
        window.location.reload();
      })
      .catch(() => setLoading(false));
    setLoading(false);
  };

  return (
    <nav className=" bg-black dark:bg-gray-900 fixed w-full z-20 top-0 start-0  dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={logo}
            className="w-9 h-9 object-contain bg-white rounded-full"
            alt="TurboRaceInsight Logo"
          />
          <span className="self-center hidden md:flex text-2xl font-semibold whitespace-nowrap text-white">
            TurboRaceInsight
          </span>
          <span className="self-center flex md:hidden text-2xl font-semibold whitespace-nowrap text-white">
            TRInsignt
          </span>
        </a>
        <div className="flex lg:order-2 gap-5 space-x-3 lg:space-x-0 rtl:space-x-reverse">
          {isEmptyObject(userData) ? (
            <>
              <Link
                to="/login"
                className="rounded-md lg:flex hidden cursor-pointer hover:bg-[#F2F2F2] font-semibold bg-white py-2 px-8"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded-md lg:flex hidden cursor-pointer hover:bg-[#F2F2F2] bg-gradient-to-r text-white font-semibold from-blue-500 via-purple-500 to-pink-500 py-2 px-8"
              >
                Sign up
              </Link>
            </>
          ) : loading ? (
            <ReactLoading type="spin" color="#0B60B0" height={20} width={20} />
          ) : (
            <Dropdown
              data-testid="flowbite-avatar-img"
              placement="bottom-end"
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img={userpng} rounded />}
            >
              <DropdownHeader>
                <span className="block text-sm capitalize">
                  {userData?.first_name} {userData?.last_name}
                </span>
                <span className="block truncate text-sm font-medium">
                  {userData?.email}
                </span>
              </DropdownHeader>
              {userData.role === "ADMIN" && (
                <>
                  <DropdownItem
                    data-testid="dashboardNav"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </DropdownItem>
                  <DropdownDivider />
                </>
              )}
              <DropdownItem onClick={logout}>Sign out</DropdownItem>
            </Dropdown>
          )}

          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex   items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center shadow-md justify-between hidden w-full lg:flex lg:w-auto lg:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 dark:bg-gray-800 lg:dark:bg-gray-400 dark:border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 lg:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/#upcomingrace"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                Races
              </a>
            </li>
            <li>
              <a
                href="/#homedescription"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="/#footer"
                className="block py-2 px-3 text-white rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
            <li className="flex gap-4 justify-between md:justify-normal items-center">
              {isEmptyObject(userData) && (
                <>
                  <Link
                    to="/login"
                    className="rounded-md lg:hidden cursor-pointer hover:bg-[#F2F2F2] font-semibold bg-white py-2 px-8"
                  >
                    Login
                  </Link>
                  <Link className="rounded-md lg:hidden cursor-pointer hover:bg-[#F2F2F2] bg-gradient-to-r text-white font-semibold from-blue-500 via-purple-500 to-pink-500 py-2 px-8">
                    Sign up
                  </Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
