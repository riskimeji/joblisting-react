import React from "react";
import { NavLink } from "react-router-dom";
const StepCard = () => {
  return (
    <div className="bg-[#f2f5f1] w-auto md:flex md:justify-center">
      <div className="">
        <div className="md:flex-col md:text-center text-center pt-5 mx-5">
          <div className="text-3xl font-bold mb-4 text-[#2b3280]">
            Easy to use, Easy to apply
          </div>
          <div className="text-xl text-gray-700">How it Works</div>
        </div>
        <div className="md:pb-20 p-10 md:pt-2 md:flex md:gap-7">
          <div className="bg-[#ececf3] p-10 h-auto mt-5 md:w-auto rounded-lg">
            <div className="text-xl font-bold">Sign Up For Job</div>
            <div className="pt-4 text-gray-700">
              Create your account to access a world of job opportunities.
              Complete your profile and stand out to employers
            </div>
            <div className="pt-5">
              <button className="p-2 px-5 md:mt-4 bg-[#b1adea] rounded-lg">
                Register
              </button>
            </div>
          </div>
          <div className="bg-[#ffeced] p-10 h-auto md:w-auto mt-5 rounded-lg">
            <div className="text-xl font-bold">Search for Jobs</div>
            <div className="pt-4 text-gray-700">
              Explore a wide range of job listings tailored to your skills and
              preferences. Use advanced search filters to find your dream job
            </div>
            <div className="pt-5 ">
              <input
                className="p-2 rounded-lg focus:outline-none focus:ring w-full sm:w-auto"
                type="text"
                placeholder="Find Job"
              />
              <button className="p-2 px-5 mt-4 bg-[#b1adea] rounded-lg md:ml-3">
                Find
              </button>
            </div>
          </div>
          <div className="bg-[#ffecf7] p-10 h-auto md:w-auto mt-5 rounded-lg">
            <div className="text-xl font-bold">Apply to job your Choice</div>
            <div className="pt-4 text-gray-700">
              Submit your job applications with ease. Track your application
              progress and get ready to embark on your career journey
            </div>
            <div className="pt-5">
              <button className="p-2 px-5 md:mt-4 bg-[#b1adea] rounded-lg">
                Apply now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
