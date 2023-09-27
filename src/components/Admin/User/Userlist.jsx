import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { IoTrashSharp } from "react-icons/io5";
import Modal from "react-modal";

const Userlist = () => {
  const roleOption = ["admin", "member"];
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [msg, setMsg] = useState("");
  const [filter, setFilter] = useState([]);

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
        <div className="flex justify-center gap-2">
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

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "auto",
      transform: "translate(-50%, -50%)",
      background: "rgba(255, 255, 255, 0.8)",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      padding: "40px",
      transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
      maxHeight: "80vh",
      margin: "auto",
      overflowY: "auto",
    },
  };
  Modal.setAppElement("#root");
  const openModal = (user) => {
    setUser({
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "",
    });
    setSelectedUser(user);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setMsg("");
    setSelectedUser(null);
    setModalIsOpen(false);
  };

  // const dataWithNumber = users.map((user, index) => ({
  //   ...user,
  //   id: index + 1,
  // }));

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/admin/user");
    setUsers(response.data);
    setFilter(response.data);
  };
  useEffect(() => {
    getUsers();
  }, []);
  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/api/admin/user/${userId}`);
    getUsers();
  };

  const handleSearch = (event) => {
    const newData = filter.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setUsers(newData);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/user/${selectedUser.uuid}`,
        {
          name: user.name,
          email: user.email,
          role: user.role,
        }
      );
      getUsers();
      closeModal();
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <div className="text-center text-2xl font-bold">Data User</div>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detail User"
      >
        {selectedUser && (
          <div className="w-max md:w-[499px]">
            <h1 className="font-bold text-center mb-3">Detail User</h1>
            {msg && <p>{msg}</p>}
            <form onSubmit={updateUser}>
              <div className="mt-5">
                <label htmlFor="">Name</label>
                <br />
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => {
                    setUser({
                      ...user,
                      name: e.target.value,
                    });
                  }}
                  name="name"
                  className="w-full mt-2 py-1 outline-none border-b-2 border-black focus:border-blue-500"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="">Email</label>
                <br />
                <input
                  type="email"
                  value={user.email} // Use user.email instead of selectedUser.email
                  onChange={(e) => {
                    setUser({
                      ...user,
                      email: e.target.value,
                    });
                  }}
                  name="email"
                  className="w-full mt-2 py-1 outline-none border-b-2 border-black focus:border-blue-500"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="">Role</label>
                <br />
                <select
                  name="role"
                  className="outline-none py-2"
                  value={user.role} // Use user.role instead of selectedUser.role
                  onChange={(e) => {
                    setUser({
                      ...user,
                      role: e.target.value,
                    });
                  }}
                >
                  {roleOption.map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="p-2 px-5 mt-5 bg-gray-900 text-white rounded-sm"
              >
                Update
              </button>
            </form>
          </div>
        )}
      </Modal>
      <div className="mx-10 md:mt-5 mt-7 ">
        <div className="md:flex md:justify-end md:items-center">
          <div className="md:flex justify-end mt-3 md:mt-0">
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
          data={users}
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
                cursor: "pointer",
              },
            },
          }}
          onRowClicked={(row) => {
            openModal(row);
          }}
        />
      </div>
    </div>
  );
};

export default Userlist;
