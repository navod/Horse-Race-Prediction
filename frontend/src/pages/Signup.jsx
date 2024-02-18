import React from "react";
import { logo, signupBackground } from "../assets";

const Signup = () => {
  return (
    <div>
      <div className="flex flex-row">
        <div className="w-1/3 h-screen hidden bg-[#0B60B0] pt-28 px-10 items-center lg:flex flex-col justify-center gap-20">
          <h1 className="text-white font-semibold text-2xl text-center">
            Unleashing Predictive Prowess in Horse Racing!
          </h1>

          <img src={signupBackground} />
        </div>

        <div className="w-full h-screen justify-center pt-20 flex items-center p-6 xl:p-0">
          <div className="flex flex-col xl:w-2/5 ">
            <h1 className="text-black font-bold text-2xl">
              Sign up to TurboRaceInsights
            </h1>
            <div className="flex flex-col mt-10 gap-5">
              <div className="flex xl:flex-row flex-col justify-between items-center gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-bold text-sm">First Name</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-bold text-sm">Last Name</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-bold text-sm">Email</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-bold text-sm">Password</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="button"
              className="rounded-md mt-10 bg-[#0B60B0] h-fit font-bold text-lg text-white py-2 w-full"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
