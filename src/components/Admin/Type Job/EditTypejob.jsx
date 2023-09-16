import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTypejob = () => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { uuid } = useParams();
  useEffect(() => {
    const getJobById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/jobtype/${uuid}`
        );
        setName(response.data.name);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getJobById();
  }, [uuid]);
  const updateJob = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/jobtype/${uuid}`, {
        name: name,
      });
      navigate("/jobtype");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Job Type</h1>
      <h2 className="subtitle">Edit Job Type</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <p className="has-text-centered">{msg}</p>
            <form onSubmit={updateJob}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    placeholder="your name"
                  />
                </div>
              </div>
              <div className="field mt-5">
                <button
                  type="submit"
                  className="button is-success is-fullwidth"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTypejob;
