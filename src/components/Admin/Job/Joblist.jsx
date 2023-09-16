import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import DataTable from "react-data-table-component";
import { IoTrashSharp, IoPencil } from "react-icons/io5";

const Joblist = () => {
  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    // {
    //   name: "Industry",
    //   selector: (row) => row.category.name,
    //   sortable: true,
    // },
    {
      name: "Career",
      selector: (row) => row.career.name,
      sortable: true,
    },
    // {
    //   name: "Salary",
    //   selector: (row) => row.est_gaji,
    //   sortable: true,
    // },
    {
      name: "Category",
      selector: (row) => row.jobtype.name,
      sortable: true,
    },
    // {
    //   name: "Status",
    //   selector: (row) => row.status,
    //   sortable: true,
    // },
    {
      name: "Publisher",
      selector: (row) => row.user.name,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.createdAt,
      sortable: true,
      cell: (row) => (
        <span>
          {format(new Date(row.createdAt), "dd MMMM yyyy", { locale: id })}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center gap-2 ml-2">
          <Link
            to={`/jobs/edit/${row.uuid}`}
            className="button is-small is-info"
          >
            <IoPencil className="text-blue-600 text-2xl" />
          </Link>
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

  const [jobs, setJobs] = useState([]);
  const [filter, setFilter] = useState([]);
  const dataWithNumber = jobs.map((job, index) => ({
    ...job,
    id: index + 1,
  }));

  useEffect(() => {
    getJobs();
  }, []);
  const getJobs = async () => {
    const response = await axios.get("http://localhost:5000/api/admin/job");
    setJobs(response.data);
    setFilter(response.data);
  };
  const deleteJob = async (jobId) => {
    await axios.delete(`http://localhost:5000/api/admin/job/${jobId}`);
    getJobs();
  };
  const handleSearch = (event) => {
    const newData = filter.filter((row) =>
      row.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setJobs(newData);
  };
  return (
    <div>
      {/* <h1 className="title">Job</h1>
      <h2 className="subtitle">List of Jobs</h2>
      <Link to={"/jobs/create"}>
        <button className="button is-primary">Add Job</button>
      </Link> */}
      <div className="text-center text-2xl font-bold">Data Jobs</div>
      <div className="mx-10 mt-5">
        <div className="flex justify-between items-center">
          <div className="">
            <NavLink
              to={"/jobs/create"}
              className="p-3 rounded-lg bg-blue-700 text-white"
            >
              Add New
            </NavLink>
          </div>

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
                textTransform: "uppercase", // Uppercase text
                backgroundColor: "#F9FAFB", // Gray background color
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

      {/* <table className="table is-striped is-fullwidth mt-2">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Industry</th>
            <th>Career</th>
            <th>Est Salary</th>
            <th>Job Type</th>
            <th>Status</th>
            <th>Publisher</th>
            <th>Publish Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr key={job.uuid}>
              <td>{index + 1}</td>
              <td>{job.title}</td>
              <td>{job.category.name}</td>
              <td>{job.career.name}</td>
              <td>{job.est_gaji}</td>
              <td>{job.jobtype.name}</td>
              <td>{job.status}</td>
              <td>{job.user.name}</td>
              <td>
                {format(new Date(job.createdAt), "dd MMMM yyyy", {
                  locale: id,
                })}
              </td>

              <td>
                <Link
                  to={`/jobs/edit/${job.uuid}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <Link
                  onClick={() => deleteJob(job.uuid)}
                  className="button is-small is-danger"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default Joblist;
