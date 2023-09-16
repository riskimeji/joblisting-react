import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const EditCategory = () => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { uuid } = useParams();
  useEffect(() => {
    const getCategoryById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/category/${uuid}`
        );
        setName(response.data.name);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getCategoryById();
  }, [uuid]);
  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/category/${uuid}`, {
        name: name,
      });
      navigate("/category");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">User</h1>
      <h2 className="subtitle">Edit User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <p className="has-text-centered">{msg}</p>
            <form onSubmit={updateCategory}>
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

export default EditCategory;
