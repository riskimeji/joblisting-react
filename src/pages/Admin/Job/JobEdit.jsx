import React, { useEffect } from "react";
import EditJob from "../../../components/Admin/Job/EditJob";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../../features/authSlice";

const JobEdit = () => {
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
    <Layout>
      <EditJob />
    </Layout>
  );
};

export default JobEdit;