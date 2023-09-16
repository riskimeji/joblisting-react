import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Userlist = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/admin/user");
    setUsers(response.data);
  };
  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/api/admin/user/${userId}`);
    getUsers();
  };
  return (
    <div>
      <h1 className="title"> Users</h1>
      <h2 className="subtitle">List of Users</h2>
      <Link to={"/users/create"}>
        <button className="button is-primary">Add User</button>
      </Link>
      <table className="table is-striped is-fullwidth mt-2">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.uuid}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Link
                  to={`/users/edit/${user.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <Link
                  onClick={() => deleteUser(user.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
