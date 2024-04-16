import React from "react";
import { logo } from "../../assets";

const Footer = () => {
  return (
    <footer id="footer" class="bg-[#0B60B0] shadow dark:bg-gray-900">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={logo}
              class="w-9 h-9 object-contain bg-white rounded-full"
              alt="TurboRaceInsight Logo"
            />
            <span class="self-center hidden md:flex text-2xl font-semibold whitespace-nowrap text-white">
              TurboRaceInsight
            </span>
            <span class="self-center flex md:hidden text-2xl font-semibold whitespace-nowrap text-white">
              TRInsignt
            </span>
          </a>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-100 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Home
              </a>
            </li>
            <li>
              <a href="#races" class="hover:underline me-4 md:me-6">
                Races
              </a>
            </li>
            <li>
              <a href="#about" class="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#contact" class="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-white sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://flowbite.com/" class="hover:underline">
            TRB™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
