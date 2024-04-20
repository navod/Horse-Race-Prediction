import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
  Button,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
import ReactLoading from "react-loading";
import userService from "../../../services/user.service";
import { ALERT_TYPE, toast } from "../../../utils/Utility-func";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const AddNewUsers = ({ loadAllUsers }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
    conf_password: "",
    passwordError: "",
    first_nameError: "",
    emailError: "",
    roleError: "",
    conf_passwordError: "",
  });

  const checkFormData = (name, value) => {
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,]).{8,}$/;

    switch (name) {
      case "password":
        if (!value) return "Password is required";
        else if (!regex.test(value)) {
          return "Password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long";
        } else {
          return "";
        }
      case "first_name":
        if (value == "") return "First name is required";

      case "email":
        if (!value) return "Email is required";
        else if (
          !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ) {
          return "Invalid email address";
        } else {
          return "";
        }

      case "role":
        if (!value) {
          return "Role is required";
        }

      case "conf_password":
        if (!value) return "Confirm password is required";
        else if (value !== formData.password) {
          return "Passwords do not match";
        }
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfPasswordVisibility = () => {
    setShowConfPassword((prevState) => !prevState);
  };

  const clearForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "",
      conf_password: "",
      passwordError: "",
      first_nameError: "",
      emailError: "",
      roleError: "",
      conf_passwordError: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      [name + "Error"]: checkFormData(name, value),
    });
  };

  const onCreateUser = (e) => {
    e.preventDefault();

    let obj = {};

    const requiredFields = ["first_name", "email", "role", "password"];

    for (const field of requiredFields) {
      if (!formData[field]) {
        obj = {
          ...obj,
          [field + "Error"]: checkFormData(field, formData[field]),
        };
      }
    }

    setFormData({
      ...formData,
      ...obj,
    });

    if (
      obj.first_nameError ||
      obj.emailError ||
      obj.roleError ||
      obj.passwordError ||
      obj.conf_passwordError
    ) {
      return;
    }

    setLoading(true);
    userService
      .addUser(formData)
      .then((res) => {
        setLoading(false);
        clearForm();
        loadAllUsers("");
        toast("Successfully created User", ALERT_TYPE.SUCCESS);
      })
      .catch((err) => {
        toast(err.error, ALERT_TYPE.ERROR);
        setLoading(false);
      });
  };

  return (
    <Accordion collapseAll className="mt-10 shadow-xl">
      <AccordionPanel>
        <AccordionTitle>Add New Users</AccordionTitle>
        <AccordionContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
            <div>
              <div className="mb-2 block">
                <Label
                  color={
                    formData.first_nameError && !formData.first_name
                      ? "failure"
                      : "gray"
                  }
                  htmlFor="firstName"
                  value="First Name"
                />
              </div>
              <TextInput
                name="first_name"
                id="firstName"
                onChange={handleChange}
                value={formData.first_name}
                type="text"
                sizing="md"
                color={
                  formData.first_nameError && !formData.first_name
                    ? "failure"
                    : "gray"
                }
                helperText={
                  <>
                    {!formData.first_name && formData.first_nameError && (
                      <span>* {formData.first_nameError}</span>
                    )}
                  </>
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="lastName" value="Last Name" />
              </div>
              <TextInput
                onChange={handleChange}
                value={formData.last_name}
                id="lastName"
                type="text"
                sizing="md"
                name="last_name"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  color={
                    formData.emailError && (!formData.email || formData.email)
                      ? "failure"
                      : "gray"
                  }
                  htmlFor="email"
                  value="Email"
                />
              </div>
              <TextInput
                name="email"
                onChange={handleChange}
                value={formData.email}
                id="email"
                required
                type="email"
                color={
                  formData.emailError && (!formData.email || formData.email)
                    ? "failure"
                    : "gray"
                }
                sizing="md"
                helperText={
                  <>
                    {(!formData.email || formData.email) &&
                      formData.emailError && (
                        <span>* {formData.emailError}</span>
                      )}
                  </>
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="Role" />
              </div>
              <Select
                name="role"
                onChange={handleChange}
                id="role"
                required
                value={formData.role}
                color={
                  formData.roleError && !formData.role ? "failure" : "gray"
                }
                helperText={
                  <>
                    {!formData.role && formData.roleError && (
                      <span>* {formData.roleError}</span>
                    )}
                  </>
                }
              >
                <option disabled value="">
                  Select a role
                </option>
                <option value="ADMIN">Admin</option>
                <option value="CUSTOMER">Customer</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  color={
                    formData.passwordError &&
                    (!formData.password || formData.password)
                      ? "failure"
                      : "gray"
                  }
                  htmlFor="password"
                  value="Password"
                />
              </div>
              <div className="flex flex-row w-full relative items-center">
                <TextInput
                  name="password"
                  color={
                    formData.passwordError &&
                    (!formData.password || formData.password)
                      ? "failure"
                      : "gray"
                  }
                  onChange={handleChange}
                  required
                  id="password"
                  type={showPassword ? "text" : "password"}
                  sizing="md"
                  className="w-full"
                  value={formData.password}
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="cursor-pointer absolute right-[0.2%] bg-gray-200 h-[97%] flex items-center justify-center w-10 rounded-r-md"
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </div>
              </div>

              <div>
                <>
                  {(!formData.password || formData.password) &&
                    formData.passwordError && (
                      <span className="text-red-600 text-sm">
                        * {formData.passwordError}
                      </span>
                    )}
                </>
              </div>
            </div>
            {/* <div>
              <div className="mb-2 block">
                <Label
                  color={
                    formData.conf_passwordError &&
                    (!formData.conf_password || formData.conf_password)
                      ? "failure"
                      : "gray"
                  }
                  htmlFor="confPassword"
                  value="Confirmation Password"
                />
              </div>
              <div className="flex flex-row w-full relative items-center">
                <TextInput
                  name="conf_password"
                  value={formData.conf_password}
                  id="confPassword"
                  type={showConfPassword ? "text" : "password"}
                  sizing="md"
                  color={
                    formData.conf_passwordError &&
                    (!formData.conf_password || formData.conf_password)
                      ? "failure"
                      : "gray"
                  }
                  onChange={handleChange}
                  className="w-full"
                  required
                />
                <div
                  onClick={toggleConfPasswordVisibility}
                  class
                  Name="cursor-pointer absolute right-[0.2%] bg-gray-200 h-[97%] flex items-center justify-center w-10 rounded-r-md"
                >
                  {showConfPassword ? <FiEye /> : <FiEyeOff />}
                </div>
              </div>

              <div>
                <>
                  {(!formData.conf_password || formData.conf_password) &&
                    formData.conf_passwordError && (
                      <span className="text-red-600 text-sm">
                        * {formData.conf_passwordError}
                      </span>
                    )}
                </>
              </div>
            </div> */}
            <div>
              <div className="mb-2 block">
                <Label
                  color={
                    formData.conf_passwordError &&
                    (!formData.conf_password || formData.conf_password)
                      ? "failure"
                      : "gray"
                  }
                  htmlFor="confPassword"
                  value="Confirmation Password"
                />
              </div>
              <div className="flex flex-row w-full relative items-center">
                <TextInput
                  name="conf_password"
                  color={
                    formData.conf_passwordError &&
                    (!formData.conf_password || formData.conf_password)
                      ? "failure"
                      : "gray"
                  }
                  onChange={handleChange}
                  required
                  id="confPassword"
                  type={showConfPassword ? "text" : "password"}
                  sizing="md"
                  className="w-full"
                  value={formData.conf_password}
                />
                <div
                  onClick={toggleConfPasswordVisibility}
                  className="cursor-pointer absolute right-[0.2%] bg-gray-200 h-[97%] flex items-center justify-center w-10 rounded-r-md"
                >
                  {showConfPassword ? <FiEye /> : <FiEyeOff />}
                </div>
              </div>

              <div>
                <>
                  {(!formData.conf_password || formData.conf_password) &&
                    formData.conf_passwordError && (
                      <span className="text-red-600 text-sm">
                        * {formData.conf_passwordError}
                      </span>
                    )}
                </>
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full mt-10">
            {loading ? (
              <div className="flex justify-center items-center w-full lg:w-20">
                <ReactLoading
                  type="spin"
                  color="#0B60B0"
                  height={30}
                  width={30}
                />
              </div>
            ) : (
              <button
                onClick={onCreateUser}
                className="bg-[#0B60B0] w-full lg:w-24 h-10 font-bold text-white rounded-md"
              >
                Submit
              </button>
            )}
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  );
};

export default AddNewUsers;
