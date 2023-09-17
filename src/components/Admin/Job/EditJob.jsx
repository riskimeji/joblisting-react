import React, { useState, useEffect } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import slugify from "slugify";

const EditJob = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [est_gaji, setGaji] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [slug, setSlug] = useState("");
  const [msg, setMsg] = useState("");
  const { uuid } = useParams();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategory] = useState("");
  const [careers, setCareers] = useState([]);
  const [jobtypes, setJobtypes] = useState([]);
  const [careerId, setCareer] = useState("");
  const [jobtypeId, setJobtype] = useState("");

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    const newSlug = slugify(newTitle, {
      replacement: "-",
      remove: undefined,
      lower: true,
      strict: false,
      locale: "id",
      trim: true,
    });
    setSlug(newSlug);
  };
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
    const fetchJobTypes = async () => {
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
    const getJobById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/job/${uuid}`
        );
        setTitle(response.data.title);
        setSlug(response.data.slug);
        setCategory(response.data.category.id);
        setCareer(response.data.career.id);
        setJobtype(response.data.jobtype.id);
        setAddress(response.data.address);
        setGaji(response.data.est_gaji);
        setDescription(response.data.description);
        setStatus(response.data.status);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    fetchCategories();
    fetchCareers();
    fetchJobTypes();
    getJobById();
  }, [uuid]);
  // const handleJobtypeChange = (e) => {
  //   setJobtype(e.target.value);
  // };

  const updateJob = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/api/admin/job/${uuid}`, {
        title: title,
        categoryId: categoryId,
        careerId: careerId,
        address: address,
        est_gaji: est_gaji,
        jobtypeId: jobtypeId,
        description: description,
        // status: status,
        slug: slug,
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
        <div className="text-blue-500 cursor-pointer justify-start ml-6">
          <NavLink to={"/dashboard"}>Dashboard / </NavLink>
          <NavLink to={"/jobs"}>Jobs / </NavLink>
          <NavLink to={"/#"}>Edit</NavLink>
        </div>
        <div className="md:mx-40 md:mt-8">
          <form onSubmit={updateJob}>
            <div className="text-center">{msg}</div>
            <div className="mt-4 flex justify-center mx-14 flex-col md:flex-row">
              <div className="flex flex-col md:w-1/2 mb-2 md:mb-0 md:mr-3">
                <div className="flex items-center mb-2">
                  <div className="text-black md:font-bold ">Job Title</div>
                  <div className="text-red-500 ml-1 font-bold">*</div>
                </div>
                <div className="text-gray-500 hidden md:block">
                  A job title must describe one position only
                </div>
              </div>
              <div className="flex-grow">
                <input
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  className="px-4 py-2 w-full rounded-sm border border-gray-400 shadow-sm"
                  placeholder={`e.g. "Software Engineer"`}
                  required
                />
              </div>
            </div>
            <div className="mt-4 mb-4 ml-6 mr-6 p-[0.5px] bg-[#bdc2c7] hidden md:block "></div>
            <div className="mt-4 md:mt-6 flex justify-center mx-14 flex-col md:flex-row">
              <div className="flex flex-col md:w-1/2 mb-2 md:mb-0 md:mr-3">
                <div className="flex items-center mb-2">
                  <div className="text-black md:font-bold ">Url</div>
                  <div className="text-red-500 ml-1 font-bold">*</div>
                </div>
                <div className="text-gray-500 hidden md:block">
                  this is will be your url post
                </div>
              </div>
              <div className="flex-grow">
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="px-4 py-2 pr-8 w-full text-gray-700 rounded-sm border border-gray-400 shadow-sm"
                  placeholder={`e.g. "software-enigneer"`}
                  required
                />
              </div>
            </div>
            <div className="mt-4 mb-4 ml-6 mr-6 p-[0.5px] bg-[#bdc2c7] hidden md:block "></div>
            <div className="mt-4 md:mt-6 flex justify-center mx-14 flex-col md:flex-row">
              <div className="flex flex-col md:w-1/2 mb-2 md:mb-0 md:mr-3">
                <div className="flex items-center mb-2">
                  <div className="text-black md:font-bold ">Category</div>
                  <div className="text-red-500 ml-1 font-bold">*</div>
                </div>
                <div className="text-gray-500 hidden md:block">
                  Choose a category based on the industry of the job you're
                  offering. This helps job seekers find relevant opportunities
                  easily.{" "}
                </div>
              </div>
              <div className="flex-grow">
                <div className="relative">
                  <select
                    value={jobtypeId}
                    onChange={(e) => setJobtype(e.target.value)}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-sm shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  >
                    <option>Select Category</option>
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
            <div className="mt-4 mb-4 ml-6 mr-6 p-[0.5px] bg-[#bdc2c7] hidden md:block "></div>
            <div className="mt-4 md:mt-6 flex justify-center mx-14 flex-col md:flex-row">
              <div className="flex flex-col md:w-1/2 mb-2 md:mb-0 md:mr-3">
                <div className="flex items-center mb-2">
                  <div className="text-black md:font-bold ">Career Path</div>
                  <div className="text-red-500 ml-1 font-bold">*</div>
                </div>
                <div className="text-gray-500 hidden md:block">
                  Choose a career path based on your experience level. This
                  helps in identifying suitable opportunities for your career
                  growth.
                </div>
              </div>
              <div className="flex-grow">
                <div className="relative">
                  <select
                    value={careerId}
                    onChange={(e) => setCareer(e.target.value)}
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded-sm shadow leading-tight focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                  >
                    <option>Pilih Career</option>
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
            <div className="mt-4 mb-4 ml-6 mr-6 p-[0.5px] bg-[#bdc2c7] hidden md:block "></div>
            <div className="mt-4 md:mt-6 flex justify-center mx-14 flex-col md:flex-row">
              <div className="flex flex-col md:w-1/2 mb-2 md:mb-0 md:mr-3">
                <div className="flex items-center mb-2">
                  <div className="text-black md:font-bold ">Address</div>
                  <div className="text-red-500 ml-1 font-bold">*</div>
                </div>
                <div className="text-gray-500 hidden md:block">
                  Provide a detailed address to help potential employers and
                  others locate you easily.{" "}
                </div>
              </div>
              <div className="flex-grow">
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="px-4 py-2 pr-8 w-full rounded-sm border border-gray-400 shadow-sm"
                  placeholder="JL. Durian tarung no 26"
                  rows={4}
                />
              </div>
            </div>
            <div className="mt-4 mb-4 ml-6 mr-6 p-[0.5px] bg-[#bdc2c7] hidden md:block "></div>
            <div className="mt-4 md:mt-6 flex justify-center mx-14 flex-col md:flex-row">
              <div className="flex flex-col md:w-1/2 mb-2 md:mb-0 md:mr-3">
                <div className="flex items-center mb-2">
                  <div className="text-black md:font-bold ">Salary</div>
                  <div className="text-red-500 ml-1 font-bold">*</div>
                </div>
                <div className="text-gray-500 hidden md:block">
                  Enter the expected salary range for this job position. This
                  helps candidates evaluate if the job aligns with their salary
                  expectations.
                </div>
              </div>
              <div className="flex-grow">
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
            <div className="mt-4 mb-4 ml-6 mr-6 p-[0.5px] bg-[#bdc2c7] hidden md:block "></div>
            <div className="mt-4 md:mt-6 flex justify-center mx-14 flex-col md:flex-row">
              <div className="flex flex-col md:w-1/2 mb-2 md:mb-0 md:mr-3">
                <div className="flex items-center mb-2">
                  <div className="text-black md:font-bold ">Job Type</div>
                  <div className="text-red-500 ml-1 font-bold">*</div>
                </div>
                <div className="text-gray-500 hidden md:block">
                  Choose one or more job types that apply to this position
                  (e.g., full-time, part-time, freelance, etc.). This helps
                  candidates evaluate if the job aligns with their availability
                  and preferences.
                </div>
              </div>
              <div className="flex-grow">
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
            <div className="mt-4 mb-4 ml-6 mr-6 p-[0.5px] bg-[#bdc2c7] hidden md:block "></div>
            <div className="mt-4 md:mt-6  justify-center mx-14 md:flex-row">
              <div className="mb-2 md:mb-0 md:mr-3">
                <div className="flex items-center mb-2">
                  <div className="text-black md:font-bold ">Description</div>
                  <div className="text-red-500 ml-1 font-bold">*</div>
                </div>
                <div className="text-gray-500 hidden md:block">
                  Enter a detailed description of the job role,
                  responsibilities, qualifications, and any other important
                  information. Be clear and comprehensive to help candidates
                  understand the position better.
                </div>
              </div>
              <div className="mt-4">
                <div className="control">
                  <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onReady={(editor) => {
                      console.log("Editor is ready to use!", editor);
                      editor.editing.view.change((writer) => {
                        writer.setStyle(
                          "height",
                          "400px",
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
            </div>
            <div className="mt-4 md:my-8 flex justify-end mx-8 flex-col md:ml-[100px] mb-8 md:w-40">
              <button
                type="submit"
                className="py-2 px-3 rounded-sm bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
