import React from "react";
import { NavLink } from "react-router-dom";

const SubscriptionUser = () => {
  return (
    <div className="bg-[#f2f5f1]">
      <div className="p-10">
        <div className="ease-in duration-150 rounded-lg p-10 bg-gradient-to-r from-cyan-500 to-blue-500">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">
              Subscribe for jobs vacancy updates
            </div>
            <div className="text-xl text-white pt-4">
              Sign up with your email to receive tailored job vacancy updates
              <br />
              directly in your inbox. Stay ahead in your job search
            </div>
          </div>
          <div className="flex justify-center md:flex md:mx-auto p-2 md:w-[550px] mt-5 rounded-lg">
            <div className="justify-center md:flex md:justify-center w-full">
              <div className="mx-2">
                <input
                  type="text"
                  className="border-2 
                border-white p-1.5 rounded-lg
                focus:outline-none focus:ring w-full"
                  placeholder="name"
                />
              </div>
              <div className="mx-2 mt-4 md:mt-0">
                <input
                  type="text"
                  className="border-2 
                border-white p-1.5 rounded-lg focus:outline-none focus:ring flex w-full "
                  placeholder="email@gmail.com"
                />
              </div>
              <div className="flex justify-center mt-4 md:mt-0">
                <button className="border border-slate-300 hover:border-indigo-300 text-white hover:bg-blue-500 p-1.5 rounded-lg md:px-6 md:ml-2">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionUser;
