import React, { useState } from "react";

import Logo from "../../../assets/logo dash.png";
import {
  IoArrowBackCircleOutline,
  IoPerson,
  IoArchive,
  IoHome,
  IoLogOut,
  IoGrid,
  IoLayersSharp,
} from "react-icons/io5";
const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const menus = [
    {
      title: "Dashboard",
      src: IoHome,
    },
    {
      title: "Users",
      src: IoPerson,
      gap: true,
    },
    {
      title: "Jobs",
      src: IoArchive,
    },
    {
      title: "Career",
      src: IoLayersSharp,
    },
    {
      title: "Category",
      src: IoGrid,
    },
    {
      title: "Logout",
      src: IoLogOut,
      gap: true,
    },
  ];
  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } duration-300 h-screen p-5 pt-8 bg-dark-purple relative`}
    >
      <IoArrowBackCircleOutline
        onClick={() => setOpen(!open)}
        className={`absolute cursor-pointer bg-white rounded-full -right-4 top-9 w-8 h-8 border-2 border-dark-purple ${
          !open && "rotate-180 -right-4"
        }`}
      />
      <div className='flex gap-x-4 items-center'>
        <img
          src={Logo}
          alt=''
          className={`w-10 h-10 cursor-pointer duration-500 rounded-lg bg-white ${
            open && "rotate-[360deg]"
          } `}
        />
        <h1
          className={`text-white text-xl font-medium duration-300 ${
            !open && "scale-0"
          }`}
        >
          WorkSwift
        </h1>
      </div>
      <ul className='pt-6'>
        {menus.map((menu, index) => (
          <li
            key={index}
            className={`text-gray-300 flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
              menu.gap ? "mt-9" : "mt-2"
            } ${index === 0 && "bg-light-white"}`}
          >
            <div className='text-xl'>{<menu.src />}</div>
            <span
              className={` ${!open && "opacity-0"} transition-opacity`}
              style={{ opacity: open ? 1 : 0 }}
            >
              {menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   IoPerson,
//   IoArchive,
//   IoHome,
//   IoLogOut,
//   IoGrid,
//   IoLayersSharp,
// } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { LogOut, reset } from "../../../features/authSlice";
// import { faEnvelopeOpen, faTag } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.auth);

//   const logout = () => {
//     dispatch(LogOut());
//     dispatch(reset());
//     navigate("/login");
//   };
//   return (
//     <div>
//       <aside className="menu pl-2 has-shadow">
//         <p className="menu-label">General</p>
//         <ul className="menu-list">
//           <li>
//             <NavLink to={"/dashboard"}>
//               <IoHome className="mr-2" />
//               Dashboard
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to={"/jobs"}>
//               <IoArchive className="mr-2" />
//               Job
//             </NavLink>
//           </li>
//         </ul>
//         {user && user.role === "admin" && (
//           <div className="">
//             <p className="menu-label">Admin</p>
//             <ul className="menu-list">
//               <li>
//                 <NavLink to={"/users"}>
//                   <IoPerson className="mr-2" />
//                   Users
//                 </NavLink>
//               </li>
//             </ul>
//             <ul className="menu-list">
//               <li>
//                 <NavLink to={"/category"}>
//                   <IoGrid className="mr-2" />
//                   Category
//                 </NavLink>
//               </li>
//             </ul>
//             <ul className="menu-list">
//               <li>
//                 <NavLink to={"/career"}>
//                   <IoLayersSharp className="mr-2" />
//                   Career Path
//                 </NavLink>
//               </li>
//             </ul>
//             <ul className="menu-list">
//               <li>
//                 <NavLink to={"/subscription"}>
//                   <FontAwesomeIcon icon={faEnvelopeOpen} />
//                   &nbsp; Subscription
//                 </NavLink>
//               </li>
//             </ul>
//             <ul className="menu-list">
//               <li>
//                 <NavLink to={"/jobtype"}>
//                   <FontAwesomeIcon icon={faTag} />
//                   &nbsp; Job Type
//                 </NavLink>
//               </li>
//             </ul>
//           </div>
//         )}
//         <p className="menu-label">Settings</p>
//         <ul className="menu-list">
//           <li>
//             <button onClick={logout} className="button is-white">
//               <IoLogOut className="mr-2" />
//               Logout
//             </button>
//           </li>
//         </ul>
//       </aside>
//     </div>
//   );
// };

// export default Sidebar;
