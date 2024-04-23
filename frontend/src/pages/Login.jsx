import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import ReactLoading from "react-loading";
import { ALERT_TYPE, toast } from "../utils/Utility-func";
import authService from "../services/auth.service";
import local_storageService from "../services/local_storage.service";
import { useDispatch } from "react-redux";
import { setToken, setUserData } from "../store/slices/auth";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    emailError: false,
    passwordError: false,
  });

  const changeHandler = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    // check rememeber me?
    e.preventDefault();

    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (
      inputs.email.trim().length === 0 ||
      !inputs.email.trim().match(mailFormat)
    ) {
      setErrors({ ...errors, emailError: true });
      return;
    }

    if (inputs.password.trim().length < 6) {
      setErrors({ ...errors, passwordError: true });
      return;
    }

    const newUser = { email: inputs.email, password: inputs.password };
    setLoading(true);
    try {
      const response = await authService.login(newUser);
      if (response.message == "Logged In ") {
        local_storageService.saveUser(response.user);
        dispatch(setUserData(response.user));
        local_storageService.saveAccessToken(response.tokens.access);
        dispatch(setToken(response.access));
        local_storageService.saveRefreshToken(response.tokens.refresh);
        toast("Login Successfully", ALERT_TYPE.SUCCESS);
        navigate("/");
      } else {
        toast("Invalid Credentials", ALERT_TYPE.ERROR);
      }
      setLoading(false);
    } catch (res) {
      if (res.hasOwnProperty("error")) {
        toast("Invalid Credentials", ALERT_TYPE.ERROR);
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-hero-pattern h-screen w-full bg-cover bg-no-repeat bg-center flex justify-center items-center">
      <div className=" backdrop-blur-md border-2 rounded-lg  shadow-login-shadow flex flex-col items-center px-8 py-8 border-white sm:w-2/3 lg:w-1/3">
        <h1 className="text-black font-bold text-2xl">Login</h1>

        <div className="flex flex-col gap-10 w-full mt-6">
          <div className="w-full flex justify-between items-center">
            <input
              id="email"
              type="email"
              name="email"
              value={inputs.email}
              onChange={changeHandler}
              className="border-b-2 placeholder:text-gray-800 p-0 pb-2 border-0 bg-transparent w-full focus:outline-none font-semibold
            "
              placeholder="Email"
            />
            <MdEmail className="absolute right-10" />
          </div>

          <div className="w-full flex justify-between items-center">
            <input
              id="password"
              value={inputs.password}
              onChange={changeHandler}
              type="password"
              name="password"
              className="border-b-2 placeholder:text-gray-800 p-0 pb-2 border-0 bg-transparent w-full focus:outline-none font-semibold
            "
              placeholder="Password"
            />
            <FaLock className="absolute right-10" />
          </div>
        </div>

        {/* <div className="flex flex-col md:flex-row justify-between md:items-center w-full mt-5">
          <div>
            <span className="text-sm">Remember me</span>
          </div>
          <span className="font-bold underline cursor-pointer text-sm">
            Forgot Password?
          </span>
        </div> */}

        {loading ? (
          <ReactLoading
            type="spin"
            color="#0B60B0"
            height={50}
            width={50}
            className="mt-10"
          />
        ) : (
          <button
            name="loginBtn"
            onClick={submitHandler}
            type="button"
            className="rounded-md mt-10 shadow-md bg-[#0B60B0] h-fit font-bold text-lg text-white py-2 w-full"
          >
            Login
          </button>
        )}

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
