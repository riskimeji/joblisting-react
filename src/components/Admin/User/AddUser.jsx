import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfpassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/user/register", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
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
      <h2 className="subtitle">Add User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <p className="has-text-centered">{msg}</p>
            <form onSubmit={saveUser}>
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
              <div className="field mt-2">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="user@gmail.com"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="input"
                    placeholder="*******"
                    autocomplete="new-password"
                  />
                </div>
              </div>
              <div className="field mt-2">
                <label className="label">Confirmasi Password</label>
                <div className="control">
                  <input
                    value={confPassword}
                    onChange={(e) => setConfpassword(e.target.value)}
                    type="password"
                    className="input"
                    placeholder="*******"
                    autocomplete="new-password"
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
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
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

export default AddUser;
