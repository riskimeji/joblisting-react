import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { getMe, LoginUser, reset } from "../../features/authSlice";
import LoginImage from "../../login.png";
import {
  IoLockClosedOutline,
  IoMailOutline,
  IoAlertCircleOutline,
} from "react-icons/io5";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message, pesan } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getMe());
    if (user && user.name !== null && user.role == "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate, dispatch]);
  useEffect(() => {
    if (user || isSuccess) {
      navigate("/user");
    }
    if (user && user.role == "admin") {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);
  const Auth = (e) => {
    e.preventDefault();
    dispatch(
      LoginUser({
        email,
        password,
      })
    );
  };
  return (
    <div className="md:flex md:justify-center h-screen">
      <div className="md:w-1/2 items-center hidden md:block">
        <img src={LoginImage} alt="" className=" md:mx-auto md:p-18 md:pt-14" />
      </div>
      <div className="md:mx-auto px-5 bg-[#005bea] h-full md:w-1/2 md:flex md:flex-col flex flex-col justify-center items-center md:items-center">
        <div className="text-white text-3xl text-center md:text-4xl font-bold">
          Login!
        </div>
        {pesan && (
          <div className="p-3 md:mb-[-20px] mt-3 md:w-auto md:mt-4 bg-[#ebc8c4] rounded-lg text-red-900">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                <IoAlertCircleOutline className="text-red-900" />
              </span>
              <div className="pl-10 pr-3">
                <strong>Error: </strong>
                {pesan}
              </div>
            </div>
          </div>
        )}
        <form onSubmit={Auth}>
          <div className="mt-5 md:mt-10 w-full md:flex md:justify-center">
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
                placeholder="***********"
                type="password"
              />
            </div>
          </div>
          <div className="mt-3 md:mt-5 w-full md:flex md:justify-center">
            <div className="flex flex-col md:flex-row justify-center gap-3">
              <button
                type="submit"
                className="text-center  md:text-center hover:bg-[#1000ea] text-white p-2.5 border-2 rounded-3xl w-full md:w-[150px]"
              >
                {isLoading ? "Loading..." : "Sign in"}{" "}
              </button>
              <NavLink
                to={"/register"}
                className="text-center md:text-center md:mt-0 hover:bg-[#fa9804] bg-gradient-to-r from-[#fdad01] via-[#feaf00] to-[#fa9804] text-black p-2.5 border-2 rounded-3xl w-full md:w-[150px]"
              >
                Register
              </NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
