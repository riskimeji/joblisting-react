import React from "react";
// import Navbar from "../../../components/User/Layout/Navbar";
import HomeNav from "../../../components/Public/Layout/HomeNav";
const UserLayout = ({ children }) => {
  return (
    <React.Fragment>
      <HomeNav />
      <div style={{ paddingTop: "100px" }}>{children}</div>
    </React.Fragment>
  );
};

export default UserLayout;
