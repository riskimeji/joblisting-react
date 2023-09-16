import React from "react";
import UserLayout from "./Layout/UserLayout";
import IndexUser from "../../components/User/IndexUser";
const UserPage = () => {
  return (
    <div className="bg-[#f6f6f6]">
      <UserLayout>
        <div style={{ minHeight: "100vh" }}>
          <IndexUser />
        </div>
      </UserLayout>
    </div>
  );
};

export default UserPage;
