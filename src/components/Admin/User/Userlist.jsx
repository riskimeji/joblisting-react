import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { IoTrashSharp, IoPencil } from "react-icons/io5";

const Userlist = () => {
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },

    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center gap-2 ml-2">
          <Link
            to={`/users/edit/${row.uuid}`}
            className="button is-small is-info"
          >
            <IoPencil className="text-blue-600 text-2xl" />
          </Link>
          <Link
            onClick={() => deleteUser(row.uuid)}
            className="button is-small is-danger"
          >
            <IoTrashSharp className="text-red-600 text-2xl" />
          </Link>
        </div>
      ),
    },
  ];
  const [users, setUsers] = useState([]);
  const dataWithNumber = users.map((user, index) => ({
    ...user,
    id: index + 1,
  }));

  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/admin/user");
    setUsers(response.data);
    setFilter(response.data);
  };
  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/api/admin/user/${userId}`);
    getUsers();
  };
  const [filter, setFilter] = useState([]);

  const handleSearch = (event) => {
    const newData = filter.filter((row) =>
      row.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setUsers(newData);
  };
  return (
    <div>
      <div className="text-center text-2xl font-bold">Data User</div>
      <div className="mx-10 mt-5">
        <div className="flex justify-between items-center">
          <div className="">
            <NavLink
              to={"/users/create"}
              className="p-3 rounded-lg bg-blue-700 text-white"
            >
              Add New
            </NavLink>
          </div>

          <div className="flex justify-end">
            <input
              type="text"
              className="p-3 rounded-lg border mb-2 w-[230px]"
              placeholder="search user by everything you want...."
              onChange={handleSearch}
            />
          </div>
        </div>
        <DataTable
          className="shadow-lg bg-white"
          noHeader={true}
          columns={columns}
          data={dataWithNumber}
          pagination
          highlightOnHover
          selectableRows
          customStyles={{
            headRow: {
              style: {
                borderTop: "2px solid #CBD5E0",
              },
            },
            headCells: {
              style: {
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#2D3748",
                textTransform: "uppercase",
                backgroundColor: "#F9FAFB",
              },
            },
            cells: {
              style: {
                borderColor: "#E2E8F0",
                fontSize: "1rem",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Userlist;
