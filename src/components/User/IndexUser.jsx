import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../features/authSlice";
import { format } from "date-fns";
import id from "date-fns/locale/id";
import Modal from "react-modal";
import Paginate from "./Paginate.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import {
  IoCloseCircleOutline,
  IoLocationOutline,
  IoSearchOutline,
  IoBookmarkOutline,
  IoBookmark,
  IoLocationSharp,
} from "react-icons/io5";

const IndexUser = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select Location");
  const [filter, setFilter] = useState(true);
  const [bookmark, setBokmark] = useState(false);
  const [careers, setCareers] = useState([]);
  const [jobtypes, setJobtypes] = useState([]);
  const [msg, setMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(4);
  const [selectedCareers, setSelectedCareers] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [user, dispatch]);

  const regex = /(<([^>]+)>)/gi;

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleCareerChange = async (e) => {
    const selectedCareerId = Number(e.target.value);
    let updatedSelectedCareers;

    if (e.target.checked) {
      updatedSelectedCareers = [...selectedCareers, selectedCareerId];
      setCurrentPage(1);
    } else {
      updatedSelectedCareers = selectedCareers.filter(
        (careerId) => careerId !== selectedCareerId
      );
      setCurrentPage(1);
    }
    setSelectedCareers(updatedSelectedCareers);
  };

  const handleJobtypeChange = (e) => {
    const selectedJobTypeId = Number(e.target.value);
    let updatedSelectedJobType;

    if (e.target.checked) {
      updatedSelectedJobType = [...selectedJobTypes, selectedJobTypeId];
      setCurrentPage(1);
    } else {
      updatedSelectedJobType = selectedJobTypes.filter(
        (jobtypeId) => jobtypeId !== selectedJobTypeId
      );
      setCurrentPage(1);
    }

    setSelectedJobTypes(updatedSelectedJobType);
  };
  useEffect(() => {
    const fetchFilteredJobs = async () => {
      try {
        const jobResponse = await axios.get(
          "http://localhost:5000/api/admin/job",
          {
            params: {
              careers: selectedCareers.join(","),
              jobtypes: selectedJobTypes.join(","),
              search: searchKeyword,
            },
          }
        );
        setJobs(jobResponse.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchFilteredJobs();
  }, [selectedJobTypes, selectedCareers, searchKeyword]);

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
      padding: "20px",
      transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
    },
  };

  Modal.setAppElement("#root");

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setDropdownVisible(false);
  };

  const clickFliter = () => {
    setFilter(!filter);
  };
  const toggleBookmark = () => {
    setBokmark(!bookmark);
  };
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = (job) => {
    setSelectedJob(job);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setSelectedJob(null);
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:5000/api/category"
        );
        const jobTypeResponse = await axios.get(
          "http://localhost:5000/api/jobtype"
        );
        const careerResponse = await axios.get(
          "http://localhost:5000/api/career"
        );

        const jobResponse = await axios.get(
          "http://localhost:5000/api/admin/job"
        );

        setCategories(categoryResponse.data);
        setJobtypes(jobTypeResponse.data);
        setCareers(careerResponse.data);
        setJobs(jobResponse.data);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };

    fetchData();
  }, []);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = jobs.slice(firstPostIndex, lastPostIndex);

  const [categoryId, setCategory] = useState("");
  const [careerId, setCareer] = useState("");
  const [jobtypeId, setJobtype] = useState("");

  return (
    <div>
      <div className="md:flex mx-7 gap-4 pb-10">
        <Modal
          style={customStyles}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Detail Pekerjaan"
        >
          {selectedJob && (
            <div className="flex-col md:min-w-[674px] min-w-[300px] bg-white">
              <h1 className="text-lg font-bold">{selectedJob.title}</h1>
              <div className="text-sm text-[#89898d] mt-1 ">
                {selectedJob.jobtype.name}&nbsp;&nbsp;●&nbsp;&nbsp;
                {selectedJob.career.name}
                &nbsp;&nbsp;●&nbsp;&nbsp;{selectedJob.est_gaji}
              </div>
              <div className="">
                <div className="mt-3 text-[#89898d]">
                  {selectedJob.description.substring(0, 300).replace(regex, "")}
                </div>
                <div className="mt-3">
                  <div className="cursor-pointer p-2 mb-2 bg-[#ecf3fd] rounded-md inline-block  text-[#2986ff] mr-2">
                    {selectedJob.category.name}
                  </div>
                </div>
                <div className="mt-2 ">
                  <div className="h-full bg-gray-400 p-[0.5px] rounded-lg"></div>
                  <div className="">
                    <div className="flex items-center text-base mt-3">
                      <IoLocationSharp className="text-red-700 text-xl" />
                      <div className="flex justify-between w-full">
                        <div className="text-[#89898d] text-base">
                          &nbsp;{selectedJob.address}
                        </div>
                        <div className="text-[#89898d] text-base">
                          {format(
                            new Date(selectedJob.createdAt),
                            "dd MMMM yyyy",
                            {
                              locale: id,
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="p-2 ml-2 px-6 bg-blue-700 text-white rounded-lg mt-3 flex justify-center">
                Apply
              </button>
            </div>
          )}
        </Modal>

        <div className="md:flex flex-col">
          <div className="bg-[#ffffff] h-auto border border-gray-300 rounded-md md:w-[375px]">
            <div className="p-3 justify-center gap-2">
              {/* //relative */}
              <input
                type="text"
                className="px-4 p-2 border border-gray-300 rounded-lg w-full"
                placeholder="Search by Title, Company or any jobs keyword..."
                value={searchKeyword}
                onChange={handleSearchChange}
              />
              {/* <IoSearchOutline className="w-6 h-6 text-gray-500 absolute right-6 top-[20px]" /> */}
            </div>
          </div>
          <div className="bg-[#ffffff] h-auto border border-gray-300 rounded-md md:w-[375px] mt-2">
            <div className="p-3 mx-3">
              <div className="flex justify-between">
                <div
                  className={`text-lg font-bold cursor-pointer transition-transform hover:text-blue-700 ${
                    filter ? "hover:text-black" : "text-blue-700"
                  }`}
                  onClick={clickFliter}
                >
                  Filter
                </div>
                <div className="text-gray-400 cursor-pointer">
                  <div className="flex items-center">
                    Clear all
                    <IoCloseCircleOutline className="text-xl ml-1" />
                  </div>
                </div>
              </div>
              <div
                className={`origin-top transition-transform ${
                  filter ? "block" : "hidden"
                }`}
              >
                <div className="mt-4">
                  {/* <div className="font-bold">Location</div>
                  <div className="mt-2 relative">
                    <button
                      id="dropdownDividerButton"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                      onClick={toggleDropdown}
                    >
                      <IoLocationOutline className="w-5 h-5 mr-2.5" />
                      {selectedLocation}
                      <svg
                        className={`w-2.5 h-2.5 absolute right-3 top-1/2 transform -translate-y-1/2 ${
                          isDropdownVisible ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    {isDropdownVisible && (
                      <div
                        id="dropdownDivider"
                        className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow absolute left-0 mt-2 w-full "
                        style={{
                          position: "absolute",
                          zIndex: 10,
                          top: "calc(100% + 8px)",
                        }}
                      >
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownDividerButton"
                        >
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={() => handleLocationSelect("Padang")}
                            >
                              Padang
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={() => handleLocationSelect("Bandung")}
                            >
                              Bandung
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              onClick={() => handleLocationSelect("Jakarta")}
                            >
                              Jakarta
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div> */}
                </div>
                <div className="mt-4">
                  <div className="font-bold">Experience Levels</div>
                  <div className="mt-2">
                    <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      {careers.map((career) => (
                        <li
                          key={career.id}
                          className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                        >
                          <div className="flex items-center pl-3">
                            <input
                              id={`career-checkbox-${career.id}`}
                              type="checkbox"
                              value={career.id}
                              onChange={handleCareerChange}
                              checked={selectedCareers.includes(career.id)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={`career-checkbox-${career.id}`}
                              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              {career.name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="font-bold">Availability</div>
                  <div className="mt-2">
                    <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      {jobtypes.map((jobtype) => (
                        <li
                          key={jobtype.id}
                          className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                        >
                          <div className="flex items-center pl-3">
                            <input
                              id={`jobtype-checkbox-${jobtype.id}`}
                              type="checkbox"
                              value={jobtype.id}
                              onChange={handleJobtypeChange}
                              checked={selectedJobTypes.includes(jobtype.id)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />

                            <label
                              htmlFor={`jobtype-checkbox-${jobtype.id}`}
                              className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              {jobtype.name}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="font-bold">Salary</div>
                  <div className="mt-2">
                    <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="list-radio-millitary"
                            type="radio"
                            value=""
                            name="list-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="list-radio-millitary"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            All
                          </label>
                        </div>
                      </li>
                      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="list-radio-license"
                            type="radio"
                            value=""
                            name="list-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="list-radio-license"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Under Rp 1.000.000
                          </label>
                        </div>
                      </li>
                      <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                        <div className="flex items-center pl-3">
                          <input
                            id="list-radio-id"
                            type="radio"
                            value=""
                            name="list-radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                          />
                          <label
                            htmlFor="list-radio-id"
                            className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Rp 1.000.000 - Rp 5.000.000
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex-grow">
          <SkeletonTheme baseColor="#313131" highlightColor="#525252">
            <div className="bg-[#ffffff] mt-2 md:mt-0 h-auto border border-gray-300 rounded-md">
              {currentPost.length === 0 ? (
                <div className="text-center text-gray-500">Data tidak ada</div>
              ) : (
                currentPost.map((job, index) => (
                  <div
                    key={job.uuid}
                    onClick={() => openModal(job)}
                    className="cursor-pointer hover:shadow-lg p-3 m-4 border border-gray-300 bg-[#f9f9f9] w-auto rounded-md"
                  >
                    <div className="w-full">
                      <div className="flex rounded-xl w-auto">
                        <div className="hidden md:block">
                          <img
                            src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80"
                            className="rounded-full w-12 h-12"
                            alt="avatar"
                          />
                        </div>
                        <div className="md:ml-4">
                          <div className="flex justify-between w-full">
                            <div className="text-base font-bold cursor-pointer">
                              {job.title || <Skeleton />}
                            </div>
                            {/* <div
                          className="text-blue-700 text-2xl cursor-pointer h-max"
                          onClick={toggleBookmark}
                        >
                          {bookmark ? <IoBookmark /> : <IoBookmarkOutline />}
                        </div> */}
                          </div>
                          <div className="text-sm text-[#89898d] mt-1 ">
                            {job.jobtype.name || <Skeleton />}
                            &nbsp;&nbsp;●&nbsp;&nbsp;
                            {job.career.name}
                            &nbsp;&nbsp;●&nbsp;&nbsp;{job.est_gaji}
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <div className="mt-3 text-[#89898d]">
                          {job.description
                            .substring(0, 300)
                            .replace(regex, "") || <Skeleton count={3} />}
                        </div>
                        <div className="mt-3">
                          <div className="cursor-pointer p-2 mb-2 bg-[#ecf3fd] rounded-md inline-block  text-[#2986ff] mr-2">
                            {job.category.name || <Skeleton />}
                          </div>
                        </div>
                        <div className="mt-2 ">
                          <div className="h-full bg-gray-400 p-[0.5px] rounded-lg"></div>
                          <div className="">
                            <div className="flex items-center text-base mt-3">
                              <IoLocationSharp className="text-red-700 text-xl" />
                              <div className="flex justify-between w-full">
                                <div className="text-[#89898d] text-base">
                                  &nbsp;{job.address || <Skeleton />}
                                </div>
                                <div className="text-[#89898d] text-base">
                                  {format(
                                    new Date(job.createdAt),
                                    "dd MMMM yyyy",
                                    {
                                      locale: id,
                                    }
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </SkeletonTheme>
          <div className="mt-4">
            <Paginate
              totalPosts={jobs.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexUser;
