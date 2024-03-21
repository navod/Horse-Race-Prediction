import React from "react";
import { required_login } from "../../assets";

const LoginRequired = () => {
  return (
    <div className="flex flex-col justify-center bg-gray-100 items-center w-full h-96  shadow-md border-2 rounded-xl">
      <img src={required_login} className="w-[80%] h-64 object-contain" />
      <h6 className="text-sm text-gray-600 font-bold mt-10 ">
        401, Login Required
      </h6>
    </div>
  );
};

export default LoginRequired;
