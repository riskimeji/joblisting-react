import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { IoTrashSharp, IoPencil } from "react-icons/io5";
import Modal from "react-modal";

const JobAppliedAdmin = () => {
  const [jobApplied, setJobApplied] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const statusOptions = [
    "Accepted",
    "In Progress",
    "Pending",
    "Under Review",
    "Rejected",
  ];
  const [selectedStatus, setSelectedStatus] = useState("");

  const [msg, setMsg] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
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

  const openModal = (job) => {
    setSelectedStatus(job.status);
    setSelectedJob(job);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setMsg(""); // Reset message
    setSelectedJob(null);
    setModalIsOpen(false);
  };
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.user.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.user.email,
      sortable: true,
    },

    {
      name: "Job Title",
      selector: (row) => row.job.title,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center gap-2 ml-2">
          <Link
            onClick={() => deleteJob(row.uuid)}
            className="button is-small is-danger"
          >
            <IoTrashSharp className="text-red-600 text-2xl" />
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getJobApplied();
  }, []);

  const updateJob = async () => {
    try {
      if (selectedJob) {
        await axios.patch(
          `http://localhost:5000/api/user/jobapplied/${selectedJob.uuid}`,
          {
            status: selectedStatus,
          }
        );
        setMsg("Job status updated successfully.");
        getJobApplied();
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  const getJobApplied = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/user/jobapplied"
    );
    setJobApplied(response.data);
    setFilter(response.data);
  };
  const deleteJob = async (id) => {
    await axios.delete(`http://localhost:5000/api/user/jobapplied/${id}`);
    getJobApplied();
  };
  const [filter, setFilter] = useState([]);
  const handleSearch = (event) => {
    const newData = filter.filter((row) =>
      row.user.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setJobApplied(newData);
  };

  return (
    <div>
      <div className="text-center text-2xl font-bold">Data Job Applied</div>
      <div className="">
        <Modal
          style={customStyles}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Detail Pekerjaan"
        >
          {selectedJob && (
            <div className="flex-col md:min-w-[674px] min-w-[300px] bg-white ">
              <h1 className="text-lg font-bold">{selectedJob.job.title}</h1>
              <p className="text-lg mt-2 mb-2">name: {selectedJob.user.name}</p>
              <label
                htmlFor="statusDropdown"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Select Status:
              </label>
              <select
                id="statusDropdown"
                value={selectedStatus}
                onChange={handleStatusChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Status</option>
                {statusOptions.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {selectedStatus && (
                <div className="mt-2 text-gray-700">
                  Selected Status:
                  <span className="font-bold">{selectedStatus}</span>
                </div>
              )}
              <button
                type="button"
                onClick={updateJob}
                className="p-2 ml-2 px-6 bg-blue-700 text-white rounded-lg mt-3 flex justify-center"
              >
                Update
              </button>
              <div className="text-center">{msg}</div>
            </div>
          )}
        </Modal>
      </div>
      <div className="mx-10 mt-5">
        <div className="flex justify-between ">
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
          data={jobApplied}
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

export default JobAppliedAdmin;
