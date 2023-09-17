import React, { useEffect } from "react";
import UserLayout from "./Layout/UserLayout";
import IndexUser from "../../components/User/IndexUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getMe } from "../../features/authSlice";
const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
  }, [isError, navigate]);
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
