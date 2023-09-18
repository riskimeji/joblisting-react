import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../../jobseeker-logos.png";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut, reset } from "../../../features/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const HomeNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };

  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="">
      <nav
        className={`w-full fixed top-0 left-0 font-[Noto Sans] transition-shadow duration-300 ease-linear ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="md:flex items-center justify-between bg-[#f2f5f1] py-4 md:px-10 px-7">
          <div className=" md:pl-20 cursor-pointer flex items-center text-black">
            <NavLink to={"/"} className=" text-indigo-600 mr-1">
              <img src={Logo} className="h-7 inline" alt="" />
            </NavLink>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-4 cursor-pointer md:hidden"
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} name="close" />
          </div>
          <ul
            className={`shadow-md md:shadow-none md:flex md:items-center md:mr-[40px] lg:mr-[120px] md:pb-0 pb-12 absolute md:static bg-[#f2f5f1] md:z-auto z-[-1] left-0 w-full md:auto md:pl-0 pl-9 transition-all duration-300 ease-in ${
              open ? "top-16 opacity-100" : "top-[-490px]"
            } opacity-0 md:opacity-100`}
          >
            {user && user.name !== null && (
              <li className="md:ml-8 text-base md:my-0 my-7 ">
                <NavLink
                  to={"/user"}
                  className={
                    location.pathname === "/user"
                      ? "text-blue-700 relative group uppercase font-bold"
                      : "text-gray-800 relative group uppercase "
                  }
                >
                  dashboard
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#0f2765] transform -translate-x-1/2 origin-center duration-300 group-hover:w-full translate-y-2 "></span>
                </NavLink>
              </li>
            )}
            {user && user.name !== null && (
              <li className="md:ml-8 text-base md:my-0 my-7 ">
                <NavLink
                  to={"/user/job-applied"}
                  className={
                    location.pathname === "/user/job-applied"
                      ? "text-blue-700 relative group uppercase font-bold"
                      : "text-gray-800 relative group uppercase "
                  }
                >
                  job application
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#0f2765] transform -translate-x-1/2 origin-center duration-300 group-hover:w-full translate-y-2 "></span>
                </NavLink>
              </li>
            )}

            <li className="md:ml-8 text-base md:my-0 my-7">
              <a href="" className=" text-gray-800 relative group uppercase">
                categories
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#0f2765] transform -translate-x-1/2 origin-center duration-300 group-hover:w-full translate-y-2 "></span>
              </a>
            </li>
            <li className="md:ml-8 text-base md:my-0 my-7">
              <a href="" className=" text-gray-800 relative group uppercase">
                blog
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#0f2765] transform -translate-x-1/2 origin-center duration-300 group-hover:w-full translate-y-2 "></span>
              </a>
            </li>
            {user && user.name !== null ? (
              <li className="md:ml-auto text-base md:my-0">
                <button
                  onClick={logout}
                  className=" text-white p-1 rounded px-5 md:ml-8 bg-blue-600 hover:bg-blue-700 duration-500"
                >
                  Log Out
                </button>
              </li>
            ) : (
              <li className="md:ml-auto text-base md:my-0">
                <NavLink
                  to="/login"
                  className=" text-white p-1.5 rounded px-5 md:ml-8 bg-gradient-to-r from-[#2c57ce] to-[#4a88ce] hover:bg-blue-700 duration-500"
                >
                  Get Started
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default HomeNav;
