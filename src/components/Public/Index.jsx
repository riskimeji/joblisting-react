import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LinkedinLogo from "../../linkedin.png";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/utility.css";
import { subscriptionUser } from "../../features/authSlice";
import Banner from "../../../src/jobimage.png";
// import { useSelector } from "react-redux";

const Index = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isError, isSuccess, isLoading, subscriptionMessage } = useSelector(
    (state) => state.auth
  );
  const Auth = (e) => {
    e.preventDefault();
    dispatch(
      subscriptionUser({
        name,
        email,
      })
    );
  };
  return (
    <div className="bg-[#f2f5f1] ">
      <div className="md:flex md:justify-center md:p-16 px-14 h-auto md:items-center">
        <div className="py-4 md:w-[600px]">
          <div className="text-3xl md:text-6xl font-bold text-[#2b3280]">
            Find your dream job in one place
          </div>
          <div className="text-xl pt-4 text-[#24334e]">
            Unlock your career potential with our comprehensive job listings and
            professional development resources for job seekers
          </div>
        </div>
        <div className="">
          <img
            src={Banner}
            alt="Job Banner"
            className="md:block hidden md:w-auto md:justify-end md:pr-0 md:pb-10 "
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
