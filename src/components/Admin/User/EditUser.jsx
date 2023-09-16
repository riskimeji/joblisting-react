import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { uuid } = useParams();
  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/user/${uuid}`
        );
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [uuid]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/admin/user/${uuid}`, {
        name: name,
        email: email,
        role: role,
      });
      navigate("/users");
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
            <form onSubmit={updateUser}>
              <p className="has-text-centered">{msg}</p>

              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="input"
                    placeholder="your name"
                  />
                </div>
              </div>
              <div className="field mt-2">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="input"
                    placeholder="user@gmail.com"
                  />
                </div>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded">
                    <label className="label">Role</label>
                    <div className="select is-rounded">
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option>Pilih Role</option>
                        <option value="admin">Admin</option>
                        <option value="member">Member</option>
                      </select>
                    </div>
                  </p>
                </div>
              </div>
              <div className="field mt-5">
                <button
                  type="submit"
                  className="button is-success is-fullwidth"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
