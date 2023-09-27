import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { IoTrashSharp } from "react-icons/io5";
import Modal from "react-modal";

const CareerList = () => {
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [name, setName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [filter, setFilter] = useState([]);
  const [typeModal, setTypeModal] = useState("");

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
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-items-center gap-2">
          <Link
            onClick={() => deleteCareer(row.uuid)}
            className="button is-small is-danger"
          >
            <IoTrashSharp className="text-red-600 text-2xl" />
          </Link>
        </div>
      ),
    },
  ];

  const openModal = (careers) => {
    setTypeModal("edit");
    setName(careers.name);
    setSelectedCareer(careers);
    setModalIsOpen(true);
  };

  const openModalAdd = () => {
    setTypeModal("add");
    setName(careers.name);
    setSelectedCareer(careers);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setMsg("");
    setSelectedCareer(null);
    setModalIsOpen(false);
  };

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
  useEffect(() => {
    getCareers();
  }, []);
  const updateCareer = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/api/career/${selectedCareer.uuid}`,
        {
          name: name,
        }
      );
      getCareers();
      setModalIsOpen(false);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const saveCareer = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/career", {
        name: name,
      });
      getCareers();
      setModalIsOpen(false);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const getCareers = async () => {
    const response = await axios.get("http://localhost:5000/api/career");
    setCareers(response.data);
    setFilter(response.data);
  };
  const deleteCareer = async (careerId) => {
    await axios.delete(`http://localhost:5000/api/career/${careerId}`);
    getCareers();
  };
  const handleSearch = (event) => {
    const newData = filter.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setCareers(newData);
  };
  return (
    <>
      <div className="mx-10 md:mt-5 mt-7 ">
        <div className="text-center text-2xl mt-3 mb-3">Career List</div>
        <div className="flex justify-between items-center">
          <div className="">
            <button
              className="p-3 rounded-lg bg-blue-700 text-white"
              onClick={openModalAdd}
            >
              {"Add New"}
            </button>
          </div>
          <Modal
            style={customStyles}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
          >
            {selectedCareer && (
              <div className="w-max md:w-[499px]">
                <h1 className="font-bold text-center mb-3">
                  {typeModal === "add" ? "Add Career" : "Edit Career"}
                </h1>
                {msg && <p className="text-center">{msg}</p>}
                <form
                  onSubmit={typeModal === "add" ? saveCareer : updateCareer}
                >
                  <div className="mt-5">
                    <label htmlFor="">{"Name"}</label>
                    <br />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      name="name"
                      className="w-full mt-2 py-1 outline-none border-b-2 border-black focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="p-2 px-5 mt-5 bg-gray-900 text-white rounded-sm"
                  >
                    {typeModal === "add" ? "Create" : "Save"}
                  </button>
                </form>
              </div>
            )}
          </Modal>
          <div className="flex justify-end">
            <input
              type="text"
              className="p-3 rounded-lg border mb-2 w-[230px]"
              placeholder="search job by everything you want...."
              onChange={handleSearch}
            />
          </div>
        </div>
        <DataTable
          className="shadow-lg bg-white"
          noHeader={true}
          columns={columns}
          data={careers}
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
      {/* <h1 className="title"> Career</h1>
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
      </table> */}
    </>
  );
};

export default CareerList;
