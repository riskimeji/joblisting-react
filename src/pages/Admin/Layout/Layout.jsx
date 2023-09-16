import React from "react";
import Navbar from "../../../components/Admin/Layout/Navbar";
// import Sidebar from "../../../components/Admin/Layout/Sidebar";
const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="mt-3" style={{ minHeight: "100vh " }}>
        <div className="has-background-light">
          <main>{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
