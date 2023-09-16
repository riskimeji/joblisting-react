import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const CategoryList = () => {
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    getCategorys();
  }, []);
  const getCategorys = async () => {
    const response = await axios.get("http://localhost:5000/api/category");
    setCategorys(response.data);
  };
  const deleteCategory = async (categoryId) => {
    await axios.delete(`http://localhost:5000/api/category/${categoryId}`);
    getCategorys();
  };
  return (
    <div>
      <h1 className="title"> Category</h1>
      <h2 className="subtitle">List of Categorys</h2>
      <Link to={"/category/create"}>
        <button className="button is-primary">Add Category</button>
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
          {categorys.map((category, index) => (
            <tr key={category.uuid}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>
                <Link
                  to={`/category/edit/${category.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <Link
                  onClick={() => deleteCategory(category.uuid)}
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

export default CategoryList;
