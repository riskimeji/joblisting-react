import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import JobAppliedAdmin from "../../../components/Admin/JobApplied/JobAppliedAdmin";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
const JobAppliedPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, navigate, user]);
  return (
    <div>
      <Layout>
        <JobAppliedAdmin />
      </Layout>
    </div>
  );
};

export default JobAppliedPage;
