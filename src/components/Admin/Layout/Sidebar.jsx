import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  IoPerson,
  IoArchive,
  IoHome,
  IoLogOut,
  IoGrid,
  IoLayersSharp,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../../features/authSlice";
import { faEnvelopeOpen, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <p className="menu-label">General</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <IoHome className="mr-2" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={"/jobs"}>
              <IoArchive className="mr-2" />
              Job
            </NavLink>
          </li>
        </ul>
        {user && user.role === "admin" && (
          <div className="">
            <p className="menu-label">Admin</p>
            <ul className="menu-list">
              <li>
                <NavLink to={"/users"}>
                  <IoPerson className="mr-2" />
                  Users
                </NavLink>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <NavLink to={"/category"}>
                  <IoGrid className="mr-2" />
                  Category
                </NavLink>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <NavLink to={"/career"}>
                  <IoLayersSharp className="mr-2" />
                  Career Path
                </NavLink>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <NavLink to={"/subscription"}>
                  <FontAwesomeIcon icon={faEnvelopeOpen} />
                  &nbsp; Subscription
                </NavLink>
              </li>
            </ul>
            <ul className="menu-list">
              <li>
                <NavLink to={"/jobtype"}>
                  <FontAwesomeIcon icon={faTag} />
                  &nbsp; Job Type
                </NavLink>
              </li>
            </ul>
          </div>
        )}
        <p className="menu-label">Settings</p>
        <ul className="menu-list">
          <li>
            <button onClick={logout} className="button is-white">
              <IoLogOut className="mr-2" />
              Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
