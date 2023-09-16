import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import LoginImage from "../../login.png";
import {
  IoLockClosedOutline,
  IoMailOutline,
  IoPersonCircleOutline,
  IoAlertCircleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfpassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const regist = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        {
          name: name,
          email: email,
          password: password,
          confPassword: confPassword,
        }
      );
      setSuccess("Register Successfully");
      setError(null);
      setIsLoading(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg);
        setSuccess(null);
        setIsLoading(false);
      }
    }
  };

  const showSuccess = (successMessage) => {
    setSuccess(successMessage);
    setError(null); // Clear error message
  };
  return (
    <div className="">
      <div className="md:flex md:justify-center h-screen">
        <div className="md:w-1/2 items-center hidden md:block">
          <img
            src={LoginImage}
            alt=""
            className=" md:mx-auto md:p-18 md:pt-14"
          />
        </div>
        <div className="md:mx-auto px-5 bg-[#005bea] h-full md:w-1/2 md:flex md:flex-col flex flex-col justify-center items-center md:items-center">
          <div className="text-white text-3xl text-center md:text-4xl font-bold">
            Create your account!
          </div>
          {error && (
            <div className="p-3 md:mb-[-20px] mt-3 md:w-auto md:mt-4 bg-[#ebc8c4] rounded-lg text-red-900">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <IoAlertCircleOutline className="text-red-900" />
                </span>
                <div className="pl-10 pr-3">
                  <strong>Error: </strong>
                  {error}
                </div>
              </div>
            </div>
          )}
          {success && (
            <div className="p-3 md:mb-[-20px] mt-3 md:w-auto md:mt-8 bg-[#dcf4d4] rounded-lg text-green-900">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <IoCheckmarkCircleOutline className="text-green-900" />
                </span>
                <div className="pl-10 pr-3">
                  <strong>Success: </strong>
                  {success}
                </div>
              </div>
            </div>
          )}
          <form onSubmit={regist}>
            <div className="mt-5 md:mt-10 w-full md:flex md:justify-center">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <IoPersonCircleOutline className="text-gray-700" />
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="p-2.5 pl-10 focus:outline-none focus:ring rounded-3xl w-full md:w-[350px]"
                  placeholder="Your name"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="mt-5 md:mt-5 w-full md:flex md:justify-center">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <IoMailOutline className="text-gray-700" />
                </span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2.5 pl-10 focus:outline-none focus:ring rounded-3xl w-full md:w-[350px]"
                  placeholder="Your email"
                  type="email"
                  required
                />
              </div>
            </div>
            <div className="mt-3 md:mt-5 w-full md:flex md:justify-center">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <IoLockClosedOutline className="text-gray-900" />
                </span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2.5 pl-10 focus:outline-none focus:ring rounded-3xl w-full md:w-[350px]"
                  placeholder="password"
                  type="password"
                  required
                />
              </div>
            </div>
            <div className="mt-3 md:mt-5 w-full md:flex md:justify-center">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center">
                  <IoLockClosedOutline className="text-gray-900" />
                </span>
                <input
                  value={confPassword}
                  onChange={(e) => setConfpassword(e.target.value)}
                  className="p-2.5 pl-10 focus:outline-none focus:ring rounded-3xl w-full md:w-[350px]"
                  placeholder="conf password"
                  type="password"
                  required
                />
              </div>
            </div>
            <div className="mt-3 md:mt-5 w-full md:flex md:justify-center">
              <div className="flex flex-col md:flex-row justify-center gap-3">
                <button
                  type="submit"
                  className="text-center md:text-center hover:bg-[#1000ea] text-white p-2.5 border-2 rounded-3xl w-full md:w-[150px]"
                >
                  {isLoading ? "Loading ....." : "Register"}
                </button>
                <NavLink
                  to={"/login"}
                  className="text-center md:text-center md:mt-0 hover:bg-[#fa9804] bg-gradient-to-r from-[#fdad01] via-[#feaf00] to-[#fa9804] text-black p-2.5 border-2 rounded-3xl w-full md:w-[150px]"
                >
                  Sign in
                </NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
