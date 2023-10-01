import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { IoTrashSharp } from "react-icons/io5";
import Modal from "react-modal";

const TypejobList = () => {
  const [jobtypes, setJobtypes] = useState([]);
  const [selectedTypeJob, setSelectedTypeJob] = useState(null);
  const [msg, setMsg] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [filter, setFilter] = useState([]);
  const [typeModal, setTypeModal] = useState("");

  const columns = [
    {
      name: "id",
      selector: (row, index) => index + 1,
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
        <div className='flex justify-items-center gap-2'>
          <Link
            onClick={() => deleteJobtype(row.uuid)}
            className='button is-small is-danger'
          >
            <IoTrashSharp className='text-red-600 text-2xl' />
          </Link>
        </div>
      ),
    },
  ];

  const openModal = (typejob) => {
    setTypeModal("edit");
    setName(typejob.name);
    setSelectedTypeJob(typejob);
    setModalIsOpen(true);
  };

  const openModalAdd = () => {
    setTypeModal("add");
    setName(jobtypes.name);
    setSelectedTypeJob(jobtypes);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setMsg("");
    setSelectedTypeJob(null);
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
    getJobtype();
  }, []);

  const createTypeJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/jobtype", {
        name: name,
      });
      getJobtype();
      setModalIsOpen(false);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const updateJob = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/api/jobtype/${selectedTypeJob.uuid}`,
        {
          name: name,
        }
      );
      getJobtype();
      setModalIsOpen(false);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const getJobtype = async () => {
    const response = await axios.get("http://localhost:5000/api/jobtype");
    setJobtypes(response.data);
    setFilter(response.data);
  };
  const deleteJobtype = async (jobId) => {
    await axios.delete(`http://localhost:5000/api/jobtype/${jobId}`);
    getJobtype();
  };
  const handleSearch = (event) => {
    const newData = filter.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setJobtypes(newData);
  };
  return (
    <div>
      <div className='mx-10 md:mt-5 mt-7 '>
        <div className='text-center text-2xl mt-3 mb-3'>Career List</div>
        <div className='flex justify-between items-center'>
          <div className=''>
            <button
              className='p-3 rounded-lg bg-blue-700 text-white'
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
            {selectedTypeJob && (
              <div className='w-max md:w-[499px]'>
                <h1 className='font-bold text-center mb-3'>
                  {typeModal === "add" ? "Add Career" : "Edit Career"}
                </h1>
                {msg && <p className='text-center'>{msg}</p>}
                <form
                  onSubmit={typeModal === "add" ? createTypeJob : updateJob}
                >
                  <div className='mt-5'>
                    <label htmlFor=''>{"Name"}</label>
                    <br />
                    <input
                      type='text'
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      name='name'
                      className='w-full mt-2 py-1 outline-none border-b-2 border-black focus:border-blue-500'
                    />
                  </div>
                  <button
                    type='submit'
                    className='p-2 px-5 mt-5 bg-gray-900 text-white rounded-sm'
                  >
                    {typeModal === "add" ? "Create" : "Save"}
                  </button>
                </form>
              </div>
            )}
          </Modal>
          <div className='flex justify-end'>
            <input
              type='text'
              className='p-3 rounded-lg border mb-2 w-[230px]'
              placeholder='search job by everything you want....'
              onChange={handleSearch}
            />
          </div>
        </div>
        <DataTable
          className='shadow-lg bg-white'
          noHeader={true}
          columns={columns}
          data={jobtypes}
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

export default TypejobList;
