import React, { useEffect, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Createjob = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [est_gaji, setGaji] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [careers, setCareers] = useState([]);
  const [jobtypes, setJobtypes] = useState([]);
  const [msg, setMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category");
        setCategories(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    const fetchJobType = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobtype");
        setJobtypes(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    const fetchCareers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/career");
        setCareers(response.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    fetchJobType();
    fetchCategories();
    fetchCareers();
  }, []);
  const [categoryId, setCategory] = useState("");
  const [careerId, setCareer] = useState("");
  const [jobtypeId, setJobtype] = useState("");
  const handleJobtypeChange = (e) => {
    setJobtype(e.target.value);
  };
  const saveJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin/job", {
        title: title,
        categoryId: categoryId,
        careerId: careerId,
        jobtypeId: jobtypeId,
        address: address,
        est_gaji: est_gaji,
        description: description,
        status: status,
      });
      navigate("/jobs");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <div className="">
        <div className="text-blue-500 cursor-pointer justify-start ml-3">
          Dashboard / Jobs / Create
        </div>
        {/* <div className="text-center font-bold text-xl mt-4">Create Job</div> */}
        <div className="mt-4 flex justify-center mx-4 flex-col ">
          <div className="flex items-center mb-2">
            <div className="text-black">Job title</div>
            <div className="text-red-500 ml-1 font-bold">*</div>
          </div>
          <div className="mb-2 hidden text-gray-600  text-left">
            A job title must describe one position only
          </div>
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-2 pr-8 w-full rounded-sm border border-gray-400 shadow-sm"
              placeholder={`e.g. "Software Engineer"`}
              required
            />
          </div>
        </div>
        <div className="mt-4 flex justify-center mx-4 flex-col ">
          <div className="flex items-center mb-2">
            <div className="text-black">Category</div>
            <div className="text-red-500 ml-1 font-bold">*</div>
          </div>
          <div className="text-gray-600 text-left hidden">
            Choose a category based on the industry of the job you're offering.
            This helps job seekers find relevant opportunities easily.
          </div>
          <div>
            <div className="relative">
              <select
                value={categoryId}
                onChange={(e) => setCategory(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-sm shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
              >
                <option>Pilih Industri</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center mx-4 flex-col ">
          <div className="flex items-center mb-2">
            <div className="text-black">Career Path</div>
            <div className="text-red-500 ml-1 font-bold">*</div>
          </div>
          <div className="text-gray-600 text-left hidden">
            Choose a career path based on your experience level. This helps in
            identifying suitable opportunities for your career growth.
          </div>
          <div>
            <div className="relative">
              <select
                value={careerId}
                onChange={(e) => setCareer(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-sm shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
              >
                <option>Pilih Industri</option>
                {careers.map((career) => (
                  <option
                    key={career.id}
                    value={career.id}
                    onChange={(e) => setCareer(e.target.value)}
                  >
                    {career.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center mx-4 flex-col ">
          <div className="flex items-center mb-2">
            <div className="text-black">Address</div>
            <div className="text-red-500 ml-1 font-bold">*</div>
          </div>
          <div className="mb-2 hidden text-gray-600  text-left">
            Provide a detailed address to help potential employers and others
            locate you easily.
          </div>
          <div>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="px-4 py-2 pr-8 w-full rounded-sm border border-gray-400 shadow-sm"
              placeholder="JL. Durian tarung no 26"
              rows={4}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-center mx-4 flex-col ">
          <div className="flex items-center mb-2">
            <div className="text-black">Salary</div>
            <div className="text-red-500 ml-1 font-bold">*</div>
          </div>
          <div className="mb-2 hidden text-gray-600  text-left">
            Enter the expected salary range for this job position. This helps
            candidates evaluate if the job aligns with their salary
            expectations.
          </div>
          <div>
            <input
              type="text"
              value={est_gaji}
              onChange={(e) => setGaji(e.target.value)}
              className="px-4 py-2 pr-8 w-full rounded-sm border border-gray-400 shadow-sm"
              placeholder={`e.g. "Rp. 1,000,000 - 3,000,000"`}
              required
            />
          </div>
        </div>
        <div className="mt-4 flex justify-center mx-4 flex-col ">
          <div className="flex items-center mb-2">
            <div className="text-black">Job Type</div>
            <div className="text-red-500 ml-1 font-bold">*</div>
          </div>
          <div className="text-gray-600 text-left hidden">
            Choose one or more job types that apply to this position (e.g.,
            full-time, part-time, freelance, etc.). This helps candidates
            evaluate if the job aligns with their availability and preferences.
          </div>
          <div>
            <div className="relative">
              <select
                value={jobtypeId}
                onChange={(e) => setJobtype(e.target.value)}
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-sm shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
              >
                <option>Select Job Type</option>
                {jobtypes.map((jobtype) => (
                  <option key={jobtype.id} value={jobtype.id}>
                    {jobtype.name}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center mx-4 flex-col mb-4 ">
          <div className="flex items-center mb-2">
            <div className="text-black">Description</div>
            <div className="text-red-500 ml-1 font-bold">*</div>
          </div>
          <div className="text-gray-600 text-left hidden">
            Enter a detailed description of the job role, responsibilities,
            qualifications, and any other important information. Be clear and
            comprehensive to help candidates understand the position better.
          </div>
          <div className="control">
            <CKEditor
              editor={ClassicEditor}
              value={description}
              onReady={(editor) => {
                console.log("Editor is ready to use!", editor);
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    "200px",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
              onChange={(event, editor) => {
                const newData = editor.getData();
                setDescription(newData);
              }}
            />
          </div>
        </div>
        <div className="mt-4 flex justify-center mx-4 flex-col mb-4 ">
          <button className="py-2 px-3 rounded-sm bg-blue-600 text-white">
            Submit
          </button>
        </div>
      </div>
      {/* <h1 className="title">Job</h1>
      <h2 className="subtitle">Add New Job</h2> */}
      {/* <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveJob}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input"
                    placeholder="title"
                  />
                </div>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control is-expanded">
                    <label className="label">Category</label>
                    <div className="select is-rounded">
                      <select
                        value={categoryId}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option>Pilih Industri</option>
                        {categories.map((category) => (
                          <option
                            key={category.id}
                            value={category.id}
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="control is-expanded">
                    <label className="label">Career Path</label>
                    <div className="select is-rounded">
                      <select
                        value={careerId}
                        onChange={(e) => setCareer(e.target.value)}
                      >
                        <option>Pilih Jenjang Karir</option>
                        {careers.map((career) => (
                          <option
                            key={career.id}
                            value={career.id}
                            onChange={(e) => setCareer(e.target.value)}
                          >
                            {career.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field mt-2">
                <label className="label">Address</label>
                <div className="control">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="input"
                    placeholder="JL. Durian tarung no 26"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Est Gaji</label>
                <div className="control">
                  <input
                    type="text"
                    value={est_gaji}
                    onChange={(e) => setGaji(e.target.value)}
                    className="input"
                    placeholder="Rp 7.000.000 - Rp 12.000.000"
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Type Job</label>
                {jobtypes.map((jobtype) => (
                  <div className="control" key={jobtype.id}>
                    <label>
                      <input
                        type="radio"
                        name="jobtypeId"
                        value={jobtype.id}
                        onChange={handleJobtypeChange}
                      />
                      &nbsp;{jobtype.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <CKEditor
                    editor={ClassicEditor}
                    value={description}
                    onReady={(editor) => {
                      console.log("Editor is ready to use!", editor);
                      editor.editing.view.change((writer) => {
                        writer.setStyle(
                          "height",
                          "200px",
                          editor.editing.view.document.getRoot()
                        );
                      });
                    }}
                    onChange={(event, editor) => {
                      const newData = editor.getData();
                      setDescription(newData);
                    }}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control is-expanded">
                  <label className="label">Status</label>
                  <div className="select is-rounded">
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option>Pilih Status</option>
                      <option value="Aktif">Aktif</option>
                      <option value="Non-Aktif">Non-Aktif</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field mt-5">
                <button
                  type="submit"
                  className="button is-success is-fullwidth"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Createjob;
