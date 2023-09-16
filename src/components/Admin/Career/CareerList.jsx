import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CareerList = () => {
  const [careers, setCareers] = useState([]);
  useEffect(() => {
    getCareers();
  }, []);
  const getCareers = async () => {
    const response = await axios.get("http://localhost:5000/api/career");
    setCareers(response.data);
  };
  const deleteCareer = async (careerId) => {
    await axios.delete(`http://localhost:5000/api/career/${careerId}`);
    getCareers();
  };
  return (
    <div>
      <h1 className="title"> Career</h1>
      <h2 className="subtitle">List of Careers</h2>
      <Link to={"/career/create"}>
        <button className="button is-primary">Add Career</button>
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
          {careers.map((career, index) => (
            <tr key={career.uuid}>
              <td>{index + 1}</td>
              <td>{career.name}</td>
              <td>
                <Link
                  to={`/career/edit/${career.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <Link
                  onClick={() => deleteCareer(career.uuid)}
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

export default CareerList;
