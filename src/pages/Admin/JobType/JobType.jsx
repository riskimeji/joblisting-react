import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import TypejobList from "../../../components/Admin/Type Job/TypejobList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";
const JobType = () => {
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
    <Layout>
      <TypejobList />
    </Layout>
  );
};

export default JobType;
