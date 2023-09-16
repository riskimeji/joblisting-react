import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const TypejobList = () => {
  const [jobtypes, setJobtypes] = useState([]);
  useEffect(() => {
    getJobtype();
  }, []);
  const getJobtype = async () => {
    const response = await axios.get("http://localhost:5000/api/jobtype");
    setJobtypes(response.data);
  };
  const deleteJobtype = async (careerId) => {
    await axios.delete(`http://localhost:5000/api/jobtype/${careerId}`);
    getJobtype();
  };
  return (
    <div>
      <h1 className="title"> Type Job</h1>
      <h2 className="subtitle">List of Type Job</h2>
      <Link to={"/jobtype/create"}>
        <button className="button is-primary">Add Type Job</button>
      </Link>
      <table className="table is-striped is-fullwidth mt-2">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobtypes.map((jobtype, index) => (
            <tr key={jobtype.uuid}>
              <td>{index + 1}</td>
              <td>{jobtype.name}</td>
              <td>
                <Link
                  to={`/jobtype/edit/${jobtype.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <Link
                  onClick={() => deleteJobtype(jobtype.uuid)}
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

export default TypejobList;
