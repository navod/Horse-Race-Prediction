import React, { useState } from "react";
import { logo, signupBackground } from "../assets";
import { ALERT_TYPE, toast } from "../utils/Utility-func";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const checkFormData = (value) => {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,]).{8,}$/;

    if (!regex.test(value)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long";
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "password") {
      errorMessage = checkFormData(value);
    }

    setFormData({
      ...formData,
      [name]: value,
      errorMessage: errorMessage, // Store error message for displaying
    });
  };

  const onSignUpHanlder = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const errorMessage = checkFormData(formData.password);
    if (errorMessage) {
      setFormData({
        ...formData,
        errorMessage: errorMessage, // Store error message for displaying
      });
      return;
    }

    setLoading(true);
    authService
      .regiser(formData)
      .then((res) => {
        setLoading(false);
        toast("Successfully created account", ALERT_TYPE.SUCCESS);
        navigate("/login");
      })
      .catch((err) => {
        toast(err.error, ALERT_TYPE.ERROR);
        setLoading(false);
      });
  };
  return (
    <div>
      <div className="flex flex-row">
        <div className="w-1/3 h-screen hidden bg-[#0B60B0] pt-28 px-10 items-center lg:flex flex-col justify-center gap-20">
          <h1 className="text-white font-semibold text-2xl text-center">
            Unleashing Predictive Prowess in Horse Racing!
          </h1>

          <img src={signupBackground} />
        </div>

        <form
          onSubmit={onSignUpHanlder}
          className="w-full h-screen justify-center pt-20 flex items-center p-6 xl:p-0"
        >
          <div className="flex flex-col xl:w-2/5">
            <h1 className="text-black font-bold text-2xl">
              Sign up to TurboRaceInsights
            </h1>
            <div className="flex flex-col mt-10 gap-5">
              <div className="flex xl:flex-row flex-col justify-between items-start gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-bold text-sm">First Name *</label>
                  <input
                    value={formData.first_name}
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    required={true}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  {formSubmitted && !formData.first_name && (
                    <p className="text-red-500 text-xs mt-1">
                      * First name is required
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label className="font-bold text-sm">Last Name *</label>
                  <input
                    type="text"
                    required={true}
                    value={formData.last_name}
                    name="last_name"
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  {formSubmitted && !formData.last_name && (
                    <p className="text-red-500 text-xs mt-1">
                      * Last name is required
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-bold text-sm">Email *</label>
                <input
                  type="email"
                  required={true}
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="font-bold text-sm">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  minLength={8}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                {formSubmitted &&
                  (!formData.password || formData.errorMessage) && (
                    <p className="text-red-500 text-xs mt-1">
                      {formData.errorMessage || "Password is required"}
                    </p>
                  )}
              </div>

              <div className="flex flex-col gap-2 w-full">
                <label className="font-bold text-sm">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                />
                {formSubmitted && !formData.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    Password confirmation is required
                  </p>
                )}
                {formSubmitted &&
                  formData.password !== formData.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      Passwords do not match
                    </p>
                  )}
              </div>
            </div>

            <div className="flex justify-center items-center">
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
                  type="submit"
                  className="rounded-md mt-10 bg-[#0B60B0] h-fit font-bold text-lg text-white py-2 w-full"
                >
                  Create Account
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
