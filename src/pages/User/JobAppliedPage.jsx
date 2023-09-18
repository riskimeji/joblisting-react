import React, { useEffect } from "react";
import UserLayout from "./Layout/UserLayout";
import IndexJobApplied from "../../components/User/JobApplied/IndexJobApplied";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const JobAppliedPage = () => {
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
          <IndexJobApplied />
        </div>
      </UserLayout>
    </div>
  );
};

export default JobAppliedPage;
